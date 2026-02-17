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
    <section className="py-20 psychology-gradient">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={"visible"}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('home.faq.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('faq.subtitle')}
            </p>
          </motion.div>

          <div className="space-y-4 mb-12">
            {featuredFaqs.map((faq, index) => (
              <motion.div key={faq.id} variants={itemVariants}>
                <Card className="psychology-card overflow-hidden">
                  <button
                    className="w-full text-left"
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900 pr-4">
                          {faq.question}
                        </h3>
                        <div className="flex-shrink-0">
                          {openIndex === index ? (
                            <ChevronUp className="w-5 h-5 text-blue-600" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                      </div>

                      <motion.div
                        initial={false}
                        animate={{
                          height: openIndex === index ? 'auto' : 0,
                          opacity: openIndex === index ? 1 : 0
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 border-t border-gray-100 mt-4">
                          <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    </CardContent>
                  </button>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div variants={itemVariants} className="text-center">
            <Button size="lg" variant="outline" asChild>
              <Link href="/sss">
                {t('faq.btn')}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
