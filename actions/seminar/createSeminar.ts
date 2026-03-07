'use server';

import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

interface CreateSeminarData {
    name: string;
    date: string;
    language: string;
    orderNum: number;
    isActive: boolean;
}

async function createSeminar(data: CreateSeminarData) {
    await requireAuth();
    try {
        const seminar = await prisma.seminar.create({
            data: {
                name: data.name,
                date: data.date,
                language: data.language,
                orderNum: data.orderNum,
                isActive: data.isActive,
            },
        });
        return seminar;
    } catch (error) {
        console.error('Error creating seminar:', error);
        throw error;
    }
}

export default createSeminar;
