'use server';

import { prisma } from '@/lib/prisma';

interface CreateContactSubmissionData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

async function createContactSubmission(data: CreateContactSubmissionData) {
  try {
    const contactSubmission = await prisma.contactSubmission.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
        status: 'new',
      },
    });
    return contactSubmission;
  } catch (error) {
    console.error('Error creating contact submission:', error);
    throw error;
  }
}

export default createContactSubmission;
