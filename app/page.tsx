'use client';

import { motion } from 'framer-motion';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { HeroSection } from '@/components/common/HeroSection';
import { AboutSection } from '@/components/common/AboutSection';
import { ServicesSection } from '@/components/common/ServicesSection';
import { BlogSection } from '@/components/common/BlogSection';
import { FAQSection } from '@/components/common/FAQSection';
import { ContactSection } from '@/components/common/ContactSection';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <BlogSection />
        <FAQSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
