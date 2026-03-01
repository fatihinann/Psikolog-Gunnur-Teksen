'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/lib/i18n';
import type { FAQ } from '@/actions/faqs/loadFaqs';
import loadFaqs from '@/actions/faqs/loadFaqs';
import { ChevronDown, ArrowRight } from 'lucide-react';
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

  const featuredFaqs = faqs
    .filter(faq => faq.language === language && faq.isActive)
    .sort((a, b) => a.orderNum - b.orderNum)
    .slice(0, 4);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
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

  if (featuredFaqs.length === 0) return null;

  return (
    <section className="py-32 bg-accent-sand/40 dark:bg-dark-surface relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-96 bg-primary-sage/5 dark:bg-dark-forest/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-serif font-light text-stone-900 dark:text-stone-100 mb-6 tracking-tight">
              {t('home.faq.title')}
            </h2>
            <div className="w-16 h-0.5 bg-accent-terracotta mx-auto mb-8 opacity-70" />
            <p className="text-xl text-stone-500 dark:text-stone-400 font-light">
              {t('faq.subtitle')}
            </p>
          </motion.div>

          <div className="space-y-4 mb-16">
            {featuredFaqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <motion.div key={faq.id} variants={itemVariants}>
                  <div className={`minimalist-card overflow-hidden transition-all duration-300 ${isOpen ? 'border-primary-sage/30 dark:border-primary-sage/20' : ''}`}>
                    <button
                      className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-sage/40 rounded-2xl"
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                    >
                      <div className="p-7">
                        <div className="flex items-center justify-between gap-6">
                          <h3 className={`text-lg font-display font-semibold transition-colors duration-300 ${isOpen ? 'text-primary-green dark:text-primary-sage' : 'text-stone-800 dark:text-stone-200'}`}>
                            {faq.question}
                          </h3>
                          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${isOpen ? 'bg-primary-green dark:bg-dark-forest text-white rotate-180' : 'bg-stone-100 dark:bg-dark-muted text-stone-400 dark:text-stone-500'}`}>
                            <ChevronDown className="w-4 h-4" />
                          </div>
                        </div>

                        <motion.div
                          initial={false}
                          animate={{
                            height: isOpen ? 'auto' : 0,
                            opacity: isOpen ? 1 : 0,
                            marginTop: isOpen ? 20 : 0
                          }}
                          transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                          className="overflow-hidden"
                        >
                          <div className="pt-5 border-t border-stone-100 dark:border-dark-muted/50">
                            <p className="text-stone-600 dark:text-stone-400 leading-relaxed font-light whitespace-pre-wrap text-sm">
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
              className="bg-primary-green hover:bg-primary-green/90 dark:bg-dark-forest dark:hover:bg-dark-forest/80 text-white px-12 py-7 text-base rounded-2xl shadow-xl shadow-primary-green/20 dark:shadow-dark-forest/30 transition-all duration-300 hover:scale-[1.03] font-medium tracking-wide"
              asChild
            >
              <Link href="/faqs">
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
