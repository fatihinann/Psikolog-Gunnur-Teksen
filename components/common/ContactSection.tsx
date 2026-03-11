'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/lib/i18n';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { ContactForm } from './ContactForm';

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

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-10">
              <motion.div variants={itemVariants} className="grid grid-cols-1 gap-4">
                <a
                  href="tel:+905016050697"
                  className="group flex items-center gap-6 p-6 bg-white/5 dark:bg-dark-card/60 hover:bg-white/10 dark:hover:bg-dark-muted/60 rounded-2xl transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-full bg-white/10 group-hover:bg-accent-terracotta/40 flex items-center justify-center transition-all duration-300">
                    <Phone className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-[0.2em] font-semibold mb-1">{t('contact.phone')}</p>
                    <p className="text-white font-semibold group-hover:text-accent-terracotta transition-colors duration-300">+90 501 605 06 97</p>
                  </div>
                </a>

                <a
                  href="mailto:pskgunnurteksen@gmail.com"
                  className="group flex items-center gap-6 p-6 bg-white/5 dark:bg-dark-card/60 hover:bg-white/10 dark:hover:bg-dark-muted/60 rounded-2xl transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-full bg-white/10 group-hover:bg-primary-sage/30 flex items-center justify-center transition-all duration-300">
                    <Mail className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-[0.2em] font-semibold mb-1">{t('contact.email')}</p>
                    <p className="text-white font-medium text-sm group-hover:text-primary-sage transition-colors duration-300">pskgunnurteksen@gmail.com</p>
                  </div>
                </a>

                <a 
                  href="https://maps.app.goo.gl/vrpvGciNr7rim3K79"
                  className="group flex items-center gap-6 p-6 bg-white/5 dark:bg-dark-card/60 hover:bg-white/10 dark:hover:bg-dark-muted/60 rounded-2xl transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-all duration-300">
                    <MapPin className="w-5 h-5 text-white/70" />
                  </div>
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-[0.2em] font-semibold mb-1">{t('contact.address')}</p>
                    <p className="text-white/70 font-light text-sm leading-relaxed">{t('common.address')}</p>
                  </div>
                </a>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-4 px-2">
                <div className="flex flex-wrap gap-6 text-sm">
                  <div className="flex items-center space-x-2 text-white/60">
                    <div className="w-1 h-1 rounded-full bg-accent-terracotta/60" />
                    <span><span className="text-white/80 font-medium">{t('session.duration')}:</span> 50 {t('common.minute')}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-white/60">
                    <div className="w-1 h-1 rounded-full bg-accent-terracotta/60" />
                    <span><span className="text-white/80 font-medium">{t('session.payment')}:</span> {t('session.payment.description')}</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <motion.div variants={itemVariants}>
                <ContactForm />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
