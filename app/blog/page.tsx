'use client';

import { motion } from 'framer-motion';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/lib/i18n';
import { useEffect, useState } from 'react';
import loadBlogPostsAction from '@/actions/blog/loadBlogPosts';
import { Calendar, ArrowRight } from 'lucide-react';
import type { BlogPost } from 'actions/blog/loadBlogPosts';

import Link from 'next/link';

export default function BlogPage() {
  const { t, language } = useTranslation();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const posts = await loadBlogPostsAction();
        setBlogPosts(posts);
      } catch (error) {
        console.error('Error loading blog posts:', error);
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  const publishedPosts = blogPosts
    .filter(post => post.status === 'published' && post.language === language)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="psychology-gradient py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {t('blog.title')}
              </h1>
              <p className="text-xl text-gray-600">
                {t('blog.subtitle')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">{t('common.loading')}</p>
              </div>
            ) : publishedPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">Henüz blog yazısı bulunmuyor.</p>
              </div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {publishedPosts.map((post) => (
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
                              {new Date(post.createdAt).toLocaleDateString(
                                language === 'tr' ? 'tr-TR' : 'en-US'
                              )}
                            </div>
                          </div>

                          <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                            {post.title}
                          </h2>

                          {post.excerpt && (
                            <p className="text-gray-600 leading-relaxed line-clamp-3">
                              {post.excerpt}
                            </p>
                          )}

                          <Button
                            variant="ghost"
                            size="sm"
                            className="p-0 h-auto text-blue-600 hover:text-blue-700"
                            asChild
                          >
                            <Link href={`/blog/${post.id}`}>
                              {t('common.readMore')}
                              <ArrowRight className="w-4 h-4 ml-1" />
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
