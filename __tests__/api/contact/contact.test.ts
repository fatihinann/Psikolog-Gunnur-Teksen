import { NextRequest } from 'next/server';
import { POST } from '@/app/api/contact/route';
import * as prismaMod from '@/lib/prisma';
import { PrismaClient } from '@prisma/client';

// Mock prisma module
jest.mock('@/lib/prisma', () => ({
  prisma: {
    contactSubmission: {
      create: jest.fn()
    }
  }
}));

const mockPrisma = prismaMod.prisma as jest.Mocked<PrismaClient>;

describe('Contact Form API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 400 if required fields are missing', async () => {
    const req = new Request('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify({}),
    });

    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.message).toContain('Tüm alanlar zorunludur');
  });

  it('should return 400 if email is invalid', async () => {
    const req = new Request('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Test User',
        email: 'invalid-email',
        phone: '1234567890',
        message: 'Test message',
      }),
    });

    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.message).toContain('Geçerli bir e-posta adresi giriniz');
  });

  it('should create contact submission successfully', async () => {
    const mockContactData = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '1234567890',
      message: 'Test message',
    };

    (mockPrisma as any).contactSubmission.create.mockResolvedValue({
      id: 1,
      ...mockContactData,
      createdAt: new Date(),
      status: 'new',
    });

    const req = new Request('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify(mockContactData),
    });

    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual(expect.objectContaining({
      id: expect.any(Number),
      ...mockContactData,
      status: 'new',
      createdAt: expect.any(Date),
    }));
    expect((mockPrisma as any).contactSubmission.create).toHaveBeenCalledWith({
      data: mockContactData
    });
  });

  it('should handle database errors gracefully', async () => {
    const mockContactData = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '1234567890',
      message: 'Test message',
    };

    (mockPrisma as any).contactSubmission.create.mockRejectedValue(
      new Error('Database error')
    );

    const req = new Request('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify(mockContactData),
    });

    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.message).toContain('Bir hata oluştu');
  });
});