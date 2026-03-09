'use server';

import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

interface CreateFaqData {
    question: string;
    answer: string;
    language: string;
    orderNum: number;
    isActive: boolean;
}

async function createFaq(data: CreateFaqData) {
    await requireAuth();

    try {
        const faq = await prisma.faq.create({
            data: {
                question: data.question,
                answer: data.answer,
                language: data.language,
                orderNum: data.orderNum,
                isActive: data.isActive,
            },
        });
        return faq;
    } catch (error) {
        console.error('Error creating FAQ:', error);
        throw error;
    }
}

export default createFaq;
