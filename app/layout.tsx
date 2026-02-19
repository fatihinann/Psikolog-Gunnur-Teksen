import type { Metadata } from 'next';
import { Inter, Sora } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const sora = Sora({ subsets: ['latin'], variable: '--font-sora' });

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" suppressHydrationWarning className={`${inter.variable} ${sora.variable}`}>
      <body className="antialiased font-sans bg-accent-bone text-foreground">{children}</body>
    </html>
  );
}
