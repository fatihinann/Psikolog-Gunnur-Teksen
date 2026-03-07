'use server';

import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

async function deleteCertificate(id: number) {
    await requireAuth();
    try {
        await prisma.certificate.delete({ where: { id } });
        return { success: true };
    } catch (error) {
        console.error('Error deleting certificate:', error);
        throw error;
    }
}

export default deleteCertificate;
