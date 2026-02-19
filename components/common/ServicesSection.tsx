'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/lib/i18n';
import { useEffect, useState } from 'react';
import loadServices from '@/actions/services/loadServices';
import type { Service } from '@/actions/services/loadServices';
import { ArrowRight, Brain, Heart, Users, Lightbulb } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export function ServicesSection() {
  const { t, language } = useTranslation();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadServicesData = async () => {
      try {
        const servicesData = await loadServices();
        setServices(servicesData);
      } catch (error) {
        console.error('Error loading services:', error);
      } finally {
        setLoading(false);
      }
    };
    loadServicesData();
  }, []);

  // Filter services by current language and active status
  const filteredServices = services.filter(service =>
    service.language === language && service.isActive
  );

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

  const getServiceIcon = (index: number) => {
    const icons = [Brain, Heart, Users, Lightbulb];
    const IconComponent = icons[index % icons.length];
    return IconComponent;
  };

  const getServiceColor = (index: number) => {
    const colors = ['text-blue-600', 'text-purple-600', 'text-green-600', 'text-orange-600'];
    return colors[index % colors.length];
  };

  if (loading) {
    return (
      <section className="py-20 psychology-gradient">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t('common.loading')}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-32 minimalist-gradient relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={"visible"}
        >
          <motion.div variants={itemVariants} className="text-center mb-24 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-stone-900 mb-6">
              {t('home.services.title')}
            </h2>
            <div className="w-20 h-1.5 bg-accent-terracotta mx-auto mb-8 rounded-full opacity-80" />
            <p className="text-xl text-stone-600 leading-relaxed font-medium">
              {t('services.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {filteredServices.map((service, index) => {
              const IconComponent = getServiceIcon(index);

              return (
                <motion.div key={service.id} variants={itemVariants}>
                  <div className="minimalist-card p-10 h-full flex flex-col items-center text-center group hover:-translate-y-2">
                    <div className="w-20 h-20 bg-primary-green/5 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-primary-green/10 transition-colors duration-500">
                      <IconComponent className="w-10 h-10 text-primary-green" />
                    </div>
                    <h3 className="text-2xl font-display font-bold text-stone-900 mb-4 tracking-tight">
                      {service.name}
                    </h3>
                    <p className="text-stone-600 leading-relaxed text-sm mb-auto">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div variants={itemVariants} className="text-center">
            <Button
              size="lg"
              className="bg-primary-green hover:bg-primary-green/90 text-white px-10 py-7 text-lg rounded-2xl shadow-xl shadow-primary-green/20 transition-all duration-300 hover:scale-105"
              asChild
            >
              <Link href="/services">
                {t('services.btn')}
                <ArrowRight className="w-5 h-5 ml-3" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
