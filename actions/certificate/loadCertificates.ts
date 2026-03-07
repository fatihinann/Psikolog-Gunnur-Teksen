'use server';

import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

export interface Certificate {
    id: number;
    name: string;
    issuer: string | null;
    date: string;
    language: string;
    orderNum: number;
    isActive: boolean;
}

async function loadCertificates(includeInactive: boolean = false) {
    if (includeInactive) {
        await requireAuth();
    }

    try {
        const where = includeInactive ? {} : { isActive: true };
        const certificates = await prisma.certificate.findMany({
            where,
            orderBy: [{ orderNum: 'asc' }, { id: 'asc' }],
        });
        return certificates;
    } catch (error) {
        console.error('Error loading certificates:', error);
        return [];
    }
}

export default loadCertificates;
