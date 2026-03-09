'use server';

import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

async function deleteBlogPost(id: number) {
    await requireAuth();

    try {
        const blogPost = await prisma.blogPost.delete({
            where: { id },
        });
        return blogPost;
    } catch (error) {
        console.error('Error deleting blog post:', error);
        throw error;
    }
}

export default deleteBlogPost;
