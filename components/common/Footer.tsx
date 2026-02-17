'use client';

import { useTranslation } from '@/lib/i18n';
import { Phone, Mail, MapPin, Instagram } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                GT
              </div>
              <div>
                <div className="font-semibold">Günnur Tekşen</div>
                <div className="text-sm text-gray-400">{t('common.job')}</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              {t('footer.desc')}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">{t('footer.links')}</h3>
            <div className="space-y-2">
              <Link href="/hakkimda" className="block text-gray-400 hover:text-white transition-colors">
                {t('nav.about')}
              </Link>
              <Link href="/hizmetler" className="block text-gray-400 hover:text-white transition-colors">
                {t('nav.services')}
              </Link>
              <Link href="/blog" className="block text-gray-400 hover:text-white transition-colors">
                {t('nav.blog')}
              </Link>
              <Link href="/sss" className="block text-gray-400 hover:text-white transition-colors">
                {t('nav.faq')}
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold">{t('home.contact.title')}</h3>
            <div className="space-y-3">
              <a 
                href="tel:+905356516747" 
                className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span>+90 535 651 67 47</span>
              </a>
              <a 
                href="mailto:pskgunnurteksen@gmail.com" 
                className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span>pskgunnurteksen@gmail.com</span>
              </a>
              <div className="flex items-start space-x-3 text-gray-400">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                <span className="text-sm">
                  İstasyon, Yarımburgaz Cad., No:31., {t('common.floor')}: 11, {t('common.apartment')}: 90, Küçükçekmece/İstanbul
                </span>
              </div>
              <a 
                href="https://www.instagram.com/gunnurteksenn/" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
                <span>@gunnurteksenn</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>&copy; 2024 Günnur Tekşen. {t('footer.rights')} | {t('footer.dev')} <a href='https://fatihinan.vercel.app/' target='_blank'>Fatih İnan</a></p>
        </div>
      </div>
    </footer>
  );
}
