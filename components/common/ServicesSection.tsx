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
    <section className="py-20 psychology-gradient">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={"visible"}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('home.services.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('services.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {filteredServices.map((service, index) => {
              const IconComponent = getServiceIcon(index);
              const colorClass = getServiceColor(index);
              
              return (
                <motion.div key={service.id} variants={itemVariants}>
                  <Card className="psychology-card h-full group hover:scale-105 transition-all duration-300">
                    <CardContent className="p-8">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <IconComponent className={`w-12 h-12 ${colorClass}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 mb-3">
                            {service.name}
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
            
          </div>

          <motion.div variants={itemVariants} className="text-center">
            <Button size="lg" variant="outline" asChild>
              <Link href="/services">
                {t('services.btn')}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
