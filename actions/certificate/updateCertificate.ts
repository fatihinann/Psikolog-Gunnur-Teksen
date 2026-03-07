'use server';

import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

interface UpdateCertificateData {
    id: number;
    name: string;
    issuer?: string;
    date: string;
    language: string;
    orderNum: number;
    isActive: boolean;
}

async function updateCertificate(data: UpdateCertificateData) {
    await requireAuth();
    try {
        const certificate = await prisma.certificate.update({
            where: { id: data.id },
            data: {
                name: data.name,
                issuer: data.issuer || null,
                date: data.date,
                language: data.language,
                orderNum: data.orderNum,
                isActive: data.isActive,
            },
        });
        return certificate;
    } catch (error) {
        console.error('Error updating certificate:', error);
        throw error;
    }
}

export default updateCertificate;
