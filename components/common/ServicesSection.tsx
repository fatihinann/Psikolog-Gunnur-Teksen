'use client';

import { Button } from '@/components/ui/button';
import { useTranslation } from '@/lib/i18n';
import { ArrowRight, Brain, Heart, Users, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export function ServicesSection() {
  const { t } = useTranslation();

  const staticServices = [
    {
      id: '1',
      name: t('common.expertise-1'),
      icon: Heart,
    },
    {
      id: '2',
      name: t('common.expertise-2'),
      icon: Brain,
    },
    {
      id: '3',
      name: t('common.expertise-3'),
      icon: Users,
    },
    {
      id: '4',
      name: t('common.expertise-4'),
      icon: Sparkles,
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const getServiceAccent = (index: number) => {
    const accents = [
      'bg-primary-green/8 dark:bg-dark-forest/40 text-primary-green dark:text-primary-sage border-primary-green/10 dark:border-primary-sage/15',
      'bg-accent-terracotta/8 dark:bg-accent-terracotta/15 text-accent-terracotta border-accent-terracotta/12 dark:border-accent-terracotta/20',
      'bg-primary-sage/10 dark:bg-primary-sage/10 text-primary-sage dark:text-primary-sage border-primary-sage/15 dark:border-primary-sage/20',
      'bg-stone-100 dark:bg-dark-muted/50 text-stone-500 dark:text-stone-400 border-stone-200/60 dark:border-dark-muted/30',
    ];
    return accents[index % accents.length];
  };

  return (
    <section className="py-32 minimalist-gradient relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary-sage/6 dark:bg-dark-forest/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-terracotta/4 dark:bg-accent-terracotta/6 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="text-center mb-24 max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-serif font-light text-stone-900 dark:text-stone-100 mb-6 tracking-tight">
              {t('home.services.title')}
            </h2>
            <div className="w-16 h-0.5 bg-accent-terracotta mx-auto mb-8 opacity-70" />
            <p className="text-xl text-stone-500 dark:text-stone-400 leading-relaxed font-light">
              {t('services.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {staticServices.map((service, index) => {
              const IconComponent = service.icon;
              const accent = getServiceAccent(index);

              return (
                <motion.div key={service.id} variants={itemVariants}>
                  <div className="minimalist-card p-8 h-full flex flex-col items-center justify-center text-center group hover:-translate-y-2 cursor-default min-h-[250px]">
                    <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-8 border transition-all duration-500 group-hover:scale-110 ${accent}`}>
                      <IconComponent className="w-10 h-10" />
                    </div>
                    <h3 className="text-xl font-serif font-semibold text-stone-900 dark:text-stone-100 tracking-tight leading-snug">
                      {service.name}
                    </h3>
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
              <Link href="/services">
                {t('services.btn')}
                <ArrowRight className="w-5 h-5 ml-3" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
