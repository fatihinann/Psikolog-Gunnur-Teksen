'use client';

import { useTranslation } from '@/lib/i18n';
import { Phone, Mail, MapPin, Instagram } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-dark-base dark:bg-dark-base py-24 text-stone-400">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-14 mb-16">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center space-x-3 mb-8 group">
              <div className="flex flex-col">
                <div className="text-xl font-serif font-semibold text-stone-100 tracking-tight leading-tight">
                  Günnur Tekşen
                </div>
                <div className="text-[10px] text-primary-sage/70 font-medium tracking-[0.2em] uppercase mt-0.5">
                  {t('common.job')}
                </div>
              </div>
            </Link>
            <p className="text-stone-500 text-sm leading-relaxed mb-8 font-light">
              {t('footer.desc')}
            </p>
            <div className="flex items-center space-x-3">
              <a
                href="https://www.instagram.com/gunnurteksenn/"
                target="_blank"
                className="w-10 h-10 rounded-full bg-dark-muted flex items-center justify-center text-stone-500 hover:bg-accent-terracotta hover:text-white transition-all duration-300"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="tel:+905356516747"
                className="w-10 h-10 rounded-full bg-dark-muted flex items-center justify-center text-stone-500 hover:bg-dark-forest hover:text-white transition-all duration-300"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href="mailto:pskgunnurteksen@gmail.com"
                className="w-10 h-10 rounded-full bg-dark-muted flex items-center justify-center text-stone-500 hover:bg-dark-forest hover:text-white transition-all duration-300"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Nav Links */}
          <div className="col-span-1">
            <h3 className="font-display font-bold text-stone-300 text-xs mb-7 uppercase tracking-[0.2em]">
              {t('footer.links')}
            </h3>
            <div className="space-y-4">
              {['/about', '/services', '/blog', '/faqs', '/contact'].map((href, i) => (
                <Link
                  key={i}
                  href={href}
                  className="block text-sm text-stone-500 hover:text-primary-sage transition-colors duration-300 font-light"
                >
                  {t(`nav.${['about', 'services', 'blog', 'faq', 'contact'][i]}`)}
                </Link>
              ))}
            </div>
          </div>

          {/* Services Quick Link */}
          <div className="col-span-1">
            <h3 className="font-display font-bold text-stone-300 text-xs mb-7 uppercase tracking-[0.2em]">
              {t('nav.services')}
            </h3>
            <div className="space-y-4 text-sm font-light">
              <Link href="/services" className="block text-stone-500 hover:text-primary-sage transition-colors duration-300">Uzun Süreli İlişki Sorunları</Link>
              <Link href="/services" className="block text-stone-500 hover:text-primary-sage transition-colors duration-300">Panik Bozukluklar</Link>
              <Link href="/services" className="block text-stone-500 hover:text-primary-sage transition-colors duration-300">Kişilik Bozuklukları</Link>
              <Link href="/services" className="block text-stone-500 hover:text-primary-sage transition-colors duration-300">Anksiyete ve Stres</Link>
              <Link href="/services" className="block text-stone-500 hover:text-primary-sage transition-colors duration-300">Ağlama ve Öfke Nöbetleri</Link>
              <Link href="/services" className="block text-stone-500 hover:text-primary-sage transition-colors duration-300">Somatizasyon</Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h3 className="font-display font-bold text-stone-300 text-xs mb-7 uppercase tracking-[0.2em]">
              {t('home.contact.title')}
            </h3>
            <div className="space-y-5">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-accent-terracotta mt-0.5 shrink-0" />
                <span className="text-sm text-stone-500 leading-relaxed font-light">
                  İstasyon, Yarımburgaz Cad., No:31., {t('common.floor')}: 11, {t('common.apartment')}: 90, Küçükçekmece/İstanbul
                </span>
              </div>
              <a href="tel:+905356516747" className="flex items-center space-x-3 text-stone-500 hover:text-stone-300 transition-colors duration-300">
                <Phone className="w-4 h-4 text-primary-sage shrink-0" />
                <span className="font-medium text-sm">+90 535 651 67 47</span>
              </a>
              <a href="mailto:pskgunnurteksen@gmail.com" className="flex items-center space-x-3 text-stone-500 hover:text-stone-300 transition-colors duration-300">
                <Mail className="w-4 h-4 text-primary-sage shrink-0" />
                <span className="font-light text-sm">pskgunnurteksen@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-dark-muted/60 flex flex-col md:flex-row justify-between items-center text-stone-600 text-xs gap-4">
          <p className="font-light">&copy; 2026 Günnur Tekşen. {t('footer.rights')}</p>
          <p className="font-light italic">
            {t('footer.dev')}{' '}
            <a href="https://fatihinan.vercel.app/" target="_blank" className="text-stone-500 hover:text-primary-sage transition-colors duration-300">
              Fatih İnan
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
