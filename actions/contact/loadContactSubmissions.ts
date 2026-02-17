'use server';

import { prisma } from '@/lib/prisma';

import { requireAuth } from '@/lib/auth';

async function loadContactSubmissions() {
  await requireAuth();

  try {
    const contactSubmissions = await prisma.contactSubmission.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return contactSubmissions;
  } catch (error) {
    console.error('Error loading contact submissions:', error);
    return [];
  }
}

export default loadContactSubmissions;
