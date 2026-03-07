'use server';

import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

async function deleteEducation(id: number) {
    await requireAuth();
    try {
        await prisma.education.delete({ where: { id } });
        return { success: true };
    } catch (error) {
        console.error('Error deleting education:', error);
        throw error;
    }
}

export default deleteEducation;
