import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { logger } from '@/lib/logger'
import { requireAuth } from '@/lib/auth'

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { status: 'published' },
      orderBy: { createdAt: 'desc' },
      take: 100, // Limit results to prevent performance issues
    });

    return NextResponse.json(posts);
  } catch (error) {
    logger.error('Failed to fetch blog posts', error instanceof Error ? error : new Error(String(error)));
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Require authentication for creating blog posts
    try {
      await requireAuth(request);
    } catch {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      return NextResponse.json(
        { error: 'Invalid JSON data' },
        { status: 400 }
      );
    }

    // Enhanced validation
    if (!body.title || typeof body.title !== 'string' || body.title.trim().length === 0) {
      return NextResponse.json(
        { error: 'Title is required and must be a non-empty string' },
        { status: 400 }
      );
    }

    if (!body.content || typeof body.content !== 'string' || body.content.trim().length === 0) {
      return NextResponse.json(
        { error: 'Content is required and must be a non-empty string' },
        { status: 400 }
      );
    }

    // Validate status if provided
    if (body.status && !['draft', 'published', 'archived'].includes(body.status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be draft, published, or archived' },
        { status: 400 }
      );
    }

    // Sanitize and limit length
    const title = body.title.trim().substring(0, 500);
    const content = body.content.trim().substring(0, 50000); // Limit to 50k characters
    const excerpt = body.excerpt ? body.excerpt.trim().substring(0, 500) : null;

    const post = await prisma.blogPost.create({
      data: {
        title,
        content,
        excerpt,
        status: body.status || 'draft',
        language: body.language || 'tr',
      }
    });

    logger.info('Blog post created', { postId: post.id, title: post.title });
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    logger.error('Failed to create blog post', error instanceof Error ? error : new Error(String(error)));

    // Database error
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}