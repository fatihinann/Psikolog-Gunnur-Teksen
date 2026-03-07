'use client';

import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/i18n';
import { Phone, Mail, MapPin, Clock, MessageCircle, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  const { t } = useTranslation();

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const contactCards = [
    {
      icon: Phone,
      label: t('contact.phone'),
      value: '+90 501 605 06 97',
      href: 'tel:+905016050697',
      accent: 'bg-primary-green/8 dark:bg-dark-forest/40 text-primary-green dark:text-primary-sage border-primary-green/10 dark:border-primary-sage/20',
    },
    {
      icon: Mail,
      label: t('contact.email'),
      value: 'pskgunnurteksen@gmail.com',
      href: 'mailto:pskgunnurteksen@gmail.com',
      accent: 'bg-accent-terracotta/8 dark:bg-accent-terracotta/15 text-accent-terracotta border-accent-terracotta/12 dark:border-accent-terracotta/20',
    },
    {
      icon: MapPin,
      label: t('contact.address'),
      value: t('common.address'),
      href: undefined,
      accent: 'bg-primary-sage/10 dark:bg-primary-sage/10 text-primary-sage border-primary-sage/15 dark:border-primary-sage/20',
    },
  ];

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
                {t('home.contact.title')}
              </h1>
              <div className="w-16 h-0.5 bg-accent-terracotta mx-auto mb-8 opacity-70" />
              <p className="text-xl text-stone-500 dark:text-stone-400 font-light leading-relaxed">
                {t('contact.subtitle')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Cards + Session Info */}
        <section className="py-20 bg-accent-sand/30 dark:bg-dark-surface">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } }, hidden: {} }}
              className="max-w-5xl mx-auto space-y-8"
            >
              {/* Contact Info — Large cards with icon left */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {contactCards.map((card, i) => {
                  const Icon = card.icon;
                  const inner = (
                    <div className="minimalist-card p-7 h-full flex flex-col items-center text-center group hover:-translate-y-1">
                      <div className={`p-4 rounded-2xl border mb-5 transition-all duration-500 group-hover:scale-110 ${card.accent}`}>
                        <Icon className="w-7 h-7" />
                      </div>
                      <p className="text-xs font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-2">
                        {card.label}
                      </p>
                      <p className="text-stone-800 dark:text-stone-200 font-medium leading-snug text-sm">
                        {card.value}
                      </p>
                    </div>
                  );

                  return (
                    <motion.div key={i} variants={itemVariants}>
                      {card.href ? (
                        <a href={card.href} className="block h-full">{inner}</a>
                      ) : inner}
                    </motion.div>
                  );
                })}
              </div>

              {/* Session Info + CTA */}
              <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Session Details */}
                <div className="minimalist-card p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="p-3 rounded-2xl bg-primary-sage/10 dark:bg-dark-forest/40 border border-primary-sage/15 dark:border-primary-sage/20">
                      <Clock className="w-6 h-6 text-primary-sage" />
                    </div>
                    <h3 className="text-xl font-serif font-semibold text-stone-900 dark:text-stone-100">
                      {t('session.informations.title')}
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {[
                      { label: t('session.duration'), value: `50 ${t('min')}` },
                      { label: t('session.payment'), value: t('session.payment.description') },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start space-x-3">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary-sage/60 flex-shrink-0" />
                        <p className="text-sm text-stone-600 dark:text-stone-400 font-light">
                          <span className="font-semibold text-stone-700 dark:text-stone-300">{item.label}:</span>{' '}
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Box */}
                <div className="minimalist-card p-8 bg-primary-green dark:bg-dark-forest border-primary-green dark:border-dark-forest flex flex-col justify-center">
                  <div className="flex items-center space-x-3 mb-5">
                    <div className="p-3 rounded-2xl bg-white/10">
                      <MessageCircle className="w-6 h-6 text-accent-terracotta" />
                    </div>
                    <h3 className="text-xl font-serif font-semibold text-white">
                      {t('about.cta.title')}
                    </h3>
                  </div>
                  <p className="text-white/70 text-sm font-light leading-relaxed mb-6">
                    {t('about.cta.desc')}
                  </p>
                  <div className="flex flex-col gap-3">
                    <Button
                      className="bg-white/15 hover:bg-white/25 text-white border border-white/20 rounded-xl w-full font-medium transition-all duration-300"
                      asChild
                    >
                      <a href="tel:+905016050697">
                        <Phone className="w-4 h-4 mr-2" />
                        {t('common.call')}
                      </a>
                    </Button>
                    <Button
                      className="bg-accent-terracotta/80 hover:bg-accent-terracotta text-white rounded-xl w-full font-medium transition-all duration-300"
                      asChild
                    >
                      <a href="https://www.instagram.com/gunnurteksenn/" target="_blank">
                        Instagram
                      </a>
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Map */}
        <section className="py-16 bg-dark-base dark:bg-dark-base">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-2xl font-serif font-light text-stone-300 mb-8 text-center">
                {t('contact.office.location')}
              </h2>
              <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-dark-muted/30">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3009.3942849472!2d28.7845!3d41.0082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDAwJzI5LjUiTiAyOMKwNDcnMDQuMyJF!5e0!3m2!1str!2str!4v1620000000000!5m2!1str!2str"
                  width="100%"
                  height="380"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ofis Konumu"
                />
              </div>
              <p className="text-center mt-5 text-stone-500 text-sm font-light">
                {t('common.address')}
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
