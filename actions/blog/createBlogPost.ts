'use server';

import { prisma } from '@/lib/prisma';

interface CreateBlogPostData {
  title: string;
  content: string;
  excerpt?: string;
  language: string;
  status: string;
}

async function createBlogPost(data: CreateBlogPostData) {
  try {
    const blogPost = await prisma.blogPost.create({
      data: {
        title: data.title,
        content: data.content,
        excerpt: data.excerpt,
        language: data.language,
        status: data.status,
      },
    });
    return blogPost;
  } catch (error) {
    console.error('Error creating blog post:', error);
    throw error;
  }
}

export default createBlogPost;