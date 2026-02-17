'use client';

import { motion } from 'framer-motion';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from '@/lib/i18n';
import { useEffect, useState } from 'react';
import loadBlogPostByIdAction from '@/actions/blog/loadBlogPostById';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import type { BlogPost } from '@/actions/blog/loadBlogPosts';

export default function BlogPostPage() {
  const { t, language } = useTranslation();
  const params = useParams();
  const postId = params?.id as string;

  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const posts = await loadBlogPostByIdAction(postId);
        setBlogPost(posts[0] || null);
      } catch (error) {
        console.error('Error loading blog post:', error);
      } finally {
        setLoading(false);
      }
    };
    if (postId) {
      loadPost();
    }
  }, [postId]);



  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-20">
          <div className="container mx-auto px-4 py-16 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">{t('common.loading')}</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!blogPost) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-20">
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog yazısı bulunamadı</h1>
            <Button asChild>
              <Link href="/blog">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Blog'a Dön
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-20">
        {/* Back Button */}
        <section className="bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <Button variant="ghost" asChild>
              <Link href="/blog">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t('blog.back')}
              </Link>
            </Button>
          </div>
        </section>

        {/* Article */}
        <article className="bg-white">
          <div className="container mx-auto px-4 py-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              {/* Article Header */}
              <header className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <Badge variant="outline" className="text-blue-600 border-blue-200">
                    {blogPost.language === 'tr' ? '🇹🇷 Türkçe' : '🇺🇸 English'}
                  </Badge>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(blogPost.createdAt).toLocaleDateString(
                      language === 'tr' ? 'tr-TR' : 'en-US',
                      {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }
                    )}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    ~{Math.ceil(blogPost.content.length / 1000)} dk okuma
                  </div>
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
                  {blogPost.title}
                </h1>

                {blogPost.excerpt && (
                  <p className="text-xl text-gray-600 leading-relaxed">
                    {blogPost.excerpt}
                  </p>
                )}
              </header>

              {/* Article Content */}
              <div className="prose prose-lg max-w-none">
                <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                  {blogPost.content}
                </div>
              </div>

              {/* Article Footer */}
              <footer className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Son güncelleme:</p>
                    <p className="text-sm text-gray-700">
                      {new Date(blogPost.updatedAt).toLocaleDateString(
                        language === 'tr' ? 'tr-TR' : 'en-US'
                      )}
                    </p>
                  </div>
                  <Button asChild>
                    <Link href="/iletisim">
                      Benimle İletişime Geçin
                    </Link>
                  </Button>
                </div>
              </footer>
            </motion.div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
