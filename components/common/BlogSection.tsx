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
    <section className="py-32 bg-accent-bone/30">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={"visible"}
        >
          <motion.div variants={itemVariants} className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-stone-900 mb-6">
              {t('home.blog.title')}
            </h2>
            <div className="w-20 h-1.5 bg-accent-terracotta mx-auto mb-8 rounded-full opacity-80" />
            <p className="text-xl text-stone-600 font-medium">
              {t('blog.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
            {featuredPosts.map((post, index) => (
              <motion.div key={post.id} variants={itemVariants}>
                <div className="minimalist-card p-8 h-full flex flex-col group">
                  <div className="space-y-6 flex-1">
                    <div className="flex items-center justify-between">
                      <div className="px-3 py-1 bg-primary-green/5 text-primary-green text-xs font-bold rounded-full border border-primary-green/10 uppercase tracking-widest">
                        {post.language === 'tr' ? 'Türkçe' : 'English'}
                      </div>
                      <div className="flex items-center text-xs font-semibold text-stone-400 uppercase tracking-wider">
                        <Calendar className="w-4 h-4 mr-2 text-accent-terracotta/60" />
                        {toDate(post.createdAt).toLocaleDateString(
                          language === 'tr' ? 'tr-TR' : 'en-US'
                        )}
                      </div>
                    </div>

                    <h3 className="text-2xl font-display font-bold text-stone-900 group-hover:text-primary-green transition-colors duration-300 line-clamp-2 leading-tight">
                      {post.title}
                    </h3>

                    {post.excerpt && (
                      <p className="text-stone-600 text-sm leading-relaxed line-clamp-3 font-medium">
                        {post.excerpt}
                      </p>
                    )}
                  </div>

                  <div className="mt-8 pt-6 border-t border-stone-100 flex items-center justify-between">
                    <Button variant="ghost" size="sm" className="p-0 h-auto text-primary-green font-bold hover:bg-transparent hover:text-primary-leaf flex items-center group/btn" asChild>
                      <Link href={`/blog/${post.id}`}>
                        {t('home.blog.readMore')}
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={itemVariants} className="text-center">
            <Button
              size="lg"
              className="bg-primary-green hover:bg-primary-green/90 text-white px-10 py-7 text-lg rounded-2xl shadow-xl shadow-primary-green/20 transition-all duration-300 hover:scale-105"
              asChild
            >
              <Link href="/blog">
                {t('blog.btn')}
                <ArrowRight className="w-5 h-5 ml-3" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
