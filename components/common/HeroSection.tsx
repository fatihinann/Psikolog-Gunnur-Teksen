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
    <section className="pt-20 psychology-gradient min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight"
            >
              {t('home.hero.title')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-sm md:text-lg text-gray-700 leading-relaxed"
            >
              {t('home.hero.subtitle.p1')}<br />
              {t('home.hero.subtitle.p2')}<br />
              {t('home.hero.subtitle.p3')}<br />
              {t('home.hero.subtitle.p4')}
            </motion.p>
          </motion.div>
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl psychology-card">
              <div className="aspect-0 md:aspect-[3/2] bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <div className="">
                    <Image src={gunnurteksen} alt="Psk. Günnur Tekşen" className='mx-auto mb-4 w-80 rounded-3xl' />
                  </div>
                  <p className="text-lg font-semibold">Günnur Tekşen</p>
                  <p className="text-sm">{t('home.hero.desc')}</p>
                </div>
              </div>

            </div>
          </motion.div>
          {/* Specialties */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
              asChild
            >
              <Link href="/contact">
                <Calendar className="w-5 h-5 mr-2" />
                {t('common.appointment')}
              </Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="px-8 py-3 text-lg border-blue-200 text-blue-700 hover:bg-blue-50"
              asChild
            >
              <a href="tel:+905356516747">
                <Phone className="w-5 h-5 mr-2" />
                {t('common.call')}
              </a>
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="pt-6"
          >
            <p className="text-sm text-gray-600 mb-3">{t('common.expertise')}:</p>
            <div className="flex flex-wrap gap-2">
              {[
                t('common.expertise-1'),
                t('common.expertise-2'),
                t('common.expertise-3'),
                t('common.expertise-4'),
                t('common.expertise-5'),
                t('common.expertise-6'),
              ].map((specialty, index) => (
                <span
                  key={specialty}
                  className="px-3 py-1 bg-white/60 backdrop-blur-sm text-blue-700 text-sm rounded-full border border-blue-200"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
