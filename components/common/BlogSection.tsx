'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from '@/lib/i18n';
import { useEffect, useState } from 'react';
import loadBlogPostsAction from '@/actions/blog/loadBlogPosts';
import { ArrowRight, Calendar } from 'lucide-react';
import Link from 'next/link';

export function BlogSection() {
  const { t, language } = useTranslation();
  type BlogPost = {
    id: number;
    title: string;
    content: string;
    excerpt: string | null;
    language: string;
    status: string;
    createdAt: string | Date;
    updatedAt?: string | Date;
  };
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const posts = await loadBlogPostsAction();
        setBlogPosts(posts as BlogPost[]);
      } catch (error) {
        console.error('Error loading blog posts:', error);
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  // Filter and get latest published posts in current language
  const toDate = (value: string | Date) => new Date(value);

  const featuredPosts = blogPosts
    .filter(post => post.status === 'published' && post.language === language)
    .sort((a, b) => toDate(b.createdAt).getTime() - toDate(a.createdAt).getTime())
    .slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t('common.loading')}</p>
        </div>
      </section>
    );
  }

  if (featuredPosts.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={"visible"}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('home.blog.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('blog.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredPosts.map((post, index) => (
              <motion.div key={post.id} variants={itemVariants}>
                <Card className="psychology-card h-full group hover:scale-105 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-blue-600 border-blue-200">
                          {post.language === 'tr' ? '🇹🇷' : '🇺🇸'}
                        </Badge>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="w-4 h-4 mr-1" />
                          {toDate(post.createdAt).toLocaleDateString(
                            language === 'tr' ? 'tr-TR' : 'en-US'
                          )}
                        </div>
                      </div>

                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {post.title}
                      </h3>

                      {post.excerpt && (
                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>
                      )}

                      <Button variant="ghost" size="sm" className="p-0 h-auto text-blue-600 hover:text-blue-700" asChild>
                        <Link href={`/blog/${post.id}`}>
                          {t('home.blog.readMore')}
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div variants={itemVariants} className="text-center">
            <Button size="lg" variant="outline" asChild>
              <Link href="/blog">
                {t('blog.btn')}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
