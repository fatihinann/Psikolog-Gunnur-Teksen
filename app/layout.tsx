import type { Metadata } from 'next';
import './globals.css';

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
    <html lang="tr" suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  );
}
