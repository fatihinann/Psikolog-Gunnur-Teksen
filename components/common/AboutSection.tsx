'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslation } from '@/lib/i18n';
import { GraduationCap, Award, Heart, Users, Calendar } from 'lucide-react';

export function AboutSection() {
  const { t } = useTranslation();
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
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-8xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('about.title')}
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              {t('about.desc')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className='space-y-4'>

              {/* Eğitim */}
              <motion.div variants={itemVariants}>
                <Card className="psychology-card">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <GraduationCap className="w-10 h-10 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('about.education')}</h3>
                        <ul className="text-gray-600 space-y-2">
                          <li>
                            <b>{t('education.1.name')}</b>
                            <p>{t('education.1.program')}</p>
                            <p>{t('education.1.date')} - {t('education.1.location')}</p>
                          </li>
                          <li>
                            <b>{t('education.2.name')}</b>
                            <p>{t('education.2.program')}</p>
                            <p>{t('education.2.date')} - {t('education.2.location')}</p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Deneyim */}
              <motion.div variants={itemVariants}>
                <Card className="psychology-card h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <Users className="w-10 h-10 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('about.experience')}</h3>
                        <ul className="text-gray-600 space-y-2">
                          <li>
                            <b>{t('experience.1.company')}</b>
                            <p>{t('experience.1.position')} ({t('experience.1.date')})</p>
                            <p>{t('experience.1.description')}</p>
                          </li>
                          <li>
                            <b>{t('experience.2.company')}</b>
                            <p>{t('experience.2.position')} ({t('experience.2.date')})</p>
                            <p>- {t('experience.2.description.1')}</p>
                            <p>- {t('experience.2.description.2')}</p>
                            <p>- {t('experience.2.description.3')}</p>
                          </li>
                          <li>
                            <b>{t('experience.3.company')}</b>
                            <p>{t('experience.3.position')} ({t('experience.3.date')})</p>
                            <p>- {t('experience.3.description.1')}</p>
                            <p>- {t('experience.3.description.2')}</p>
                            <p>- {t('experience.3.description.3')}</p>
                          </li>
                          <li>
                            <b>{t('experience.4.company')}</b>
                            <p>{t('experience.4.position')} ({t('experience.4.date')})</p>
                            <p>- {t('experience.4.description.1')}</p>
                            <p>- {t('experience.4.description.2')}</p>
                            <p>- {t('experience.4.description.3')}</p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Yaklaşım */}
              <motion.div variants={itemVariants}>
                <Card className="psychology-card h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <Heart className="w-10 h-10 text-red-500" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('about.approach')}</h3>
                        <p className="text-gray-600">
                          {t('about.approach.desc')}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

            </div>

            <div className='space-y-4'>

              {/* Sertifikalar */}
              <motion.div variants={itemVariants}>
                <Card className="psychology-card">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <Award className="w-10 h-10 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('about.certificates')}</h3>
                        <ul className="text-gray-600 space-y-2">
                          <li>
                            <p className='font-medium'>Dr. Görkem Gökçelioğlu</p>
                            <p>{t('certification.1.name')} ({t('certification.1.date')})</p>
                          </li>
                          <li>{t('certification.2.name')} (2024)</li>
                          <li>{t('certification.3.name')} (2024)</li>
                          <li>
                            <p className='font-medium'>{t('certification.4.issuer')}</p>
                            <p>{t('certification.4.name')} (2023)</p>
                          </li>
                          <li>
                            <p className='font-medium'>{t('certification.5.issuer')}</p>
                            <p>{t('certification.5.name')} (2023)</p>
                          </li>
                          <li>{t('certification.6.name')} (2023)</li>
                          <li>{t('certification.7.name')} (2022)</li>
                          <li>
                            <p className='font-medium'>{t('certification.8.issuer')}</p>
                            <p>{t('certification.8.name')} (2021)</p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              {/* Seminerler */}
              <motion.div variants={itemVariants}>
                <Card className="psychology-card h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <Calendar className="w-10 h-10 text-orange-500" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('seminars.title')}</h3>
                        <ul className="text-gray-600 space-y-4">
                          <li>
                            <p className="font-medium">{t('seminar.1.name')}</p>
                            <p className="text-sm">{t('seminar.1.date')} — {t('seminar.1.role')}</p>
                          </li>
                          <li>
                            <p className="font-medium">{t('seminar.2.name')}</p>
                            <p className="text-sm">{t('seminar.2.date')} — {t('seminar.2.type')}</p>
                          </li>
                          <li>
                            <p className="font-medium">{t('seminar.3.name')}</p>
                            <p className="text-sm">{t('seminar.3.date')} — {t('seminar.3.type')}</p>
                          </li>
                          <li>
                            <p className="font-medium">{t('seminar.4.name')}</p>
                            <p className="text-sm">{t('seminar.4.date')} — {t('seminar.4.type')}</p>
                          </li>
                          <li>
                            <p className="font-medium">{t('seminar.5.name')}</p>
                            <p className="text-sm">{t('seminar.5.organization')} — {t('seminar.5.date')} ({t('seminar.5.type')})</p>
                          </li>
                          <li>
                            <p className="font-medium">{t('seminar.6.name')}</p>
                            <p className="text-sm">{t('seminar.6.organization')} — {t('seminar.6.date')} ({t('seminar.6.duration')}, {t('seminar.6.type')})</p>
                          </li>
                          <li>
                            <p className="font-medium">{t('seminar.7.name')}</p>
                            <p className="text-sm">{t('seminar.7.organization')} — {t('seminar.7.date')} ({t('seminar.7.type')})</p>
                          </li>
                          <li>
                            <p className="font-medium">{t('seminar.8.name')}</p>
                            <p className="text-sm">{t('seminar.8.organization')} — {t('seminar.8.date')} ({t('seminar.8.type')})</p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

            </div>

          </div>

        </motion.div>
      </div>
    </section>
  );
}
