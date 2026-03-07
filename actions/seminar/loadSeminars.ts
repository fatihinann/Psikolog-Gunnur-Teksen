'use server';

import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

export interface Seminar {
    id: number;
    name: string;
    date: string;
    language: string;
    orderNum: number;
    isActive: boolean;
}

async function loadSeminars(includeInactive: boolean = false) {
    if (includeInactive) {
        await requireAuth();
    }

    try {
        const where = includeInactive ? {} : { isActive: true };
        const seminars = await prisma.seminar.findMany({
            where,
            orderBy: [{ orderNum: 'asc' }, { id: 'asc' }],
        });
        return seminars;
    } catch (error) {
        console.error('Error loading seminars:', error);
        return [];
    }
}

export default loadSeminars;
