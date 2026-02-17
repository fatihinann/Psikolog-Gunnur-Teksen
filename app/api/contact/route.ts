import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/logger'

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
    const { name, email, phone, message } = body;

    // Validate required fields
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return Response.json(
        { message: 'Ad alanı zorunludur' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string' || email.trim().length === 0) {
      return Response.json(
        { message: 'E-posta alanı zorunludur' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return Response.json(
        { message: 'Mesaj alanı zorunludur' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return Response.json(
        { message: 'Geçerli bir e-posta adresi giriniz' },
        { status: 400 }
      );
    }

    // Sanitize and limit length
    const sanitizedName = name.trim().substring(0, 200);
    const sanitizedEmail = email.trim().toLowerCase().substring(0, 255);
    const sanitizedPhone = phone ? phone.trim().substring(0, 50) : null;
    const sanitizedMessage = message.trim().substring(0, 5000);

    // Validate message length
    if (sanitizedMessage.length < 10) {
      return Response.json(
        { message: 'Mesaj en az 10 karakter olmalıdır' },
        { status: 400 }
      );
    }

    const submission = await prisma.contactSubmission.create({ 
      data: {
        name: sanitizedName,
        email: sanitizedEmail,
        phone: sanitizedPhone,
        message: sanitizedMessage,
        status: 'new'
      }
    });

    logger.info('Contact form submission created', { submissionId: submission.id, email: sanitizedEmail });
    return Response.json(submission, { status: 201 });
  } catch (error) {
    logger.error('Failed to process contact form submission', error instanceof Error ? error : new Error(String(error)));
    return Response.json(
      { message: 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.' },
      { status: 500 }
    );
  }
}