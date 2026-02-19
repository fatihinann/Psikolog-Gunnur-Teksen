'use client';

import { useTranslation } from '@/lib/i18n';
import { Phone, Mail, MapPin, Instagram } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-stone-900 py-24 text-stone-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-16">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1 border-stone-800">
            <Link href="/" className="flex items-center space-x-3 mb-8 group">
              <div className="w-11 h-11 bg-primary-green rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-black/50">
                GT
              </div>
              <div className="font-display font-bold text-xl text-white tracking-tight">
                Günnur Tekşen
              </div>
            </Link>
            <p className="text-stone-400 text-sm leading-relaxed mb-8">
              {t('footer.desc')}
            </p>
            <div className="flex items-center space-x-4">
              <a href="https://www.instagram.com/gunnurteksenn/" target="_blank" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center text-stone-400 hover:bg-accent-terracotta hover:text-white transition-all duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="tel:+905356516747" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center text-stone-400 hover:bg-primary-green hover:text-white transition-all duration-300">
                <Phone className="w-5 h-5" />
              </a>
              <a href="mailto:pskgunnurteksen@gmail.com" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center text-stone-400 hover:bg-primary-green hover:text-white transition-all duration-300">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Nav Links */}
          <div className="col-span-1">
            <h3 className="font-display font-bold text-white text-lg mb-8 uppercase tracking-widest">{t('footer.links')}</h3>
            <div className="space-y-4">
              {['/hakkimda', '/hizmetler', '/blog', '/sss'].map((href, i) => (
                <Link key={i} href={href} className="block text-stone-400 hover:text-accent-terracotta transition-colors font-medium">
                  {t(`nav.${['about', 'services', 'blog', 'faq'][i]}`)}
                </Link>
              ))}
            </div>
          </div>

          {/* Services Quick Link */}
          <div className="col-span-1">
            <h3 className="font-display font-bold text-white text-lg mb-8 uppercase tracking-widest">{t('nav.services')}</h3>
            <div className="space-y-4">
              <Link href="/services" className="block text-stone-400 hover:text-primary-green transition-colors font-medium">Bireysel Danışmanlık</Link>
              <Link href="/services" className="block text-stone-400 hover:text-primary-green transition-colors font-medium">Çift Terapisi</Link>
              <Link href="/services" className="block text-stone-400 hover:text-primary-green transition-colors font-medium">Ergen Danışmanlığı</Link>
              <Link href="/services" className="block text-stone-400 hover:text-primary-green transition-colors font-medium">EMDR Terapisi</Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h3 className="font-display font-bold text-white text-lg mb-8 uppercase tracking-widest">{t('home.contact.title')}</h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4 group">
                <MapPin className="w-6 h-6 text-accent-terracotta mt-1 shrink-0" />
                <span className="text-sm text-stone-400 leading-relaxed group-hover:text-stone-300 transition-colors">
                  İstasyon, Yarımburgaz Cad., No:31., {t('common.floor')}: 11, {t('common.apartment')}: 90, Küçükçekmece/İstanbul
                </span>
              </div>
              <a href="tel:+905356516747" className="flex items-center space-x-4 group text-stone-400 hover:text-stone-300 transition-colors">
                <Phone className="w-6 h-6 text-primary- leaf shrink-0" />
                <span className="font-bold">+90 535 651 67 47</span>
              </a>
              <a href="mailto:pskgunnurteksen@gmail.com" className="flex items-center space-x-4 group text-stone-400 hover:text-stone-300 transition-colors">
                <Mail className="w-6 h-6 text-primary-leaf shrink-0" />
                <span className="font-medium text-sm">pskgunnurteksen@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center text-stone-500 text-xs gap-6">
          <p className="font-medium">&copy; 2026 Günnur Tekşen. {t('footer.rights')}</p>
          <p className="font-medium italic">
            {t('footer.dev')} <a href='https://fatihinan.vercel.app/' target='_blank' className="text-stone-400 hover:text-accent-terracotta transition-colors">Fatih İnan</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
