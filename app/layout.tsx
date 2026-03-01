import type { Metadata } from 'next';
import { Inter, Sora, Cormorant_Garamond } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Uzm. Klinik Psikolog Günnur Tekşen',
  description: 'Klinik psikoloji alanında uzman, yetişkinler için bireysel terapi ve psikolojik destek hizmetleri.',
  keywords: 'psikolog, klinik psikolog, terapi, şema terapi, anksiyete, depresyon, İstanbul',
  openGraph: {
    title: 'Uzm. Klinik Psikolog Günnur Tekşen',
    description: 'Klinik psikoloji alanında uzman, yetişkinler için bireysel terapi ve psikolojik destek hizmetleri.',
    type: 'website',
    locale: 'tr_TR',
  },
};

import { ThemeProvider } from '@/components/theme-provider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" suppressHydrationWarning className={`${inter.variable} ${sora.variable} ${cormorant.variable}`}>
      <body className="antialiased font-sans bg-accent-bone dark:bg-dark-base text-foreground transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
