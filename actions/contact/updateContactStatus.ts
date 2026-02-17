'use server';

import { prisma } from '@/lib/prisma';

interface UpdateContactStatusData {
  id: number;
  status: string;
}

async function updateContactStatus(data: UpdateContactStatusData) {
  try {
    const contactSubmission = await prisma.contactSubmission.update({
      where: {
        id: data.id,
      },
      data: {
        status: data.status,
      },
    });
    return contactSubmission;
  } catch (error) {
    console.error('Error updating contact status:', error);
    throw error;
  }
}

export default updateContactStatus;
