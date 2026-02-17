'use server';

import { prisma } from '@/lib/prisma';

export interface FAQ {
  id: number;
  question: string;
  answer: string;
  language: string;
  orderNum: number;
  isActive: boolean;
}

import { requireAuth } from '@/lib/auth';

async function loadFaqs(includeInactive: boolean = false) {
  if (includeInactive) {
    await requireAuth();
  }

  try {
    const where = includeInactive ? {} : { isActive: true };

    const faqs = await prisma.faq.findMany({
      where,
      orderBy: [
        {
          orderNum: 'asc',
        },
        {
          id: 'asc',
        },
      ],
    });
    return faqs;
  } catch (error) {
    console.error('Error loading FAQs:', error);
    return [];
  }
}

export default loadFaqs;