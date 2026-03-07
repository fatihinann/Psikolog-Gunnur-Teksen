'use server';

import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

interface CreateEducationData {
    name: string;
    program: string;
    location: string;
    date: string;
    language: string;
    orderNum: number;
    isActive: boolean;
}

async function createEducation(data: CreateEducationData) {
    await requireAuth();
    try {
        const education = await prisma.education.create({
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
        console.error('Error creating education:', error);
        throw error;
    }
}

export default createEducation;
