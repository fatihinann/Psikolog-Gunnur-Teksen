'use client';

import { motion } from 'framer-motion';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/lib/i18n';
import { useEffect, useState } from 'react';
import type { FAQ } from '@/actions/faqs/loadFaqs';
import loadFaqs from '@/actions/faqs/loadFaqs';
import { ChevronDown, ChevronUp, Phone } from 'lucide-react';
import Link from 'next/link';

export default function FAQPage() {
  const { t, language } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
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

  const activeFaqs = faqs
    .filter(faq => faq.language === language && faq.isActive)
    .sort((a, b) => a.orderNum - b.orderNum);

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
                {t('faq.title')}
              </h1>
              <p className="text-xl text-gray-600">
                {t('faq.subtitle')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {loading ? (
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600">{t('common.loading')}</p>
                </div>
              ) : activeFaqs.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-xl text-gray-600">Henüz SSS içeriği bulunmuyor.</p>
                </div>
              ) : (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4 mb-12"
                >
                  {activeFaqs.map((faq, index) => (
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
                </motion.div>
              )}

              {/* Contact CTA */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-center"
              >
                <Card className="psychology-card">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      {t('faq.cta.title')}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {t('faq.cta.subtitle')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button size="lg" asChild>
                        <Link href="/iletisim">
                          {t('common.appointment')}
                        </Link>
                      </Button>
                      <Button variant="outline" size="lg" asChild>
                        <a href="tel:+905356516747">
                          <Phone className="w-5 h-5 mr-2" />
                          {t('common.call')}
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
