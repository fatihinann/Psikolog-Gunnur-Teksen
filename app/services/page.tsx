'use client';

import { motion } from 'framer-motion';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/lib/i18n';
import { useEffect, useState } from 'react';
import loadServices from '@/actions/services/loadServices';
import type { Service } from '@/actions/services/loadServices';
import { Brain, Heart, Users, Lightbulb, Phone } from 'lucide-react';
import Link from 'next/link';

export default function ServicesPage() {
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

  const activeServices = services.filter(service =>
    service.language === language && service.isActive
  );

  const getServiceIcon = (index: number) => {
    const icons = [Brain, Heart, Users, Lightbulb];
    const IconComponent = icons[index % icons.length];
    return IconComponent;
  };

  const getServiceColor = (index: number) => {
    const colors = [
      { icon: 'text-blue-600', bg: 'bg-blue-100' },
      { icon: 'text-purple-600', bg: 'bg-purple-100' },
      { icon: 'text-green-600', bg: 'bg-green-100' },
      { icon: 'text-orange-600', bg: 'bg-orange-100' }
    ];
    return colors[index % colors.length];
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
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
                {t('services.title')}
              </h1>
              <p className="text-xl tet-gray-600">
                {t('services.subtitle')}
              </p>
            </motion.div>
          </div>x
        </section>

        {/* Services */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">{t('common.loading')}</p>
              </div>
            ) : activeServices.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">Hizmet bilgisi bulunmuyor.</p>
              </div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-4xl mx-auto"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  {activeServices.map((service, index) => {
                    const IconComponent = getServiceIcon(index);
                    const colors = getServiceColor(index);

                    return (
                      <motion.div key={service.id} variants={itemVariants}>
                        <Card className="psychology-card h-full group hover:scale-105 transition-all duration-300">
                          <CardContent className="p-8">
                            <div className="flex items-start space-x-6">
                              <div className={`flex-shrink-0 w-16 h-16 ${colors.bg} rounded-xl flex items-center justify-center`}>
                                <IconComponent className={`w-8 h-8 ${colors.icon}`} />
                              </div>
                              <div className="flex-1">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">
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

                {/* Specialty Focus */}
                <motion.div variants={itemVariants} className="text-center mb-12">
                  <Card className="psychology-card">
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                        {t('common.expertise')}
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {[
                          t('common.expertise-1'),
                          t('common.expertise-2'),
                          t('common.expertise-3'),
                          t('common.expertise-4'),
                          t('common.expertise-5'),
                          t('common.expertise-6'),
                        ].map((specialty) => (
                          <Badge
                            key={specialty}
                            variant="outline"
                            className="py-2 px-4 text-sm border-blue-200 text-blue-700"
                          >
                            {specialty}
                          </Badge>
                        ))}
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
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
