'use client';

import { motion } from 'framer-motion';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
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
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-20">
        {/* Hero */}
        <section className="minimalist-gradient py-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary-sage/8 dark:bg-dark-forest/20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-5xl md:text-6xl font-serif font-light text-stone-900 dark:text-stone-100 mb-5 tracking-tight">
                {t('blog.title')}
              </h1>
              <div className="w-16 h-0.5 bg-accent-terracotta mx-auto mb-8 opacity-70" />
              <p className="text-xl text-stone-500 dark:text-stone-400 font-light leading-relaxed">
                {t('blog.subtitle')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Posts */}
        <section className="py-20 bg-accent-sand/30 dark:bg-dark-surface">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="text-center py-16">
                <div className="w-10 h-10 border-2 border-primary-sage/30 border-t-primary-sage rounded-full animate-spin mx-auto" />
                <p className="mt-4 text-stone-400 text-sm">{t('common.loading')}</p>
              </div>
            ) : publishedPosts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl text-stone-500 dark:text-stone-400 font-light">Henüz blog yazısı bulunmuyor.</p>
              </div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
              >
                {publishedPosts.map((post) => (
                  <motion.div key={post.id} variants={itemVariants}>
                    <div className="minimalist-card p-7 h-full flex flex-col group hover:-translate-y-1">
                      <div className="space-y-4 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="px-3 py-1 bg-primary-green/5 dark:bg-dark-forest/30 text-primary-green dark:text-primary-sage text-xs font-bold rounded-full border border-primary-green/10 dark:border-primary-sage/20 uppercase tracking-widest">
                            {post.language === 'tr' ? 'Türkçe' : 'English'}
                          </span>
                          <div className="flex items-center text-xs text-stone-400 dark:text-stone-500">
                            <Calendar className="w-3.5 h-3.5 mr-1.5 text-accent-terracotta/60" />
                            {new Date(post.createdAt).toLocaleDateString(
                              language === 'tr' ? 'tr-TR' : 'en-US',
                              { year: 'numeric', month: 'short', day: 'numeric' }
                            )}
                          </div>
                        </div>

                        <h2 className="text-xl font-serif font-semibold text-stone-900 dark:text-stone-100 group-hover:text-primary-green dark:group-hover:text-primary-sage transition-colors duration-300 line-clamp-2 leading-snug">
                          {post.title}
                        </h2>

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
                            {t('common.readMore')}
                            <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover/btn:translate-x-1" />
                          </Link>
                        </Button>
                      </div>
                    </div>
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
