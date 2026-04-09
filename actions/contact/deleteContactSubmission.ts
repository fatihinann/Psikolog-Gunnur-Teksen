'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export default async function deleteContactSubmissionAction(id: number) {
  try {
    await prisma.contactSubmission.delete({
      where: { id },
    });
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    console.error('Error deleting contact submission:', error);
    throw new Error('Failed to delete contact submission');
  }
}
