import { NextRequest } from 'next/server';

// Mock'u jest.mock içinde tanımlayın
jest.mock('@/lib/prisma', () => ({
  prisma: {
    blogPost: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    }
  }
}));

// Import after mock
import { POST, GET } from '@/app/api/blog/route';
// Mock'a erişim için
const { prisma } = require('@/lib/prisma');

describe('Blog API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/blog', () => {
    it('should return all blog posts', async () => {
      const mockPosts = [
        {
          id: 1,
          title: 'Test Post 1',
          content: 'Test Content 1',
          createdAt: new Date(),
          updatedAt: new Date(),
          status: 'published'
        },
        {
          id: 2,
          title: 'Test Post 2',
          content: 'Test Content 2',
          createdAt: new Date(),
          updatedAt: new Date(),
          status: 'published'
        }
      ];

      prisma.blogPost.findMany.mockResolvedValue(mockPosts);

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.length).toBe(2);
      expect(prisma.blogPost.findMany).toHaveBeenCalledWith({
        where: { status: 'published' }
      });
    });

    it('should handle database errors gracefully', async () => {
      prisma.blogPost.findMany.mockRejectedValue(new Error('Database error'));

      const response = await GET();
      const data = await response.json();
      
      expect(response.status).toBe(500);
      expect(data.error).toBe('Failed to fetch blog posts');
    });
  });

  describe('POST /api/blog', () => {
    it('should create a new blog post', async () => {
      const mockPost = {
        title: 'New Blog Post',
        content: 'Blog post content',
        status: 'published'
      };

      const createdPost = {
        id: 1,
        ...mockPost,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      prisma.blogPost.create.mockResolvedValue(createdPost);

      const req = new NextRequest('http://localhost:3000/api/blog', {
        method: 'POST',
        body: JSON.stringify(mockPost),
        headers: {
          'content-type': 'application/json',
        }
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(prisma.blogPost.create).toHaveBeenCalledWith({
        data: {
          title: mockPost.title,
          content: mockPost.content,
          status: mockPost.status
        }
      });
      expect(data).toEqual(expect.objectContaining(mockPost));
    });

    it('should handle missing required fields', async () => {
      const invalidPost = {
        // title eksik
        content: 'Blog post content',
      };

      const req = new NextRequest('http://localhost:3000/api/blog', {
        method: 'POST',
        body: JSON.stringify(invalidPost),
        headers: {
          'content-type': 'application/json',
        }
      });

      const response = await POST(req);
      const data = await response.json();
      
      expect(response.status).toBe(400);
      expect(data.error).toBe('Title and content are required');
    });

    it('should handle invalid request data', async () => {
      const req = new NextRequest('http://localhost:3000/api/blog', {
        method: 'POST',
        body: 'invalid-json',
        headers: {
          'content-type': 'application/json',
        }
      });

      const response = await POST(req);
      const data = await response.json();
      
      expect(response.status).toBe(400);
      expect(data.error).toBe('Invalid JSON data');
    });

    it('should handle database errors on creation', async () => {
      const mockPost = {
        title: 'New Blog Post',
        content: 'Blog post content',
        status: 'published'
      };

      prisma.blogPost.create.mockRejectedValue(new Error('Database error'));

      const req = new NextRequest('http://localhost:3000/api/blog', {
        method: 'POST',
        body: JSON.stringify(mockPost),
        headers: {
          'content-type': 'application/json',
        }
      });

      const response = await POST(req);
      const data = await response.json();
      
      expect(response.status).toBe(500);
      expect(data.error).toBe('Failed to create blog post');
    });
  });
});