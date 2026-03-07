'use server';

import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

async function deleteSeminar(id: number) {
    await requireAuth();
    try {
        await prisma.seminar.delete({ where: { id } });
        return { success: true };
    } catch (error) {
        console.error('Error deleting seminar:', error);
        throw error;
    }
}

export default deleteSeminar;
