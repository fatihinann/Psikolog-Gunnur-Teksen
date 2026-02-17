'use client';

import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { ContactSection } from '@/components/common/ContactSection';
import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/i18n';

export default function ContactPage() {
  const { t } = useTranslation();

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
                {t('home.contact.title')}
              </h1>
              <p className="text-xl text-gray-600">
                {t('contact.subtitle')}
              </p>
            </motion.div>
          </div>
        </section>

        <ContactSection />
        
        {/* Map Section */}
        <section className="py-16 psychology-gradient">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                {t('contact.office.location')}
              </h2>
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3009.3942849472!2d28.7845!3d41.0082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDAwJzI5LjUiTiAyOMKwNDcnMDQuMyJF!5e0!3m2!1str!2str!4v1620000000000!5m2!1str!2str"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ofis Konumu"
                />
              </div>
              <div className="text-center mt-6">
                <p className="text-gray-600">
                  {t('common.address')}
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
