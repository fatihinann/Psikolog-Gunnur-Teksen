'use server';

import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

async function deleteFaq(id: number) {
    await requireAuth();

    try {
        const faq = await prisma.faq.delete({
            where: { id },
        });
        return faq;
    } catch (error) {
        console.error('Error deleting FAQ:', error);
        throw error;
    }
}

export default deleteFaq;
