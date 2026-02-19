'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/lib/i18n';
import type { FAQ } from '@/actions/faqs/loadFaqs';
import loadFaqs from '@/actions/faqs/loadFaqs';
import { ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function FAQSection() {
  const { t, language } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFaqsData = async () => {
      try {
        const faqsData = await loadFaqs();
        setFaqs(faqsData);
      } catch (error) {
        console.error('Error loading FAQs:', error);
      } finally {
        setLoading(false);
      }
    };
    loadFaqsData();
  }, []);

  // Filter and get top FAQs in current language
  const featuredFaqs = faqs
    .filter(faq => faq.language === language && faq.isActive)
    .sort((a, b) => a.orderNum - b.orderNum)
    .slice(0, 4);

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

  if (loading) {
    return (
      <section className="py-20 psychology-gradient">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t('common.loading')}</p>
        </div>
      </section>
    );
  }

  if (featuredFaqs.length === 0) {
    return null;
  }

  return (
    <section className="py-32 minimalist-gradient relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={"visible"}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-stone-900 mb-6">
              {t('home.faq.title')}
            </h2>
            <div className="w-20 h-1.5 bg-accent-terracotta mx-auto mb-8 rounded-full opacity-80" />
            <p className="text-xl text-stone-600 font-medium">
              {t('faq.subtitle')}
            </p>
          </motion.div>

          <div className="space-y-6 mb-16">
            {featuredFaqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <motion.div key={faq.id} variants={itemVariants}>
                  <div className={`minimalist-card overflow-hidden transition-all duration-500 ${isOpen ? 'border-primary-green/20' : ''}`}>
                    <button
                      className="w-full text-left focus:outline-none"
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                    >
                      <div className="p-8">
                        <div className="flex items-center justify-between">
                          <h3 className={`text-xl font-display font-bold transition-colors duration-300 ${isOpen ? 'text-primary-green' : 'text-stone-800'}`}>
                            {faq.question}
                          </h3>
                          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${isOpen ? 'bg-primary-green text-white rotate-180' : 'bg-stone-100 text-stone-400'}`}>
                            <ChevronDown className="w-5 h-5" />
                          </div>
                        </div>

                        <motion.div
                          initial={false}
                          animate={{
                            height: isOpen ? 'auto' : 0,
                            opacity: isOpen ? 1 : 0,
                            marginTop: isOpen ? 24 : 0
                          }}
                          transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                          className="overflow-hidden"
                        >
                          <div className="pt-6 border-t border-stone-100">
                            <p className="text-stone-600 leading-relaxed font-medium whitespace-pre-wrap">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      </div>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div variants={itemVariants} className="text-center">
            <Button
              size="lg"
              className="bg-primary-green hover:bg-primary-green/90 text-white px-10 py-7 text-lg rounded-2xl shadow-xl shadow-primary-green/20 transition-all duration-300 hover:scale-105"
              asChild
            >
              <Link href="/sss">
                {t('faq.btn')}
                <ArrowRight className="w-5 h-5 ml-3" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
