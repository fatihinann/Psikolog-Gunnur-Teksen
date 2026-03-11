'use server';

import { prisma } from '@/lib/prisma';
import { contactRateLimit } from '@/lib/ratelimit';
import { Resend } from 'resend';
import { z } from 'zod';
import DOMPurify from 'isomorphic-dompurify';
import { headers } from 'next/headers';

const contactFormSchema = z.object({
  name: z.string().min(2, "Ad soyad en az 2 karakter olmalıdır").max(100),
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
  phone: z.string().min(10, "Telefon numarası en az 10 karakter olmalıdır"),
  birthDate: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, "Doğum tarihi GG/AA/YYYY formatında olmalıdır"),
  message: z.string().min(10, "Şikayet özeti en az 10 karakter olmalıdır").max(2000),
  honeypot: z.string().max(0, { message: "Bot detected" }).optional(),
});

export async function submitContactForm(formData: z.infer<typeof contactFormSchema>) {
  console.log("Starting contact form submission...");

  try {
    // 1. Honeypot check
    if (formData.honeypot) {
      console.warn("Honeypot triggered");
      return { success: false, message: "Geçersiz istek" };
    }

    // 2. Validation
    const validatedFields = contactFormSchema.safeParse(formData);
    if (!validatedFields.success) {
      return {
        success: false,
        message: "Lütfen tüm alanları doğru doldurduğunuzdan emin olun."
      };
    }

    const { name, email, phone, birthDate, message } = validatedFields.data;

    // 3. Sanitization
    const sanitizedName = DOMPurify.sanitize(name);
    const sanitizedEmail = DOMPurify.sanitize(email);
    const sanitizedPhone = DOMPurify.sanitize(phone);
    const sanitizedBirthDate = DOMPurify.sanitize(birthDate);
    const sanitizedMessage = DOMPurify.sanitize(message);

    // 4. Rate limiting (Optional/Resilient)
    try {
      if (contactRateLimit) {
        const ip = headers().get("x-forwarded-for") ?? "127.0.0.1";
        const { success: limitReached } = await contactRateLimit.limit(ip);
        if (!limitReached) {
          return {
            success: false,
            message: "Çok fazla istek gönderdiniz. Lütfen bir saat sonra tekrar deneyin."
          };
        }
      }
    } catch (rlError) {
      console.error("Rate limiting error (skipping):", rlError);
    }

    // 5. Database Save (Critical)
    let submissionId;
    try {
      const submission = await prisma.contactSubmission.create({
        data: {
          name: sanitizedName,
          email: sanitizedEmail,
          phone: sanitizedPhone,
          birthDate: sanitizedBirthDate,
          message: sanitizedMessage,
          status: 'new',
        },
      });
      submissionId = submission.id;
      console.log("Submission saved to database:", submissionId);
    } catch (dbError) {
      console.error("Database save error:", dbError);
      throw new Error("Veritabanı kaydı sırasında bir hata oluştu.");
    }

    // 6. Send Email via Resend (Optional/Non-blocking)
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const { error: emailError } = await resend.emails.send({
          from: 'Günnur Teksen Web <onboarding@resend.dev>',
          to: 'fatihinan3437@gmail.com',
          subject: `Yeni Danışan İletişimi: ${sanitizedName}`,
          html: `
            <h2>Yeni Bir İletişim Talebi</h2>
            <p><strong>Ad Soyad:</strong> ${sanitizedName}</p>
            <p><strong>E-posta:</strong> ${sanitizedEmail}</p>
            <p><strong>Telefon:</strong> ${sanitizedPhone}</p>
            <p><strong>Doğum Tarihi:</strong> ${sanitizedBirthDate}</p>
            <p><strong>Şikayet Özeti:</strong></p>
            <div style="background: #f4f4f4; padding: 15px; border-radius: 5px;">
              ${sanitizedMessage.replace(/\n/g, '<br>')}
            </div>
            <br>
            <p>Bu mesaj web sitenizdeki iletişim formundan gönderilmiştir.</p>
          `,
        });

        if (emailError) {
          console.error("Resend email sending error:", emailError);
        }
      } catch (rsError) {
        console.error("Resend initialization/sending error:", rsError);
      }
    } else {
      console.warn("RESEND_API_KEY not found, skipping email.");
    }

    return {
      success: true,
      message: "Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapılacaktır."
    };

  } catch (error: any) {
    console.error("Contact submission top-level error:", error);
    return {
      success: false,
      message: error.message || "Beklenmedik bir hata oluştu. Lütfen daha sonra tekrar deneyin."
    };
  }
}
