'use client';

import { motion } from 'framer-motion';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { useTranslation } from '@/lib/i18n';
import { GraduationCap, Award, Briefcase, Heart, Calendar } from 'lucide-react';
import Image from 'next/image';
import gunnurteksen from '@/assets/img/gunnurteksen.webp';
import { useEffect, useState } from 'react';
import loadEducationsAction, { Education } from '@/actions/education/loadEducations';
import loadExperiencesAction, { Experience } from '@/actions/experience/loadExperiences';
import loadCertificatesAction, { Certificate } from '@/actions/certificate/loadCertificates';
import loadSeminarsAction, { Seminar } from '@/actions/seminar/loadSeminars';


export default function AboutPage() {
  const { t, language } = useTranslation();

  const [educations, setEducations] = useState<Education[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [seminars, setSeminars] = useState<Seminar[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eduData, expData, certData, semData] = await Promise.all([
          loadEducationsAction(),
          loadExperiencesAction(),
          loadCertificatesAction(),
          loadSeminarsAction(),
        ]);
        setEducations(eduData);
        setExperiences(expData);
        setCertificates(certData);
        setSeminars(semData);
      } catch (error) {
        console.error('Error loading about data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter by currently selected language
  const filteredEducations = educations.filter(e => e.language === language);
  const filteredExperiences = experiences.filter(e => e.language === language);
  const filteredCertificates = certificates.filter(c => c.language === language);
  const filteredSeminars = seminars.filter(s => s.language === language);

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
    <div className="min-h-screen">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="minimalist-gradient py-20 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-sage/8 dark:bg-dark-forest/20 rounded-full blur-3xl -mr-24 -mt-24" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-terracotta/5 rounded-full blur-3xl -ml-16 -mb-16" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-5xl md:text-6xl font-serif font-light text-stone-900 dark:text-stone-100 mb-5 tracking-tight">
                {t('about.title')}
              </h1>
              <div className="w-16 h-0.5 bg-accent-terracotta mx-auto mb-8 opacity-70" />
              <p className="text-xl text-stone-500 dark:text-stone-400 font-light leading-relaxed">
                {t('about.desc')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* About Content */}
        <section className="py-20 bg-accent-sand/30 dark:bg-dark-surface">
          <div className="container mx-auto">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="max-w-6xl mx-auto space-y-8"
            >
              {/* Introduction with Image */}
              <motion.div variants={itemVariants}>
                <div className="minimalist-card p-8 md:p-10">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                    <div className="lg:col-span-1">
                      <div className="rounded-[50%] w-full max-w-[240px] mx-auto aspect-[3/4] shadow-xl shadow-primary-green/10 dark:shadow-black/40 border-4 border-white/50 dark:border-dark-muted/30 relative overflow-hidden">
                        <Image
                          src={gunnurteksen}
                          alt="Psk. Günnur Tekşen"
                          fill
                          className="object-cover"
                          priority
                        />
                      </div>
                    </div>
                    <div className="lg:col-span-2 space-y-4">
                      <h2 className="text-3xl font-serif font-light text-stone-900 dark:text-stone-100 tracking-tight">
                        {t('home.hero.title')}
                      </h2>
                      <p className="text-stone-600 dark:text-stone-400 leading-relaxed text-sm font-light">
                        {t('home.hero.subtitle.p1')}
                      </p>
                      <p className="text-stone-600 dark:text-stone-400 leading-relaxed text-sm font-light">
                        {t('home.hero.subtitle.p2')}
                      </p>
                      <p className="text-stone-600 dark:text-stone-400 leading-relaxed text-sm font-light">
                        {t('home.hero.subtitle.p3')}
                      </p>
                      <p className="text-stone-600 dark:text-stone-400 leading-relaxed text-sm font-light">
                        {t('home.hero.subtitle.p4')}
                      </p>
                    </div>
                  </div>
                </div>
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
                            {loading ? (
                              <li className="text-stone-400 text-sm">{t('common.loading')}</li>
                            ) : filteredEducations.length > 0 ? (
                              filteredEducations.map((edu) => (
                                <li key={edu.id} className="pl-5 border-l border-primary-sage/30 dark:border-primary-sage/20">
                                  <p className="font-semibold text-stone-800 dark:text-stone-200">{edu.name}</p>
                                  <p className="text-primary-sage dark:text-primary-sage/80 font-medium text-sm mt-0.5">{edu.program}</p>
                                  <p className="text-xs text-stone-400 dark:text-stone-500 mt-1">{edu.date} — {edu.location}</p>
                                </li>
                              ))
                            ) : (
                              <li className="text-stone-400 text-sm">—</li>
                            )}
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
                            {loading ? (
                              <li className="text-stone-400 text-sm">{t('common.loading')}</li>
                            ) : filteredExperiences.length > 0 ? (
                              filteredExperiences.map((exp) => (
                                <li key={exp.id} className="pl-5 border-l border-primary-green/20 dark:border-primary-sage/20">
                                  <p className="font-semibold text-stone-800 dark:text-stone-200">{exp.company}</p>
                                  <p className="text-primary-green dark:text-primary-sage text-sm font-medium mt-0.5">
                                    {exp.position} <span className="text-stone-400 font-normal">({exp.date})</span>
                                  </p>
                                  <div className="text-sm text-stone-500 dark:text-stone-400 mt-1.5 space-y-1 font-light">
                                    {exp.descriptionFirst && <p>— {exp.descriptionFirst}</p>}
                                    {exp.descriptionSecond && <p>— {exp.descriptionSecond}</p>}
                                    {exp.descriptionThird && <p>— {exp.descriptionThird}</p>}
                                  </div>
                                </li>
                              ))
                            ) : (
                              <li className="text-stone-400 text-sm">—</li>
                            )}
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
                            {loading ? (
                              <li className="text-stone-400 text-sm">{t('common.loading')}</li>
                            ) : filteredCertificates.length > 0 ? (
                              filteredCertificates.map((cert) => (
                                <li key={cert.id} className="flex items-start space-x-3">
                                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent-terracotta/50 flex-shrink-0" />
                                  <div>
                                    {cert.issuer && (
                                      <p className="font-semibold text-stone-700 dark:text-stone-300 text-sm">{cert.issuer}</p>
                                    )}
                                    <p className="text-sm text-stone-500 dark:text-stone-400 font-light">
                                      {cert.name} ({cert.date})
                                    </p>
                                  </div>
                                </li>
                              ))
                            ) : (
                              <li className="text-stone-400 text-sm">—</li>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Approach - stays static from i18n */}
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
                            {loading ? (
                              <p className="text-stone-400 text-sm">{t('common.loading')}</p>
                            ) : filteredSeminars.length > 0 ? (
                              filteredSeminars.map((sem) => (
                                <div key={sem.id} className="relative pl-5 border-l border-primary-sage/30 dark:border-primary-sage/20">
                                  <p className="font-semibold text-stone-800 dark:text-stone-200 text-sm leading-snug">{sem.name}</p>
                                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">{sem.date}</p>
                                </div>
                              ))
                            ) : (
                              <p className="text-stone-400 text-sm">—</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
