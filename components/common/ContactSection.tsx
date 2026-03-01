'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/lib/i18n';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function ContactSection() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section ref={ref} className="py-24 bg-primary-green dark:bg-dark-surface relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/3 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-accent-terracotta/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-48 bg-white/2 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-5xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-serif font-light text-white mb-5 tracking-tight">
              {t('home.contact.title')}
            </h2>
            <div className="w-16 h-0.5 bg-accent-terracotta/60 mx-auto mb-6" />
            <p className="text-white/60 font-light text-lg max-w-xl mx-auto">
              {t('contact.subtitle')}
            </p>
          </motion.div>

          {/* Horizontal contact row */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 dark:bg-dark-muted/30 rounded-2xl overflow-hidden mb-10">
            <a
              href="tel:+905356516747"
              className="group flex flex-col items-center text-center p-8 bg-white/5 dark:bg-dark-card/60 hover:bg-white/10 dark:hover:bg-dark-muted/60 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-white/10 group-hover:bg-accent-terracotta/40 flex items-center justify-center mb-4 transition-all duration-300">
                <Phone className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
              </div>
              <p className="text-xs text-white/40 uppercase tracking-[0.2em] font-semibold mb-2">{t('contact.phone')}</p>
              <p className="text-white font-semibold text-lg group-hover:text-accent-terracotta transition-colors duration-300">+90 535 651 67 47</p>
            </a>

            <a
              href="mailto:pskgunnurteksen@gmail.com"
              className="group flex flex-col items-center text-center p-8 bg-white/5 dark:bg-dark-card/60 hover:bg-white/10 dark:hover:bg-dark-muted/60 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-white/10 group-hover:bg-primary-sage/30 flex items-center justify-center mb-4 transition-all duration-300">
                <Mail className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
              </div>
              <p className="text-xs text-white/40 uppercase tracking-[0.2em] font-semibold mb-2">{t('contact.email')}</p>
              <p className="text-white font-medium text-sm group-hover:text-primary-sage transition-colors duration-300">pskgunnurteksen@gmail.com</p>
            </a>

            <div className="flex flex-col items-center text-center p-8 bg-white/5 dark:bg-dark-card/60">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
                <MapPin className="w-5 h-5 text-white/70" />
              </div>
              <p className="text-xs text-white/40 uppercase tracking-[0.2em] font-semibold mb-2">{t('contact.address')}</p>
              <p className="text-white/70 font-light text-sm leading-relaxed">{t('common.address')}</p>
            </div>
          </motion.div>

          {/* Session info + CTA inline */}
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-center justify-between gap-6 px-2">
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center space-x-2 text-white/60">
                <div className="w-1 h-1 rounded-full bg-accent-terracotta/60" />
                <span><span className="text-white/80 font-medium">{t('session.duration')}:</span> 50 {t('common.minute')}</span>
              </div>
              <div className="flex items-center space-x-2 text-white/60">
                <div className="w-1 h-1 rounded-full bg-accent-terracotta/60" />
                <span><span className="text-white/80 font-medium">{t('session.online')}:</span> {t('session.via')}</span>
              </div>
              <div className="flex items-center space-x-2 text-white/60">
                <div className="w-1 h-1 rounded-full bg-accent-terracotta/60" />
                <span><span className="text-white/80 font-medium">{t('session.payment')}:</span> {t('session.payment.description')}</span>
              </div>
            </div>

            <Button
              className="flex-shrink-0 bg-white/10 border border-white/20 hover:bg-white hover:text-primary-green text-white rounded-xl px-8 py-6 font-medium transition-all duration-300 text-sm whitespace-nowrap"
              asChild
            >
              <Link href="/contact">
                {t('common.appointment')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
