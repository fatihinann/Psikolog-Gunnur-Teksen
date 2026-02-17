'use client';

import { motion } from 'framer-motion';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/lib/i18n';
import { GraduationCap, Award, Briefcase, Heart, Phone } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import gunnurteksen from '@/assets/img/gunnurteksen.webp'

export default function AboutPage() {
  const { t } = useTranslation();

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
    <div className="min-h-screen">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="psychology-gradient py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {t('about.title')}
              </h1>
              <p className="text-xl text-gray-600">
                {t('about.desc')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* About Content */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="max-w-4xl mx-auto"
            >
              {/* Introduction */}
              <motion.div variants={itemVariants} className="mb-16">
                <Card className="psychology-card">
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                      <div className="lg:col-span-1">
                        <div className="aspect-[3/2] bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl flex items-center justify-center">
                          <div className="text-center text-gray-600">
                            <div className="">
                              <Image src={gunnurteksen} alt="Psk. Günnur Tekşen" className='mx-auto mb-4 w-100 rounded-3xl' />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="lg:col-span-2">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                          {t('home.hero.title')}
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                          {t('home.hero.subtitle.p1')}
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                          {t('home.hero.subtitle.p2')}
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                          {t('home.hero.subtitle.p3')}
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                          {t('home.hero.subtitle.p4')}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Education */}
              <motion.div variants={itemVariants} className="mb-12">
                <Card className="psychology-card">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-6">
                      <div className="flex-shrink-0 w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
                        <GraduationCap className="w-8 h-8 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {t('about.education')}
                        </h3>
                        <div>
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
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Experience */}
              <motion.div variants={itemVariants} className="mb-12">
                <Card className="psychology-card">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-6">
                      <div className="flex-shrink-0 w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center">
                        <Briefcase className="w-8 h-8 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                          {t('about.experience')}
                        </h3>
                        <div>
                          <ul className="text-gray-600 space-y-2">
                            <li>
                              <b>{t('experience.1.company')}</b>
                              <p>{t('experience.1.position')} ({t('experience.1.date')})</p>
                              <p>- {t('experience.1.description')}</p>
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
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Certifications */}
              <motion.div variants={itemVariants} className="mb-12">
                <Card className="psychology-card">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-6">
                      <div className="flex-shrink-0 w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center">
                        <Award className="w-8 h-8 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                          {t('about.certificates')}
                        </h3>
                        <div>
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
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Approach */}
              <motion.div variants={itemVariants} className="mb-12">
                <Card className="psychology-card">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-6">
                      <div className="flex-shrink-0 w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center">
                        <Heart className="w-8 h-8 text-red-500" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                          {t('about.approach')}
                        </h3>
                        <p className="text-gray-600 leading-relaxed mb-4">
                          {t('about.approach.desc.1')}
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                          {t('about.approach.desc.2')}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Call to Action */}
              <motion.div variants={itemVariants} className="text-center">
                <Card className="psychology-card">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      {t('about.cta.title')}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {t('about.cta.desc')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button size="lg" asChild>
                        <Link href="/iletisim">
                          {t('common.appointment')}
                        </Link>
                      </Button>
                      <Button variant="outline" size="lg" asChild>
                        <a href="tel:+905356516747">
                          <Phone className="w-5 h-5 mr-2" />
                          {t('common.call')}
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
