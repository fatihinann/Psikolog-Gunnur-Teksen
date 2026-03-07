'use server';

import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

export interface Education {
    id: number;
    name: string;
    program: string;
    location: string;
    date: string;
    language: string;
    orderNum: number;
    isActive: boolean;
}

async function loadEducations(includeInactive: boolean = false) {
    if (includeInactive) {
        await requireAuth();
    }

    try {
        const where = includeInactive ? {} : { isActive: true };

        const educations = await prisma.education.findMany({
            where,
            orderBy: [
                { orderNum: 'asc' },
                { id: 'asc' },
            ],
        });
        return educations;
    } catch (error) {
        console.error('Error loading educations:', error);
        return [];
    }
}

export default loadEducations;
