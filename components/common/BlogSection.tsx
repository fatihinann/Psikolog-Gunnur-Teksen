'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button';
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

  const toDate = (value: string | Date) => new Date(value);

  const featuredPosts = blogPosts
    .filter(post => post.status === 'published' && post.language === language)
    .sort((a, b) => toDate(b.createdAt).getTime() - toDate(a.createdAt).getTime())
    .slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  if (loading) {
    return (
      <section className="py-32 minimalist-gradient">
        <div className="container mx-auto px-4 text-center">
          <div className="w-10 h-10 border-2 border-primary-sage/30 border-t-primary-sage rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-stone-400 text-sm">{t('common.loading')}</p>
        </div>
      </section>
    );
  }

  if (featuredPosts.length === 0) return null;

  return (
    <section className="py-32 minimalist-gradient relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-primary-sage/5 dark:bg-dark-forest/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-56 h-56 bg-accent-terracotta/4 dark:bg-accent-terracotta/6 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div variants={containerVariants} initial="hidden" animate="visible">

          <motion.div variants={itemVariants} className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-serif font-light text-stone-900 dark:text-stone-100 mb-6 tracking-tight">
              {t('home.blog.title')}
            </h2>
            <div className="w-16 h-0.5 bg-accent-terracotta mx-auto mb-8 opacity-70" />
            <p className="text-xl text-stone-500 dark:text-stone-400 font-light">
              {t('blog.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mb-16">
            {featuredPosts.map((post) => (
              <motion.div key={post.id} variants={itemVariants}>
                <div className="minimalist-card p-7 h-full flex flex-col group hover:-translate-y-1">
                  <div className="space-y-4 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 bg-primary-green/5 dark:bg-dark-forest/30 text-primary-green dark:text-primary-sage text-xs font-bold rounded-full border border-primary-green/10 dark:border-primary-sage/20 uppercase tracking-widest">
                        {post.language === 'tr' ? 'Türkçe' : 'English'}
                      </span>
                      <div className="flex items-center text-xs text-stone-400 dark:text-stone-500">
                        <Calendar className="w-3.5 h-3.5 mr-1.5 text-accent-terracotta/60" />
                        {toDate(post.createdAt).toLocaleDateString(
                          language === 'tr' ? 'tr-TR' : 'en-US',
                          { year: 'numeric', month: 'short', day: 'numeric' }
                        )}
                      </div>
                    </div>

                    <h3 className="text-xl font-serif font-semibold text-stone-900 dark:text-stone-100 group-hover:text-primary-green dark:group-hover:text-primary-sage transition-colors duration-300 line-clamp-2 leading-snug">
                      {post.title}
                    </h3>

                    {post.excerpt && (
                      <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed line-clamp-3 font-light">
                        {post.excerpt}
                      </p>
                    )}
                  </div>

                  <div className="mt-6 pt-5 border-t border-stone-100 dark:border-dark-muted/40">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-0 h-auto text-primary-green dark:text-primary-sage font-semibold hover:bg-transparent hover:text-primary-leaf dark:hover:text-primary-leaf flex items-center group/btn text-sm"
                      asChild
                    >
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
              className="bg-primary-green hover:bg-primary-green/90 dark:bg-dark-forest dark:hover:bg-dark-forest/80 text-white px-12 py-7 text-base rounded-2xl shadow-xl shadow-primary-green/20 dark:shadow-dark-forest/30 transition-all duration-300 hover:scale-[1.03] font-medium tracking-wide"
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
