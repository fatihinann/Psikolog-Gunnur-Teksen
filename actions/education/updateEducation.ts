'use server';

import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

interface UpdateEducationData {
    id: number;
    name: string;
    program: string;
    location: string;
    date: string;
    language: string;
    orderNum: number;
    isActive: boolean;
}

async function updateEducation(data: UpdateEducationData) {
    await requireAuth();
    try {
        const education = await prisma.education.update({
            where: { id: data.id },
            data: {
                name: data.name,
                program: data.program,
                location: data.location,
                date: data.date,
                language: data.language,
                orderNum: data.orderNum,
                isActive: data.isActive,
            },
        });
        return education;
    } catch (error) {
        console.error('Error updating education:', error);
        throw error;
    }
}

export default updateEducation;
