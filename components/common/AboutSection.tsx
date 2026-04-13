'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTranslation } from '@/lib/i18n';
import { GraduationCap, Award, Heart, Users, Calendar, Briefcase } from 'lucide-react';
import { useEffect, useState } from 'react';
import loadCertificatesAction, { Certificate } from '@/actions/certificate/loadCertificates';
import loadEducationsAction, { Education } from '@/actions/education/loadEducations';
import loadExperiencesAction, { Experience } from '@/actions/experience/loadExperiences';
import loadSeminarsAction, { Seminar } from '@/actions/seminar/loadSeminars';

export function AboutSection() {
  const { t, language } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [data, setData] = useState<{
    certificates: Certificate[];
    educations: Education[];
    experiences: Experience[];
    seminars: Seminar[];
  }>({
    certificates: [],
    educations: [],
    experiences: [],
    seminars: [],
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [certs, edus, exps, sems] = await Promise.all([
          loadCertificatesAction(),
          loadEducationsAction(),
          loadExperiencesAction(),
          loadSeminarsAction(),
        ]);
        setData({
          certificates: certs as Certificate[],
          educations: edus as Education[],
          experiences: exps as Experience[],
          seminars: sems as Seminar[],
        });
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const certificates = data.certificates.filter(c => c.language === language);
  const educations = data.educations.filter(e => e.language === language);
  const experiences = data.experiences.filter(e => e.language === language);
  const seminars = data.seminars.filter(s => s.language === language);

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
          className="max-8xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-serif font-light text-stone-900 dark:text-stone-100 mb-6 tracking-tight">
              {t('about.title')}
            </h2>
            <div className="w-16 h-0.5 bg-accent-terracotta mx-auto opacity-70" />
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
                        {educations.map((item) => (
                          <li key={item.id} className="pl-5 border-l border-primary-sage/30 dark:border-primary-sage/20">
                            <p className="font-semibold text-stone-800 dark:text-stone-200">{item.name}</p>
                            <p className="text-primary-sage dark:text-primary-sage/80 font-medium text-sm mt-0.5">{item.program}</p>
                            <p className="text-xs text-stone-400 dark:text-stone-500 mt-1">{item.date} — {item.location}</p>
                          </li>
                        ))}
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
                        {experiences.map((item) => (
                          <li key={item.id} className="pl-5 border-l border-primary-green/20 dark:border-primary-sage/20">
                            <p className="font-semibold text-stone-800 dark:text-stone-200">{item.company}</p>
                            <p className="text-primary-green dark:text-primary-sage text-sm font-medium mt-0.5">{item.position} <span className="text-stone-400 font-normal">({item.date})</span></p>
                            <div className="text-sm text-stone-500 dark:text-stone-400 mt-1.5 space-y-1 font-light">
                              {item.descriptionFirst && <p>— {item.descriptionFirst}</p>}
                              {item.descriptionSecond && <p>— {item.descriptionSecond}</p>}
                              {item.descriptionThird && <p>— {item.descriptionThird}</p>}
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
                        {certificates.map((item) => (
                          <li key={item.id} className="flex items-start space-x-3">
                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent-terracotta/50 flex-shrink-0" />
                            <div>
                              {item.issuer && <p className="font-semibold text-stone-700 dark:text-stone-300 text-sm">{item.issuer}</p>}
                              <p className="text-sm text-stone-500 dark:text-stone-400 font-light">{item.name} ({item.date})</p>
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
                        {seminars.map((item) => (
                          <div key={item.id} className="relative pl-5 border-l border-primary-sage/30 dark:border-primary-sage/20">
                            <p className="font-semibold text-stone-800 dark:text-stone-200 text-sm leading-snug">{item.name}</p>
                            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">{item.date}</p>
                          </div>
                        ))}
                      </div>
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
