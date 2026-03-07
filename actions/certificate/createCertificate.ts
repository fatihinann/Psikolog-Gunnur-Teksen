'use server';

import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

interface CreateCertificateData {
    name: string;
    issuer?: string;
    date: string;
    language: string;
    orderNum: number;
    isActive: boolean;
}

async function createCertificate(data: CreateCertificateData) {
    await requireAuth();
    try {
        const certificate = await prisma.certificate.create({
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
        console.error('Error creating certificate:', error);
        throw error;
    }
}

export default createCertificate;
