'use server';

import { prisma } from '@/lib/prisma';

export interface Service {
  id: number;
  name: string;
  description: string;
  language: string;
  isActive: boolean;
}

import { requireAuth } from '@/lib/auth';

async function loadServices(includeInactive: boolean = false) {
  if (includeInactive) {
    await requireAuth();
  }

  try {
    const where = includeInactive ? {} : { isActive: true };

    const services = await prisma.service.findMany({
      where,
      orderBy: {
        id: 'asc',
      },
    });
    return services;
  } catch (error) {
    console.error('Error loading services:', error);
    return [];
  }
}

export default loadServices;