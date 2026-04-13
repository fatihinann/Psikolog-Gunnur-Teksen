'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslation } from '@/lib/i18n';
import bekleme1 from '@/assets/img/bekleme1.webp';
import bekleme2 from '@/assets/img/bekleme2.webp';
import oturma from '@/assets/img/oturma.webp';
import oturma2 from '@/assets/img/oturma2.webp';

export function OfficeSection() {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="py-20 minimalist-gradient">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-6xl mx-auto space-y-12"
        >
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-light text-stone-900 dark:text-stone-100 tracking-tight mb-4">
              {t('about.office')}
            </h2>
            <div className="w-12 h-0.5 bg-accent-terracotta mx-auto opacity-70" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <motion.div variants={itemVariants} className="relative aspect-square lg:aspect-[3/4] rounded-2xl overflow-hidden shadow-sm">
              <Image src={oturma} alt="Ofis Oturma Alanı" fill className="object-cover hover:scale-105 transition-transform duration-700" />
            </motion.div>
            <motion.div variants={itemVariants} className="relative aspect-square lg:aspect-[3/4] rounded-2xl overflow-hidden shadow-sm lg:mt-8">
              <Image src={bekleme1} alt="Ofis Bekleme Alanı" fill className="object-cover hover:scale-105 transition-transform duration-700" />
            </motion.div>
            <motion.div variants={itemVariants} className="relative aspect-square lg:aspect-[3/4] rounded-2xl overflow-hidden shadow-sm lg:mt-8">
              <Image src={bekleme2} alt="Ofis Bekleme Alanı" fill className="object-cover hover:scale-105 transition-transform duration-700" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
