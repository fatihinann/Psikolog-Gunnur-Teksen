import { useEffect, useState } from 'react';

export type Language = 'tr' | 'en';

interface Translations {
  tr: Record<string, string>;
  en: Record<string, string>;
}

const translations: Translations = {
  tr: {
    // Navigation
    'nav.home': 'Anasayfa',
    'nav.about': 'Hakkımda',
    'nav.services': 'Hizmetler',
    'nav.blog': 'Blog',
    'nav.contact': 'İletişim',
    'nav.faq': 'SSS',

    // Home Page
    'home.hero.title': 'Merhaba, ben Klinik Psikolog Günnur Tekşen',
    'home.hero.desc': 'Klinik Psikolog',
    'home.hero.subtitle.p1': 'Özyeğin Üniversitesi Psikoloji Bölümü’nden mezun olduktan sonra, T.C. Rumeli Üniversitesi Klinik Psikoloji Enstitüsü bünyesinde Tezli Klinik Psikoloji yüksek lisansımı tamamladım.',
    'home.hero.subtitle.p2': 'Eğitimim ve mesleki çalışmalarım boyunca, özellikle üniversite öğrencileri ve yetişkinlerle çalıştım. Çalışmalarımda ağırlıklı olarak Şema Terapi ekolü temel almakla beraber psikodinamik ekol üzerine de eğitimimi sürdürmekteyim.',
    'home.hero.subtitle.p3': 'Şu anda  serbest çalışıyorum, çevremden gelen yönlendirmeler üzerinden danışan kabul etmekteyim',
    'home.hero.subtitle.p4': 'Danışanlarımla çalışmalarımda, güvenli ve yargısız bir terapi ortamı sunarak, onların kişisel gelişim, ruhsal denge ve yaşam kalitelerini artırmayı amaçlıyorum.',
    'home.hero.contact': 'You can contact me from the contact section to get more information about me or to make an appointment.',
    'home.about.title': 'Hakkımda',
    'home.about.desc': 'Klinik psikoloji alanında uzmanlaşmış, yetişkinlerle bireysel terapi konusunda deneyimli bir psikologum.',
    'home.services.title': 'Hizmetlerim',
    'home.blog.title': 'Son Yazılar',
    'home.blog.readMore': 'Devamını Oku',
    'home.faq.title': 'Sık Sorulan Sorular',
    'home.contact.title': 'İletişim',

    // Contact
    'contact.form.name': 'Ad Soyad',
    'contact.form.email': 'E-posta',
    'contact.form.phone': 'Telefon',
    'contact.form.message': 'Mesajınız',
    'contact.form.submit': 'Mesaj Gönder',
    'contact.form.sending': 'Gönderiliyor...',
    'contact.subtitle': 'Benimle iletişime geçin, sorularınızı yanıtlayalım ve ilk adımı birlikte atalım.',
    'contact.phone': 'Telefon',
    'contact.email': 'E-posta',
    'contact.address': 'Adres',
    'contact.office': 'Ofis Adresi',
    'contact.office.location': 'Ofis Konumu',

    // Common
    'common.loading': 'Yükleniyor...',
    'common.readMore': 'Devamını Oku',
    'common.close': 'Kapat',
    'common.send': 'Gönder',
    'common.success': 'Başarıyla gönderildi!',
    'common.error': 'Bir hata oluştu. Lütfen tekrar deneyin.',
    'common.hello': 'Merhaba',
    'common.hour': 'saat',
    'common.readingTime': 'okuma süresi',
    'common.minute': 'dakika',
    'common.job': 'Klinik Psikolog',
    'common.floor': 'Kat',
    'common.apartment': 'Daire',
    'common.appointment': 'Randevu Al',
    'common.call': 'Şimdi Ara',
    'common.expertise': 'Uzmanlık Alanlarım',
    'common.expertise-1': 'Uzun Süreli İlişki Sorunları',
    'common.expertise-2': 'Panik Bozukluklar',
    'common.expertise-3': 'Kişilik Bozuklukları',
    'common.expertise-4': 'Anksiyete ve Stres',
    'common.expertise-5': 'Ağlama ve Öfke Nöbetleri',
    'common.expertise-6': 'Somatizasyon',
    'common.address': 'İstasyon, Yarımburgaz Cad. No:31. Kat 11, Daire: 90 Küçükçekmece/İstanbul, 34303',
    // About
    'about.title': 'Hakkımda',
    'about.desc': 'Klinik psikoloji alanında uzmanlaşmış, yetişkinlerle bireysel terapi konusunda deneyimli bir psikologum.',
    'about.education': 'Eğitim',
    'about.certificates': 'Sertifikalar & (Eğitimler)',
    'about.experience': 'Deneyim',
    'about.approach': 'Yaklaşımım',
    'about.approach.desc.1': 'Terapi sürecinde, her bireyin benzersiz deneyimlerine saygı göstererek, şefkatli ve yargılamadan uzak bir ortam yaratmaya odaklanırım. Danışan gizliliği ve etik ilkelere sıkı sıkıya bağlı kalarak çalışırım.',
    'about.approach.desc.2': 'Özellikle Şema Terapi yaklaşımını temel alarak, uzun süreli örüntülerin anlaşılması ve değişimi konusunda uzmanlaşmış durumdayım. Bu yaklaşım, kişilik bozuklukları ve kronik psikolojik sorunlar için özellikle etkili sonuçlar vermektedir.',
    'about.cta.title': 'Benimle çalışmaya başlamak ister misiniz?',
    'about.cta.desc': 'İlk adımı atmak bazen zor olabilir, ancak bu yolculukta yanınızda olacağım.',

    // Education
    'education.title': 'Eğitim',
    'education.1.name': 'T.C. İstanbul Rumeli Üniversitesi',
    'education.1.program': 'Klinik Psikoloji Ana Bilim Dalı- Klinik Psikoloji Tezli Yüksek Lisans Programı',
    'education.1.date': '2022-2024',
    'education.1.location': 'İstanbul, Türkiye',
    'education.2.name': 'Özyeğin Üniversitesi',
    'education.2.program': 'Sosyal Bilimler Fakültesi- Psikoloji Bölümü',
    'education.2.date': '2015-2020',
    'education.2.location': 'İstanbul, Türkiye',

    // Experience
    'experience.title': 'Deneyim',
    'experience.1.company': 'Bİ\'ŞEY SEANS PSİKOLOJİK DANIŞMANLIK MERKEZİ',
    'experience.1.project': 'Öğrenci Seans Destek Projesi',
    'experience.1.location': 'İstanbul, Türkiye',
    'experience.1.date': '11/2023 - 2026',
    'experience.1.position': 'Klinik Psikolog',
    'experience.1.description': '17-24 yaş arası lise ve lisans öğrencilerine erişilebilir terapi hizmeti.',

    'experience.2.company': 'ÖZEL MOODİST HASTANESİ',
    'experience.2.location': 'İstanbul, Türkiye',
    'experience.2.date': '05/2023 - 06/2023',
    'experience.2.position': 'Stajyer Klinik Psikolog',
    'experience.2.description.1': 'Çeşitli servis katlarında gözlem yapıldı.',
    'experience.2.description.2': 'Grup terapi toplantılarına katılım gösterildi.',
    'experience.2.description.3': 'Bağımlılık üzerine detaylanmış kazanımlar öğrenildi.',

    'experience.3.company': 'FRANSIZ LAPE HASTANESİ',
    'experience.3.location': 'İstanbul, Türkiye',
    'experience.3.date': '03/2021-04/21',
    'experience.3.position': 'Klinik Psikoloji/ Stajyer',
    'experience.3.description.1': 'Yatılı hasta gözlemleri yapıldı.',
    'experience.3.description.2': 'Doktor vizitelerine ve birebir görüşmelerine katılım sağlandı.',
    'experience.3.description.3': 'Klinik Psikoloji Eğitimi kapsamında yapılan seminerlere katılım gösterildi.',

    'experience.4.company': 'İSTANBUL ÜNİVERSİTESİ CERRAHPAŞA TIP FAKÜLTESİ',
    'experience.4.location': 'İstanbul, Türkiye',
    'experience.4.date': '09/2019- 10/2019',
    'experience.4.position': 'Psikiyatri Servisi/ Stajyer',
    'experience.4.description.1': 'Polikliniklerde psikiyatri görüşmeleri gözlemlendi.',
    'experience.4.description.2': 'Psikofarmakolojik tedaviler hakkında bilgi alındı.',
    'experience.4.description.3': 'Geriatri psikolojisine ilişkin poliklinik gözlemleri yapıldı.',

    'certification.title': 'Eğitim (Sertifikalar)',
    'certification.1.name': 'Kişilik Kuramları, Kişilik Bozuklukları ve Dinamik Psikoterapi',
    'certification.1.date': '6. Dönem, Devam Ediyor',
    'certification.2.name': 'Kişilik, Kişilik Bozuklukları ve Dinamik Psikoterapi Temel Eğitimi',
    'certification.3.name': 'ISST Onaylı Şema Terapi Temel Eğitimi',
    'certification.4.name': 'MMPI Eğitim Uygulayıcı Sertifikası, MOODIST Psikiyatri ve Nöroloji Hastanesi',
    'certification.4.issuer': 'MOODİST Psikiyatri ve Nöroloji Hastanesi',
    'certification.5.name': 'Sanat Terapisi Eğitimi',
    'certification.5.issuer': 'İstanbul Üniversitesi S.E.M',
    'certification.6.name': 'Çözüm Odaklı Terapi Eğitimi',
    'certification.7.name': 'Rational Emotive Behavioural & Cognitive Therapy Pre-Practitioner Training',
    'certification.8.name': 'MOXO ADHD Test A.O',
    'certification.8.issuer': 'The Science of Well-being, Coursera, Yale Üniversitesi',

    // Seminars
    'seminars.title': 'Katıldığım Seminerler',
    'seminar.1.name': '24 Ekim Dünya Şema Terapi Günü',
    'seminar.1.date': '24 Ekim 2024',
    'seminar.1.role': 'Sunucu/Organizatör Ekip Üyesi',

    'seminar.2.name': '2. Şema Terapi Türkiye Sempozyumu',
    'seminar.2.date': '29-30 Eylül 2023',
    'seminar.2.type': 'Katılım Belgesi',

    'seminar.3.name': 'MOODİST Ruh Sağlığı Sempozyumu',
    'seminar.3.date': '2-4 Nisan 2021',
    'seminar.3.type': 'Katılım Belgesi',

    'seminar.4.name': 'İnsanca Akademi - İlişkiler Haftası',
    'seminar.4.date': '1-5 Mart 2021',
    'seminar.4.type': 'Katılım Belgesi',

    'seminar.5.name': 'Doğan Cüceloğlu Anısına Zirve Psikoloji Seminerleri',
    'seminar.5.organization': 'Akansel Eğitim Danışmanlık ve Ev Okulu Derneği',
    'seminar.5.date': '20-21 Mart 2021',
    'seminar.5.type': 'Katılım Belgesi',

    'seminar.6.name': 'Terapistin Rotası Mesleğe Hazırlık Seminerleri-2 Programı',
    'seminar.6.organization': 'Kolektif Psikoloji Eğitim ve Danışmanlık',
    'seminar.6.date': '11 Şubat - 7 Mart 2021',
    'seminar.6.duration': '7 gün/14 Oturum',
    'seminar.6.type': 'Katılım Belgesi',

    'seminar.7.name': 'Online Psikoloji Zirvesi Programı',
    'seminar.7.organization': 'Alfa Etkinlik Organizasyon',
    'seminar.7.date': '24-25 Ekim 2020',
    'seminar.7.type': 'Katılım Belgesi',

    'seminar.8.name': 'Online Psikoloji Zirvesi Programı',
    'seminar.8.organization': 'Alfa Etkinlik Organizasyon',
    'seminar.8.date': '18-21 Aralık 2020',
    'seminar.8.type': 'Katılım Belgesi',

    'session.informations.title': 'Oturum Bilgileri',
    'session.duration': 'Oturum Süresi',
    'session.online': 'Çevrimiçi Oturum',
    'session.via': 'Google Meet aracılığıyla',
    'session.payment': 'Ödeme Yöntemi',
    'session.payment.description': 'Banka havalesi ile veya ofiste elden',


    // Services
    'services.title': 'Hizmetlerim',
    'services.subtitle': 'Yetişkinler için özelleşmiş psikolojik destek ve terapi hizmetleri',
    'services.individual': 'Bireysel Terapi',
    'services.schema': 'Şema Terapi',
    'services.btn': 'Tüm Hizmetler',

    // Blog
    'blog.title': 'Blog',
    'blog.subtitle': 'Psikoloji ve kişisel gelişim konularında yazılarım',
    'blog.published': 'Yayınlanma',
    'blog.back': 'Geri Dön',
    'blog.btn': 'Tüm Blog Yazıları',
    // FAQ
    'faq.title': 'Sık Sorulan Sorular',
    'faq.subtitle': 'En çok merak edilen sorular ve cevapları',
    'faq.btn': 'Tüm SSS',
    'faq.cta.title': `Aradığınız cevabı bulamadınız mı?`,
    'faq.cta.subtitle': `Sorularınızı benimle doğrudan iletişime geçerek sorabilirsiniz.`,

    // Footer
    'footer.desc': 'Yetişkinler için şefkatli, samimi ve güven verici bir yaklaşımla psikolojik destek.',
    'footer.links': 'Hızlı Linkler',
    'footer.rights': 'Tüm hakları saklıdır.',
    'footer.dev': 'geliştiren',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'nav.faq': 'FAQ',


    // Home Page
    'home.hero.title': 'Hello, I am Clinical Psychologist Günnur Tekşen',
    'home.hero.desc': 'Clinical Psychologist',
    'home.hero.subtitle.p1': 'After graduating from the Department of Psychology at Özyeğin University, I completed my master degree in Clinical Psychology with a thesis at the Institute of Clinical Psychology at Rumeli University, Republic of Turkey.',
    'home.hero.subtitle.p2': 'Throughout my education and professional work, I have worked primarily with university students. While my work is primarily based on the Schema Therapy school, I also continue my training in psychodynamic therapy.',
    'home.hero.subtitle.p3': 'I am currently freelance and accept clients through referrals from my network.',
    'home.hero.subtitle.p4': 'In my work with my clients, I aim to enhance their personal development, psychological balance, and quality of life by providing a safe and non-judgmental therapy environment.',
    'home.hero.contact': 'You can contact me from the contact section to get more information about me or to make an appointment.',
    'home.hero.cta': 'Book Appointment',
    'home.hero.call': 'Call Now',
    'home.about.title': 'About Me',
    'home.about.desc': 'I am a psychologist specialised in clinical psychology, experienced in individual therapy with adults.',
    'home.services.title': 'My Services',
    'home.blog.title': 'Latest Posts',
    'home.blog.readMore': 'Read More',
    'home.faq.title': 'Frequently Asked Questions',
    'home.contact.title': 'Contact',

    // Contact
    'contact.form.name': 'Full Name',
    'contact.form.email': 'Email',
    'contact.form.phone': 'Phone',
    'contact.form.message': 'Your Message',
    'contact.form.submit': 'Send Message',
    'contact.form.sending': 'Sending...',
    'contact.subtitle': 'Get in touch with me, let\'s answer your questions and take the first step together.',
    'contact.phone': 'Phone',
    'contact.email': 'Email',
    'contact.address': 'Address',
    'contact.office': 'Office Address',
    'contact.office.location': 'Office Location',

    // Common
    'common.loading': 'Loading...',
    'common.readMore': 'Read More',
    'common.close': 'Close',
    'common.send': 'Send',
    'common.success': 'Successfully sent!',
    'common.error': 'An error occurred. Please try again.',
    'common.hello': 'Hello',
    'common.hour': 'hour',
    'common.readingTime': 'reading time',
    'common.minute': 'min',
    'common.job': 'Clinical Psychologist',
    'common.appointment': 'Book Appointment',
    'common.call': 'Call Now',
    'common.expertise': 'Areas of Expertise',
    'common.expertise-1': 'Long Term Relationship Problems',
    'common.expertise-2': 'Panic Disorders',
    'common.expertise-3': 'Personality Disorders',
    'common.expertise-4': 'Anxiety and Stress',
    'common.expertise-5': 'Crying and Tantrums',
    'common.expertise-6': 'Somatisation',
    'common.address': 'İstasyon, Yarımburgaz St. No:31. Floor 11, Apt: 90 Kucukcekmece/Istanbul, 34303',

    // About
    'about.title': 'About Me',
    'about.desc': 'I am a psychologist specialised in clinical psychology, experienced in individual therapy with adults.',
    'about.education': 'Education',
    'about.certificates': 'Certificates (Education)',
    'about.experience': 'Experience',
    'about.approach': 'My Approach',
    'about.approach.desc.1': 'In the therapy process, I focus on creating a compassionate and non-judgmental environment that respects each individual\'s unique experiences. I work with a strong commitment to client confidentiality and ethical principles.',
    'about.approach.desc.2': 'I am particularly specialized in the Schema Therapy approach, focusing on understanding and changing long-term patterns. This approach is especially effective for personality disorders and chronic psychological issues.',
    'about.cta.title': 'Would you like to start working with me?',
    'about.cta.desc': 'Taking the first step can sometimes be difficult, but I will be with you on this journey.',

    'education.title': 'Education',
    'education.1.name': 'Istanbul Rumeli University',
    'education.1.program': "Department of Clinical Psychology - Clinical Psychology Master's Program with Thesis",
    'education.1.date': '2022-2024',
    'education.1.location': 'Istanbul, Turkey',
    'education.2.name': 'Özyeğin University',
    'education.2.program': 'Faculty of Social Sciences - Department of Psychology',
    'education.2.date': '2015-2020',
    'education.2.location': 'Istanbul, Turkey',

    // Experience
    'experience.title': 'Experience',
    'experience.1.company': 'BI\'ŞEY SEANS PSYCHOLOGICAL COUNSELING CENTER',
    'experience.1.project': 'Student Session Support Project',
    'experience.1.location': 'Istanbul, Turkey',
    'experience.1.date': '11/2023- 2026',
    'experience.1.position': 'Clinical Psychologist',
    'experience.1.description': 'Providing accessible therapy services to high school and university students aged 17-24.',

    'experience.2.company': 'MOODIST PRIVATE HOSPITAL',
    'experience.2.location': 'Istanbul, Turkey',
    'experience.2.date': '05/2023- 06/2023',
    'experience.2.position': 'Clinical Psychology Intern',
    'experience.2.description.1': 'Conducted observations in various service departments.',
    'experience.2.description.2': 'Participated in group therapy sessions.',
    'experience.2.description.3': 'Gained detailed insights into addiction treatment.',

    'experience.3.company': 'FRENCH LAPE HOSPITAL',
    'experience.3.location': 'Istanbul, Turkey',
    'experience.3.date': '03/2021-04/21',
    'experience.3.position': 'Clinical Psychology Intern',
    'experience.3.description.1': 'Conducted inpatient observations.',
    'experience.3.description.2': 'Participated in doctor visits and one-on-one consultations.',
    'experience.3.description.3': 'Attended seminars as part of Clinical Psychology Training.',

    'experience.4.company': 'ISTANBUL UNIVERSITY CERRAHPAŞA FACULTY OF MEDICINE',
    'experience.4.location': 'Istanbul, Turkey',
    'experience.4.date': '09/2019- 10/2019',
    'experience.4.position': 'Psychiatry Department Intern',
    'experience.4.description.1': 'Observed psychiatric consultations in outpatient clinics.',
    'experience.4.description.2': 'Gained knowledge about psychopharmacological treatments.',
    'experience.4.description.3': 'Conducted clinic observations related to geriatric psychology.',

    'certification.title': 'Education (Certifications)',
    'certification.1.name': 'Personality Theories, Personality Disorders and Dynamic Psychotherapy',
    'certification.1.date': '6th Term, Continues',
    'certification.2.name': 'Personality, Personality Disorders and Dynamic Psychotherapy Basic Training',
    'certification.3.name': 'ISST Approved Schema Therapy Basic Training',
    'certification.4.name': 'MMPI Training Practitioner Certificate',
    'certification.4.issuer': 'MOODIST Psychiatry and Neurology Hospital',
    'certification.5.name': 'Art Therapy Training',
    'certification.5.issuer': 'Istanbul University S.E.M',
    'certification.6.name': 'Solution Focused Therapy Training',
    'certification.7.name': 'Rational Emotive Behavioural & Cognitive Therapy Pre-Practitioner Training',
    'certification.7.date': 'Rational Emotive Behavioural & Cognitive Therapy Pre-Practitioner Training',
    'certification.8.name': 'MOXO ADHD Test A.O',
    'certification.8.issuer': 'The Science of Well-being, Coursera, Yale University',

    // Seminars
    'seminars.title': 'Seminars',
    'seminar.1.name': 'World Schema Therapy Day',
    'seminar.1.date': 'October 24, 2024',
    'seminar.1.role': 'Host/Organizer Team Member',

    'seminar.2.name': '2nd Schema Therapy Turkey Symposium',
    'seminar.2.date': 'September 29-30, 2023',
    'seminar.2.type': 'Participation Certificate',

    'seminar.3.name': 'MOODIST Mental Health Symposium',
    'seminar.3.date': 'April 2-4, 2021',
    'seminar.3.type': 'Participation Certificate',

    'seminar.4.name': 'İnsanca Academy - Relationships Week',
    'seminar.4.date': 'March 1-5, 2021',
    'seminar.4.type': 'Participation Certificate',

    'seminar.5.name': 'Psychology Summit in Memory of Doğan Cüceloğlu',
    'seminar.5.organization': 'Akansel Education Consultancy and Home School Association',
    'seminar.5.date': 'March 20-21, 2021',
    'seminar.5.type': 'Participation Certificate',

    'seminar.6.name': "Therapist's Route Career Preparation Seminars-2 Program",
    'seminar.6.organization': 'Collective Psychology Education and Consultancy',
    'seminar.6.date': 'February 11 - March 7, 2021',
    'seminar.6.duration': '7 days/14 Sessions',
    'seminar.6.type': 'Participation Certificate',

    'seminar.7.name': 'Online Psychology Summit Program',
    'seminar.7.organization': 'Alfa Event Organization',
    'seminar.7.date': 'October 24-25, 2020',
    'seminar.7.type': 'Participation Certificate',

    'seminar.8.name': 'Online Psychology Summit Program',
    'seminar.8.organization': 'Alfa Event Organization',
    'seminar.8.date': 'December 18-21, 2020',
    'seminar.8.type': 'Participation Certificate',



    'session.informations.title': 'Session Informations',
    'session.duration': 'Session Duration',
    'session.online': 'Online Session',
    'session.via': 'via Google Meet',
    'session.payment': 'Payment Method',
    'session.payment.description': 'By bank transfer or by hand in the office',

    // Services
    'services.title': 'My Services',
    'services.subtitle': 'Specialised psychological support and therapy services for adults',
    'services.individual': 'Individual Therapy',
    'services.schema': 'Schema Therapy',
    'services.btn': 'All Services',

    // Blog
    'blog.title': 'Blog',
    'blog.subtitle': 'My articles on psychology and personal development',
    'blog.published': 'Published',
    'blog.back': 'Go Back',
    'blog.btn': 'All Blog Posts',
    // FAQ
    'faq.title': 'Frequently Asked Questions',
    'faq.subtitle': 'Most frequently asked questions and answers',
    'faq.btn': 'All FAQs',
    'faq.cta.title': `Didn't find the answer you were looking for?`,
    'faq.cta.subtitle': `Benimle doğrudan iletişime geçerek sorularınızı sorabilirsiniz.`,

    'footer.desc': 'Psychological support for adults with a caring, friendly and reassuring approach.',
    'footer.links': 'Quick Links',
    'footer.rights': 'All rights reserved.',
    'footer.dev': 'developed by',
  },
};

// Global language state
let globalLanguage: Language = 'tr';

// Global listeners for language changes
const languageListeners: Set<() => void> = new Set();

export function useTranslation() {
  const [language, setLanguage] = useState<Language>(globalLanguage);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const stored = localStorage.getItem('language') as Language;
    if (stored && (stored === 'tr' || stored === 'en')) {
      globalLanguage = stored;
      setLanguage(stored);
    }

    // Add listener for global language changes
    const updateLanguage = () => {
      setLanguage(globalLanguage);
    };

    languageListeners.add(updateLanguage);

    return () => {
      languageListeners.delete(updateLanguage);
    };
  }, []);

  const changeLanguage = (lang: Language) => {
    globalLanguage = lang;
    localStorage.setItem('language', lang);

    // Notify all listeners
    languageListeners.forEach(listener => listener());
  };

  const t = (key: string): string => {
    if (!isClient) {
      // Return Turkish translation during SSR
      return translations['tr'][key] || key;
    }
    return translations[language][key] || key;
  };

  const tm = (key: string): string[] => {
    const currentTranslations = isClient ? translations[language] : translations['tr'];
    const results: string[] = [];

    // Check for base key
    if (currentTranslations[key]) {
      results.push(currentTranslations[key]);
    }

    // Check for numbered keys starting from .1
    let i = 1;
    while (currentTranslations[`${key}.${i}`]) {
      results.push(currentTranslations[`${key}.${i}`]);
      i++;
    }

    // Check for paragraph numbered keys starting from .p1
    let p = 1;
    while (currentTranslations[`${key}.p${p}`]) {
      results.push(currentTranslations[`${key}.p${p}`]);
      p++;
    }

    return results.length > 0 ? results : [key];
  };

  return {
    t,
    tm,
    language,
    changeLanguage,
  };
}
