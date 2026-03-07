'use server';

import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

export interface Experience {
    id: number;
    company: string;
    position: string;
    date: string;
    location: string | null;
    project: string | null;
    descriptionFirst: string;
    descriptionSecond: string;
    descriptionThird: string;
    language: string;
    orderNum: number;
    isActive: boolean;
}

async function loadExperiences(includeInactive: boolean = false) {
    if (includeInactive) {
        await requireAuth();
    }

    try {
        const where = includeInactive ? {} : { isActive: true };

        const experiences = await prisma.experience.findMany({
            where,
            orderBy: [
                { orderNum: 'asc' },
                { id: 'asc' },
            ],
        });
        return experiences;
    } catch (error) {
        console.error('Error loading experiences:', error);
        return [];
    }
}

export default loadExperiences;
