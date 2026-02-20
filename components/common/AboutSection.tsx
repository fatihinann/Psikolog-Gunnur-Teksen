'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/lib/i18n';
import { GraduationCap, Award, Heart, Users, Calendar } from 'lucide-react';
import Link from 'next/link';

export function AboutSection() {
  const { t, tm } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section ref={ref} className="py-32 bg-accent-bone/50 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-7xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-24 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-stone-900 mb-6">
              {t('about.title')}
            </h2>
            <div className="w-20 h-1.5 bg-accent-terracotta mx-auto mb-8 rounded-full opacity-80" />
            <p className="text-xl text-stone-600 leading-relaxed font-medium italic">
              "{t('about.desc')}"
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className='space-y-10'>
              {/* Eğitim */}
              <motion.div variants={itemVariants}>
                <div className="minimalist-card p-8">
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0 p-3 bg-primary-green/5 rounded-2xl">
                      <GraduationCap className="w-8 h-8 text-primary-green" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-display font-semibold text-stone-900 mb-6">{t('about.education')}</h3>
                      <div className="space-y-6">
                        <div className="relative pl-6 border-l-2 border-primary-leaf/20">
                          <p className='font-bold text-stone-900'>{t('education.1.name')}</p>
                          <p className="text-primary-leaf font-medium">{t('education.1.program')}</p>
                          <p className="text-sm text-stone-500 mt-1">{t('education.1.date')} — {t('education.1.location')}</p>
                        </div>
                        <div className="relative pl-6 border-l-2 border-primary-leaf/20">
                          <p className='font-bold text-stone-900'>{t('education.2.name')}</p>
                          <p className="text-primary-leaf font-medium">{t('education.2.program')}</p>
                          <p className="text-sm text-stone-500 mt-1">{t('education.2.date')} — {t('education.2.location')}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Deneyim */}
              <motion.div variants={itemVariants}>
                <div className="minimalist-card p-8">
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0 p-3 bg-primary-leaf/5 rounded-2xl">
                      <Users className="w-8 h-8 text-primary-leaf" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-display font-semibold text-stone-900 mb-6">{t('about.experience')}</h3>
                      <div className="space-y-8">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="relative pl-6 border-l-2 border-primary-green/20">
                            <p className='font-bold text-stone-900'>{t(`experience.${i}.company`)}</p>
                            <p className="text-primary-green text-sm font-semibold">{t(`experience.${i}.position`)} ({t(`experience.${i}.date`)})</p>
                            <div className="text-sm text-stone-600 mt-2 leading-relaxed space-y-2">
                              {tm(`experience.${i}.description`).map((desc, idx) => (
                                <p key={idx}>{desc}</p>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className='space-y-10'>
              {/* Sertifikalar */}
              <motion.div variants={itemVariants}>
                <div className="minimalist-card p-8">
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0 p-3 bg-accent-terracotta/5 rounded-2xl">
                      <Award className="w-8 h-8 text-accent-terracotta" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-display font-semibold text-stone-900 mb-6">{t('about.certificates')}</h3>
                      <div className="grid grid-cols-1 gap-4">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                          <div key={i} className="flex items-center space-x-3 group">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent-terracotta/40 group-hover:scale-150 transition-transform" />
                            <p className="text-sm text-stone-700">{t(`certification.${i}.name`)}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Yaklaşım & Seminerler */}
              <motion.div variants={itemVariants}>
                <div className="minimalist-card p-8 bg-primary-green text-white">
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0 p-3 bg-accent-terracotta/5 rounded-2xl">
                      <Heart className="w-8 h-8 text-accent-terracotta" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-display font-semibold text-stone-900 mb-4">{t('about.approach')}</h3>
                      <div className="text-stone-700 leading-relaxed mb-6 italic space-y-4">
                        {tm('about.approach.desc').map((desc, idx) => (
                          <p className='text-sm' key={idx}>{desc}</p>
                        ))}
                      </div>
                      <Button variant="outline" className="border-white/20 text-stone-900 hover:bg-white/10 rounded-xl" asChild>
                        <Link href="/contact">{t('common.appointment')}</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
