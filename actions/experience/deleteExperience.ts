'use server';

import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

async function deleteExperience(id: number) {
    await requireAuth();
    try {
        await prisma.experience.delete({ where: { id } });
        return { success: true };
    } catch (error) {
        console.error('Error deleting experience:', error);
        throw error;
    }
}

export default deleteExperience;
