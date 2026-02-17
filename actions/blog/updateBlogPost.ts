'use server';

import { prisma } from '@/lib/prisma';

interface UpdateBlogPostData {
  id: number;
  title: string;
  content: string;
  excerpt?: string;
  language: string;
  status: string;
}

async function updateBlogPost(data: UpdateBlogPostData) {
  try {
    const blogPost = await prisma.blogPost.update({
      where: {
        id: data.id,
      },
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
    console.error('Error updating blog post:', error);
    throw error;
  }
}

export default updateBlogPost;
