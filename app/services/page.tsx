'use client';

import { motion } from 'framer-motion';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/lib/i18n';
import { useEffect, useState } from 'react';
import loadServices from '@/actions/services/loadServices';
import type { Service } from '@/actions/services/loadServices';
import { Brain, Heart, Users, Lightbulb, Leaf, Sparkles, Phone, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function ServicesPage() {
  const { t, language } = useTranslation();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadServicesData = async () => {
      try {
        const servicesData = await loadServices();
        setServices(servicesData);
      } catch (error) {
        console.error('Error loading services:', error);
      } finally {
        setLoading(false);
      }
    };
    loadServicesData();
  }, []);

  const activeServices = services.filter(service =>
    service.language === language && service.isActive
  );

  const getServiceIcon = (index: number) => {
    const icons = [Brain, Heart, Users, Lightbulb, Leaf, Sparkles];
    return icons[index % icons.length];
  };

  const getServiceAccent = (index: number) => {
    const accents = [
      'bg-primary-green/8 dark:bg-dark-forest/40 text-primary-green dark:text-primary-sage border-primary-green/10 dark:border-primary-sage/15',
      'bg-accent-terracotta/8 dark:bg-accent-terracotta/15 text-accent-terracotta border-accent-terracotta/12 dark:border-accent-terracotta/20',
      'bg-primary-sage/10 dark:bg-primary-sage/10 text-primary-sage border-primary-sage/15 dark:border-primary-sage/20',
      'bg-stone-100 dark:bg-dark-muted/50 text-stone-500 dark:text-stone-400 border-stone-200/60 dark:border-dark-muted/30',
    ];
    return accents[index % accents.length];
  };

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
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-sage/8 dark:bg-dark-forest/20 rounded-full blur-3xl -mr-24 -mt-24" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-5xl md:text-6xl font-serif font-light text-stone-900 dark:text-stone-100 mb-5 tracking-tight">
                {t('services.title')}
              </h1>
              <div className="w-16 h-0.5 bg-accent-terracotta mx-auto mb-8 opacity-70" />
              <p className="text-xl text-stone-500 dark:text-stone-400 font-light leading-relaxed">
                {t('services.subtitle')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 bg-accent-sand/30 dark:bg-dark-surface">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="text-center py-16">
                <div className="w-10 h-10 border-2 border-primary-sage/30 border-t-primary-sage rounded-full animate-spin mx-auto" />
                <p className="mt-4 text-stone-400 text-sm">{t('common.loading')}</p>
              </div>
            ) : activeServices.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl text-stone-500 dark:text-stone-400 font-light">Hizmet bilgisi bulunmuyor.</p>
              </div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-5xl mx-auto space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {activeServices.map((service, index) => {
                    const IconComponent = getServiceIcon(index);
                    const accent = getServiceAccent(index);
                    return (
                      <motion.div key={service.id} variants={itemVariants}>
                        <div className="minimalist-card p-8 h-full group hover:-translate-y-1">
                          <div className="flex items-start space-x-5">
                            <div className={`flex-shrink-0 p-3.5 rounded-2xl border transition-all duration-500 group-hover:scale-110 ${accent}`}>
                              <IconComponent className="w-7 h-7" />
                            </div>
                            <div>
                              <h3 className="text-xl font-serif font-semibold text-stone-900 dark:text-stone-100 mb-3 tracking-tight">
                                {service.name}
                              </h3>
                              <p className="text-stone-500 dark:text-stone-400 leading-relaxed text-sm font-light">
                                {service.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Expertise Tags */}
                <motion.div variants={itemVariants}>
                  <div className="minimalist-card p-8">
                    <h3 className="text-2xl font-serif font-semibold text-stone-900 dark:text-stone-100 mb-6">
                      {t('common.expertise')}
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <span
                          key={i}
                          className="px-4 py-2 text-sm bg-primary-green/5 dark:bg-dark-forest/30 text-primary-green dark:text-primary-sage border border-primary-green/10 dark:border-primary-sage/20 rounded-full font-medium"
                        >
                          {t(`common.expertise-${i}`)}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* CTA */}
                <motion.div variants={itemVariants}>
                  <div className="minimalist-card p-10 text-center">
                    <h3 className="text-2xl font-serif font-light text-stone-900 dark:text-stone-100 mb-3">
                      {t('about.cta.title')}
                    </h3>
                    <p className="text-stone-500 dark:text-stone-400 mb-8 font-light">
                      {t('about.cta.desc')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button
                        size="lg"
                        className="bg-primary-green hover:bg-primary-green/90 dark:bg-dark-forest dark:hover:bg-dark-forest/80 text-white px-10 py-6 rounded-2xl shadow-lg shadow-primary-green/20 dark:shadow-dark-forest/30 transition-all duration-300 hover:scale-[1.03] font-medium"
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
              </motion.div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
