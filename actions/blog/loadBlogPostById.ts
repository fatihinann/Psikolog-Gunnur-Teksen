'use server';

import { prisma } from '@/lib/prisma';

async function loadBlogPostById(id: string) {
  try {
    const blogPost = await prisma.blogPost.findFirst({
      where: {
        id: parseInt(id),
        status: 'published',
      },
    });
    return blogPost ? [blogPost] : [];
  } catch (error) {
    console.error('Error loading blog post by id:', error);
    return [];
  }
}

export default loadBlogPostById;
