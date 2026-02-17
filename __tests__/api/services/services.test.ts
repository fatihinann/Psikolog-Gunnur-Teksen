import { NextRequest } from 'next/server';
import { GET } from '@/app/api/services/route';
import * as prismaMod from '@/lib/prisma';
import { PrismaClient } from '@prisma/client';

// Mock prisma module
jest.mock('@/lib/prisma', () => ({
  prisma: {
    service: {
      findMany: jest.fn(),
    }
  }
}));

const mockPrisma = prismaMod.prisma as jest.Mocked<PrismaClient>;

describe('Services API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/services', () => {
    it('should return all active services', async () => {
      const mockServices = [
        {
          id: 1,
          name: 'Service 1',
          description: 'Description 1',
          language: 'tr',
          isActive: true
        },
        {
          id: 2,
          name: 'Service 2',
          description: 'Description 2',
          language: 'tr',
          isActive: true
        }
      ];

      (mockPrisma as any).service.findMany.mockResolvedValue(mockServices);

      const response = await GET();
      const data = await response.json();

      expect(data.length).toBe(2);
      expect((mockPrisma as any).service.findMany).toHaveBeenCalledWith({
        where: { isActive: true }
      });
      expect(data).toEqual(mockServices);
    });

    it('should handle database errors gracefully', async () => {
      (mockPrisma as any).service.findMany.mockRejectedValue(new Error('Database error'));

      const response = await GET();
      
      expect(response.status).toBe(200); // Next.js API routes return 200 by default
      const data = await response.json();
      expect(data).toEqual([]); // Should return empty array on error
    });
  });
});