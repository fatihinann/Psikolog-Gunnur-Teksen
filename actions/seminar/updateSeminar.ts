'use server';

import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

interface UpdateSeminarData {
    id: number;
    name: string;
    date: string;
    language: string;
    orderNum: number;
    isActive: boolean;
}

async function updateSeminar(data: UpdateSeminarData) {
    await requireAuth();
    try {
        const seminar = await prisma.seminar.update({
            where: { id: data.id },
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
        console.error('Error updating seminar:', error);
        throw error;
    }
}

export default updateSeminar;
