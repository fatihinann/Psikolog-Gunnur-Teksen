'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/lib/i18n';
import { Menu, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';

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
    <header className="fixed top-0 left-0 right-0 z-50 bg-accent-bone/85 dark:bg-dark-base/90 backdrop-blur-xl border-b border-stone-200/30 dark:border-dark-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="flex flex-col">
              <div className="text-xl font-serif font-semibold text-primary-green dark:text-stone-100 tracking-tight leading-tight">
                Günnur Tekşen
              </div>
              <div className="text-[10px] text-primary-sage/70 font-medium tracking-[0.2em] uppercase">
                {t('common.job')}
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-9">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-stone-600 dark:text-stone-400 hover:text-primary-green dark:hover:text-stone-200 transition-colors duration-300 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent-terracotta transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Controls */}
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => changeLanguage(language === 'tr' ? 'en' : 'tr')}
              className="hidden md:flex items-center space-x-2 text-stone-500 dark:text-stone-500 hover:text-primary-green dark:hover:text-primary-sage hover:bg-stone-100/50 dark:hover:bg-dark-muted/50 rounded-full px-3 py-1.5"
            >
              <Globe className="w-4 h-4" />
              <span className="text-xs font-semibold">{language.toUpperCase()}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-stone-600 dark:text-stone-400 hover:bg-stone-100/50 dark:hover:bg-dark-muted/50"
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
              transition={{ duration: 0.25 }}
              className="md:hidden border-t border-stone-100 dark:border-dark-muted/40 py-5"
            >
              <nav className="flex flex-col space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-stone-600 dark:text-stone-400 hover:text-primary-green dark:hover:text-primary-sage transition-colors duration-200 py-1.5 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => changeLanguage(language === 'tr' ? 'en' : 'tr')}
                  className="flex items-center space-x-2 self-start border-stone-200 dark:border-dark-muted text-stone-600 dark:text-stone-400 rounded-full"
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
