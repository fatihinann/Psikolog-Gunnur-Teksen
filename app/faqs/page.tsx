'use client';

import { motion } from 'framer-motion';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/lib/i18n';
import { useEffect, useState } from 'react';
import type { FAQ } from '@/actions/faqs/loadFaqs';
import loadFaqs from '@/actions/faqs/loadFaqs';
import { ChevronDown, Phone, Calendar } from 'lucide-react';
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
                {t('faq.title')}
              </h1>
              <div className="w-16 h-0.5 bg-accent-terracotta mx-auto mb-8 opacity-70" />
              <p className="text-xl text-stone-500 dark:text-stone-400 font-light leading-relaxed">
                {t('faq.subtitle')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-20 bg-accent-sand/30 dark:bg-dark-surface">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {loading ? (
                <div className="text-center py-16">
                  <div className="w-10 h-10 border-2 border-primary-sage/30 border-t-primary-sage rounded-full animate-spin mx-auto" />
                  <p className="mt-4 text-stone-400 text-sm">{t('common.loading')}</p>
                </div>
              ) : activeFaqs.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-xl text-stone-500 dark:text-stone-400 font-light">Henüz SSS içeriği bulunmuyor.</p>
                </div>
              ) : (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4 mb-12"
                >
                  {activeFaqs.map((faq, index) => {
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
                </motion.div>
              )}

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="minimalist-card p-10 text-center">
                  <h3 className="text-2xl font-serif font-light text-stone-900 dark:text-stone-100 mb-3">
                    {t('faq.cta.title')}
                  </h3>
                  <p className="text-stone-500 dark:text-stone-400 mb-8 font-light">
                    {t('faq.cta.subtitle')}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      size="lg"
                      className="bg-primary-green hover:bg-primary-green/90 dark:bg-dark-forest dark:hover:bg-dark-forest/80 text-white px-10 py-6 rounded-2xl shadow-lg shadow-primary-green/20 font-medium transition-all duration-300 hover:scale-[1.03]"
                      asChild
                    >
                      <Link href="/contact">
                        <Calendar className="w-4 h-4 mr-2" />
                        {t('common.appointment')}
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-stone-200 dark:border-dark-muted text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-dark-muted/50 px-10 py-6 rounded-2xl font-medium"
                      asChild
                    >
                      <a href="tel:+905016050697">
                        <Phone className="w-4 h-4 mr-2" />
                        {t('common.call')}
                      </a>
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
