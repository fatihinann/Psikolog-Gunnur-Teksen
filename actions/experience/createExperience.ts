'use server';

import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

interface CreateExperienceData {
    company: string;
    position: string;
    date: string;
    descriptionFirst: string;
    descriptionSecond: string;
    descriptionThird: string;
    language: string;
    orderNum: number;
    isActive: boolean;
}

async function createExperience(data: CreateExperienceData) {
    await requireAuth();
    try {
        const experience = await prisma.experience.create({
            data: {
                company: data.company,
                position: data.position,
                date: data.date,
                descriptionFirst: data.descriptionFirst,
                descriptionSecond: data.descriptionSecond,
                descriptionThird: data.descriptionThird,
                language: data.language,
                orderNum: data.orderNum,
                isActive: data.isActive,
            },
        });
        return experience;
    } catch (error) {
        console.error('Error creating experience:', error);
        throw error;
    }
}

export default createExperience;
