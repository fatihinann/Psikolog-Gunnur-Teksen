'use server';

import { prisma } from '@/lib/prisma';

export interface BlogPost {
  id: number;
  title: string;
  content: string;
  excerpt: string | null;
  language: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

import { requireAuth } from '@/lib/auth';

async function loadBlogPosts(includeDrafts: boolean = false) {
  if (includeDrafts) {
    await requireAuth();
  }

  try {
    const where = includeDrafts ? {} : { status: 'published' };

    const blogPosts = await prisma.blogPost.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
    });
    return blogPosts;
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return [];
  }
}

export default loadBlogPosts;
