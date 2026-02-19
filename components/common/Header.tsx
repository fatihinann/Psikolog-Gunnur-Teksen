'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/lib/i18n';
import { Menu, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export function Header() {
  const { t, language, changeLanguage } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.about'), href: '/about' },
    { name: t('nav.services'), href: '/services' },
    { name: t('nav.blog'), href: '/blog' },
    { name: t('nav.faq'), href: '/faqs' },
    { name: t('nav.contact'), href: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-accent-bone/80 backdrop-blur-xl border-b border-stone-200/40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 bg-primary-green rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-primary-green/20 group-hover:scale-105 transition-transform duration-300">
              GT
            </div>
            <div className="hidden md:block">
              <div className="text-base font-display font-semibold text-primary-green tracking-tight">Günnur Tekşen</div>
              <div className="text-xs text-primary-leaf/80 font-medium tracking-wide uppercase">{t('common.job')}</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-stone-600 hover:text-primary-green transition-colors duration-300 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-terracotta transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Language Switcher & Mobile Menu */}
          <div className="flex items-center space-x-5">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => changeLanguage(language === 'tr' ? 'en' : 'tr')}
              className="hidden md:flex items-center space-x-2 text-stone-600 hover:text-primary-green hover:bg-stone-100/50 rounded-full px-4"
            >
              <Globe className="w-4 h-4" />
              <span className="text-xs font-bold">{language.toUpperCase()}</span>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-gray-100 py-4"
            >
              <nav className="flex flex-col space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 hover:text-blue-600 transition-colors duration-200 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => changeLanguage(language === 'tr' ? 'en' : 'tr')}
                  className="flex items-center space-x-1 self-start"
                >
                  <Globe className="w-4 h-4" />
                  <span>{language.toUpperCase()}</span>
                </Button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
