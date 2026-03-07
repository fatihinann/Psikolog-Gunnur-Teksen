'use server';

import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

interface UpdateExperienceData {
    id: number;
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

async function updateExperience(data: UpdateExperienceData) {
    await requireAuth();
    try {
        const experience = await prisma.experience.update({
            where: { id: data.id },
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
        console.error('Error updating experience:', error);
        throw error;
    }
}

export default updateExperience;
