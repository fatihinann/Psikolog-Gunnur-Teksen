import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/logger'
import { contactRateLimit } from '@/lib/ratelimit'
import { Resend } from 'resend'
import { z } from 'zod'

export const runtime = 'nodejs'

const contactPayloadSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(255),
  phone: z.string().min(0).max(50).optional(),
  birthDate: z.string().min(0).max(20).optional(),
  message: z.string().min(10).max(5000),
})

function escapeHtml(text: string) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) return forwardedFor.split(',')[0]?.trim() ?? 'unknown'
  return request.headers.get('x-real-ip') ?? 'unknown'
}

export async function POST(request: Request) {
  let body;
  try {
    body = await request.json();
  } catch (parseError) {
    return Response.json(
      { message: 'Geçersiz JSON verisi' },
      { status: 400 }
    );
  }

  try {
    const parsed = contactPayloadSchema.safeParse(body)
    if (!parsed.success) {
      return Response.json(
        { message: 'Lütfen tüm alanları doğru doldurduğunuzdan emin olun.' },
        { status: 400 }
      )
    }

    const { name, email, phone, birthDate, message } = parsed.data

    // Rate limiting (best-effort)
    try {
      if (contactRateLimit) {
        const ip = getClientIp(request)
        const { success } = await contactRateLimit.limit(ip)
        if (!success) {
          return Response.json(
            { message: 'Çok fazla istek gönderdiniz. Lütfen daha sonra tekrar deneyin.' },
            { status: 429 }
          )
        }
      }
    } catch (rlError) {
      logger.error(
        'Rate limiting error (skipping)',
        rlError instanceof Error ? rlError : new Error(String(rlError))
      )
    }

    const sanitizedName = escapeHtml(name.trim())
    const sanitizedEmail = escapeHtml(email.trim().toLowerCase())
    const sanitizedPhone = phone ? escapeHtml(phone.trim()) : null
    const sanitizedBirthDate = birthDate ? escapeHtml(birthDate.trim()) : null
    const sanitizedMessage = escapeHtml(message.trim())

    const submission = await prisma.contactSubmission.create({ 
      data: {
        name: sanitizedName,
        email: sanitizedEmail,
        phone: sanitizedPhone,
        birthDate: sanitizedBirthDate,
        message: sanitizedMessage,
        status: 'new'
      }
    });

    logger.info('Contact form submission created', { submissionId: submission.id, email: sanitizedEmail });

    // Email via Resend (best-effort)
    try {
      const apiKey = process.env.RESEND_API_KEY
      const to = process.env.CONTACT_TO_EMAIL
      const from = process.env.CONTACT_FROM_EMAIL
      if (apiKey && to && from) {
        const resend = new Resend(apiKey)
        const { error: emailError } = await resend.emails.send({
          from,
          to,
          subject: `Yeni Danışan İletişimi: ${sanitizedName}`,
          html: `
            <h2>Yeni Bir İletişim Talebi</h2>
            <p><strong>Ad Soyad:</strong> ${sanitizedName}</p>
            <p><strong>E-posta:</strong> ${sanitizedEmail}</p>
            <p><strong>Telefon:</strong> ${sanitizedPhone ?? '-'}</p>
            <p><strong>Doğum Tarihi:</strong> ${sanitizedBirthDate ?? '-'}</p>
            <p><strong>Şikayet Özeti:</strong></p>
            <div style="background: #f4f4f4; padding: 15px; border-radius: 5px; white-space: pre-wrap;">
              ${sanitizedMessage}
            </div>
            <br>
            <p>Bu mesaj web sitenizdeki iletişim formundan gönderilmiştir.</p>
          `,
        })
        if (emailError) {
          logger.error('Resend email sending error', new Error(emailError.message))
        }
      } else {
        logger.warn('Resend env missing; skipping email', {
          hasApiKey: Boolean(apiKey),
          hasTo: Boolean(to),
          hasFrom: Boolean(from),
        })
      }
    } catch (emailError) {
      logger.error(
        'Resend email failure (skipping)',
        emailError instanceof Error ? emailError : new Error(String(emailError))
      )
    }

    return Response.json(
      { id: submission.id, message: 'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapılacaktır.' },
      { status: 201 }
    )
  } catch (error) {
    logger.error('Failed to process contact form submission', error instanceof Error ? error : new Error(String(error)));
    return Response.json(
      { message: 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.' },
      { status: 500 }
    );
  }
}