'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/lib/i18n';
import { Phone, Calendar } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import gunnurteksen from '@/assets/img/gunnurteksen.webp'

export function HeroSection() {
  const { t, tm } = useTranslation();

  return (
    <section className="pt-32 pb-20 minimalist-gradient min-h-screen flex items-center overflow-hidden">
      <div className="container mx-auto px-4 relative">
        {/* Ambient Background Blobs */}
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[500px] h-[500px] bg-primary-sage/10 dark:bg-dark-forest/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-80 h-80 bg-accent-terracotta/6 dark:bg-accent-terracotta/5 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-block px-4 py-1.5 bg-primary-green/5 dark:bg-dark-forest/40 border border-primary-green/10 dark:border-primary-sage/20 rounded-full"
              >
                <span className="text-xs font-bold tracking-widest uppercase text-primary-green dark:text-primary-sage/90">
                  {t('home.hero.desc')}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-5xl md:text-6xl lg:text-7xl font-serif font-light text-stone-900 dark:text-stone-100 leading-[1.05] tracking-tight"
              >
                {t('home.hero.title')}
              </motion.h1>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg md:text-xl text-stone-600 dark:text-stone-400 leading-relaxed max-w-2xl space-y-2"
            >
              {tm('home.hero.subtitle').map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                className="bg-primary-green hover:bg-primary-green/90 dark:bg-dark-forest dark:hover:bg-dark-forest/80 text-white px-10 py-7 text-base rounded-2xl shadow-xl shadow-primary-green/20 dark:shadow-dark-forest/30 transition-all duration-300 hover:scale-[1.03] font-medium tracking-wide"
                asChild
              >
                <Link href="/contact">
                  <Calendar className="w-5 h-5 mr-3" />
                  {t('common.appointment')}
                </Link>
              </Button>

              <Button
                variant="ghost"
                size="lg"
                className="px-10 py-7 text-base text-primary-green dark:text-stone-300 hover:bg-accent-sand/60 dark:hover:bg-dark-surface/80 border border-primary-green/20 dark:border-dark-muted/50 rounded-2xl transition-all duration-300 font-medium"
                asChild
              >
                <a href="tel:+905356516747">
                  <Phone className="w-5 h-5 mr-3" />
                  {t('common.call')}
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Arch-shaped Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            {/* Soft blobs behind the image */}
            <div className="absolute inset-0 -m-8 bg-primary-sage/10 dark:bg-dark-forest/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-accent-terracotta/10 rounded-full blur-2xl" />

            <div className="relative z-10 w-full max-w-sm mx-auto">
              {/* Arch frame container */}
              <div className="arch-frame w-full aspect-[3/4] shadow-2xl shadow-primary-green/15 dark:shadow-black/50 border-4 border-white/40 dark:border-dark-muted/30">
                <Image
                  src={gunnurteksen}
                  alt="Psk. Günnur Tekşen"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
