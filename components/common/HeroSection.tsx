'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/lib/i18n';
import { Phone, Calendar } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import gunnurteksen from '@/assets/img/gunnurteksen.webp'
export function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="pt-32 pb-20 minimalist-gradient min-h-screen flex items-center overflow-hidden">
      <div className="container mx-auto px-4 relative">
        {/* Abstract Background Element */}
        <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 bg-primary-leaf/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-72 h-72 bg-accent-terracotta/5 rounded-full blur-3xl" />

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
                className="inline-block px-4 py-1.5 bg-primary-green/5 border border-primary-green/10 rounded-full"
              >
                <span className="text-xs font-bold tracking-widest uppercase text-primary-green/80">
                  {t('home.hero.desc')}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-stone-900 leading-[1.1]"
              >
                {t('home.hero.title')}
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg md:text-xl text-stone-600 leading-relaxed max-w-2xl"
            >
              {t('home.hero.subtitle.p1')} {t('home.hero.subtitle.p2')} {t('home.hero.subtitle.p3')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-5"
            >
              <Button
                size="lg"
                className="bg-accent-terracotta hover:bg-accent-terracotta/90 text-white px-10 py-7 text-lg rounded-2xl shadow-xl shadow-accent-terracotta/20 transition-all duration-300 hover:scale-105"
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
                className="px-10 py-7 text-lg text-primary-green hover:bg-stone-200/50 rounded-2xl transition-all duration-300"
                asChild
              >
                <a href="tel:+905356516747">
                  <Phone className="w-5 h-5 mr-3" />
                  {t('common.call')}
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="lg:col-span-5 relative lg:block"
          >
            <div className="relative z-10 w-full aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white/50">
              <Image
                src={gunnurteksen}
                alt="Psk. Günnur Tekşen"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                priority
              />
            </div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent-terracotta rounded-3xl -z-0 opacity-20 blur-xl" />
            <div className="absolute top-1/2 -left-12 -translate-y-1/2 w-24 h-48 bg-primary-leaf/20 rounded-full blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
