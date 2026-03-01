'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/lib/i18n';
import { GraduationCap, Award, Heart, Users, Calendar, Briefcase } from 'lucide-react';
import Link from 'next/link';

export function AboutSection() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section ref={ref} className="py-24 bg-accent-sand/40 dark:bg-dark-surface relative overflow-hidden transition-colors duration-300">
      {/* Subtle background texture blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-96 bg-primary-sage/5 dark:bg-dark-forest/15 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-7xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-serif font-light text-stone-900 dark:text-stone-100 mb-6 tracking-tight">
              {t('about.title')}
            </h2>
            <div className="w-16 h-0.5 bg-accent-terracotta mx-auto mb-8 opacity-70" />
            <p className="text-xl text-stone-500 dark:text-stone-400 leading-relaxed font-light italic">
              &ldquo;{t('about.desc')}&rdquo;
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className='space-y-8'>
              {/* Eğitim */}
              <motion.div variants={itemVariants}>
                <div className="minimalist-card p-8">
                  <div className="flex items-start space-x-5">
                    <div className="flex-shrink-0 p-3.5 bg-primary-green/8 dark:bg-dark-forest/40 rounded-2xl border border-primary-green/10 dark:border-primary-sage/20 md:block hidden">
                      <GraduationCap className="w-7 h-7 text-primary-green dark:text-primary-sage" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-6">
                        <div className="flex-shrink-0 p-1.5 w-fit bg-primary-sage/8 dark:bg-dark-forest/40 rounded-2xl border border-primary-sage/15 dark:border-primary-sage/20 md:hidden block">
                          <GraduationCap className="w-6 h-6 text-primary-sage" />
                        </div>
                        <h3 className="text-2xl font-serif font-semibold text-stone-900 dark:text-stone-100">
                          {t('about.education')}
                        </h3>
                      </div>
                      <ul className="space-y-5">
                        <li className="pl-5 border-l border-primary-sage/30 dark:border-primary-sage/20">
                          <p className="font-semibold text-stone-800 dark:text-stone-200">{t('education.1.name')}</p>
                          <p className="text-primary-sage dark:text-primary-sage/80 font-medium text-sm mt-0.5">{t('education.1.program')}</p>
                          <p className="text-xs text-stone-400 dark:text-stone-500 mt-1">{t('education.1.date')} — {t('education.1.location')}</p>
                        </li>
                        <li className="pl-5 border-l border-primary-sage/30 dark:border-primary-sage/20">
                          <p className="font-semibold text-stone-800 dark:text-stone-200">{t('education.2.name')}</p>
                          <p className="text-primary-sage dark:text-primary-sage/80 font-medium text-sm mt-0.5">{t('education.2.program')}</p>
                          <p className="text-xs text-stone-400 dark:text-stone-500 mt-1">{t('education.2.date')} — {t('education.2.location')}</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Deneyim */}
              <motion.div variants={itemVariants}>
                <div className="minimalist-card p-8">
                  <div className="flex items-start space-x-5">
                    <div className="flex-shrink-0 p-3.5 bg-primary-sage/8 dark:bg-dark-forest/40 rounded-2xl border border-primary-sage/15 dark:border-primary-sage/20 md:block hidden">
                      <Briefcase className="w-7 h-7 text-primary-sage" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-6">
                        <div className="flex-shrink-0 p-1.5 w-fit bg-primary-sage/8 dark:bg-dark-forest/40 rounded-2xl border border-primary-sage/15 dark:border-primary-sage/20 md:hidden block">
                          <Briefcase className="w-6 h-6 text-primary-sage" />
                        </div>
                        <h3 className="text-2xl font-serif font-semibold text-stone-900 dark:text-stone-100">
                          {t('about.experience')}
                        </h3>
                      </div>
                      <ul className="space-y-6">
                        <li className="pl-5 border-l border-primary-green/20 dark:border-primary-sage/20">
                          <p className="font-semibold text-stone-800 dark:text-stone-200">{t('experience.1.company')}</p>
                          <p className="text-primary-green dark:text-primary-sage text-sm font-medium mt-0.5">{t('experience.1.position')} <span className="text-stone-400 font-normal">({t('experience.1.date')})</span></p>
                          <p className="text-sm text-stone-500 dark:text-stone-400 mt-1.5 font-light">— {t('experience.1.description')}</p>
                        </li>
                        {[2, 3, 4].map((i) => (
                          <li key={i} className="pl-5 border-l border-primary-green/20 dark:border-primary-sage/20">
                            <p className="font-semibold text-stone-800 dark:text-stone-200">{t(`experience.${i}.company`)}</p>
                            <p className="text-primary-green dark:text-primary-sage text-sm font-medium mt-0.5">{t(`experience.${i}.position`)} <span className="text-stone-400 font-normal">({t(`experience.${i}.date`)})</span></p>
                            <div className="text-sm text-stone-500 dark:text-stone-400 mt-1.5 space-y-1 font-light">
                              <p>— {t(`experience.${i}.description.1`)}</p>
                              <p>— {t(`experience.${i}.description.2`)}</p>
                              <p>— {t(`experience.${i}.description.3`)}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>


            </div>
            <div className='space-y-8'>

              {/* Certifications */}
              <motion.div variants={itemVariants}>
                <div className="minimalist-card p-8">
                  <div className="flex items-start space-x-5">
                    <div className="flex-shrink-0 p-3.5 bg-accent-terracotta/8 dark:bg-accent-terracotta/15 rounded-2xl border border-accent-terracotta/15 dark:border-accent-terracotta/20 md:block hidden">
                      <Award className="w-7 h-7 text-accent-terracotta" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-6">
                        <div className="flex-shrink-0 p-1.5 w-fit bg-primary-sage/8 dark:bg-dark-forest/40 rounded-2xl border border-primary-sage/15 dark:border-primary-sage/20 md:hidden block">
                          <Award className="w-6 h-6 text-accent-terracotta" />
                        </div>
                        <h3 className="text-2xl font-serif font-semibold text-stone-900 dark:text-stone-100">
                          {t('about.certificates')}
                        </h3>
                      </div>
                      <ul className="grid grid-cols-1 gap-3">
                        <li className="flex items-start space-x-3">
                          <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent-terracotta/50 flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-stone-700 dark:text-stone-300 text-sm">Dr. Görkem Gökçelioğlu</p>
                            <p className="text-sm text-stone-500 dark:text-stone-400 font-light">{t('certification.1.name')} ({t('certification.1.date')})</p>
                          </div>
                        </li>
                        {[2, 3].map((i) => (
                          <li key={i} className="flex items-start space-x-3">
                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent-terracotta/50 flex-shrink-0" />
                            <p className="text-sm text-stone-500 dark:text-stone-400 font-light">{t(`certification.${i}.name`)} (2024)</p>
                          </li>
                        ))}
                        {[
                          { i: 4, issuer: true }, { i: 5, issuer: true },
                          { i: 6, issuer: false }, { i: 7, issuer: false }, { i: 8, issuer: true }
                        ].map(({ i, issuer }) => (
                          <li key={i} className="flex items-start space-x-3">
                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent-terracotta/50 flex-shrink-0" />
                            <div>
                              {issuer && <p className="font-semibold text-stone-700 dark:text-stone-300 text-sm">{t(`certification.${i}.issuer`)}</p>}
                              <p className="text-sm text-stone-500 dark:text-stone-400 font-light">{t(`certification.${i}.name`)} ({i >= 6 ? (i === 7 ? '2022' : i === 8 ? '2021' : '2023') : '2023'})</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
              {/* Seminerler */}
              <motion.div variants={itemVariants}>
                <div className="minimalist-card p-8 h-full">
                  <div className="flex items-start space-x-5">
                    <div className="flex-shrink-0 p-3.5 bg-accent-terracotta/8 dark:bg-accent-terracotta/15 rounded-2xl border border-accent-terracotta/15 dark:border-accent-terracotta/20 md:block hidden">
                      <Calendar className="w-7 h-7 text-accent-terracotta" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-6">
                        <div className="flex-shrink-0 p-1.5 w-fit bg-primary-sage/8 dark:bg-dark-forest/40 rounded-2xl border border-primary-sage/15 dark:border-primary-sage/20 md:hidden block">
                          <Calendar className="w-6 h-6 text-accent-terracotta" />
                        </div>
                        <h3 className="text-2xl font-serif font-semibold text-stone-900 dark:text-stone-100">
                          {t('seminars.title')}
                        </h3>
                      </div>
                      <div className="grid grid-cols-1 gap-4">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                          <div key={i} className="relative pl-5 border-l border-primary-sage/30 dark:border-primary-sage/20">
                            <p className="font-semibold text-stone-800 dark:text-stone-200 text-sm leading-snug">{t(`seminar.${i}.name`)}</p>
                            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">{t(`seminar.${i}.date`)}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Approach */}
              <motion.div variants={itemVariants}>
                <div className="minimalist-card p-8 bg-primary-green dark:bg-dark-forest border-primary-green dark:border-dark-forest">
                  <div className="flex items-start space-x-5">
                    <div className="flex-shrink-0 p-3.5 bg-white/10 rounded-2xl md:block hidden">
                      <Heart className="w-7 h-7 text-accent-terracotta" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-6">
                        <div className="flex-shrink-0 p-1.5 w-fit bg-primary-sage/8 dark:bg-dark-forest/40 rounded-2xl border border-primary-sage/15 dark:border-primary-sage/20 md:hidden block">
                          <Heart className="w-6 h-6 text-accent-terracotta" />
                        </div>
                        <h3 className="text-2xl font-serif font-semibold text-stone-900 dark:text-stone-100">
                          {t('about.approach')}
                        </h3>
                      </div>
                      <p className=" leading-relaxed mb-3 text-sm font-light italic">
                        {t('about.approach.desc.1')}
                      </p>
                      <p className="leading-relaxed text-sm font-light italic">
                        {t('about.approach.desc.2')}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div >
      </div >
    </section >
  );
}
