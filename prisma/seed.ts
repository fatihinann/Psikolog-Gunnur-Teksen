import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Blog Posts
  const blogPosts = await prisma.blogPost.createMany({
    data: [
      {
        title: "Anksiyete ile Başa Çıkma Yolları",
        content:
          "Anksiyete günlük yaşamımızı etkileyen önemli bir durumdur. Bu yazıda anksiyete ile başa çıkma yollarını ele alacağız...",
        excerpt: "Anksiyete ile başa çıkmak için pratik yöntemler",
        language: "tr",
        status: "published",
      },
      {
        title: "Dealing with Anxiety",
        content:
          "Anxiety is a significant condition that affects our daily lives. In this article, we will explore ways to cope with anxiety...",
        excerpt: "Practical methods for coping with anxiety",
        language: "en",
        status: "published",
      },
      {
        title: "Şema Terapi Nedir?",
        content:
          "Şema Terapi, kişilik bozuklukları ve kronik durumlar için geliştirilmiş etkili bir terapi yaklaşımıdır...",
        excerpt: "Şema terapinin temel prensipleri ve faydaları",
        language: "tr",
        status: "draft",
      },
    ],
  });
  // Certifications
  const certifications = await prisma.certificate.createMany({
    data: [
      {
        name: "Kişilik Kuramları, Kişilik Bozuklukları ve Dinamik Psikoterapi",
        date: "6. Dönem, Devam Ediyor",
        issuer: "",
        language: "tr",
        orderNum: 1,
        isActive: true,
      },
      {
        name: "Personality Theories, Personality Disorders and Dynamic Psychotherapy",
        date: "",
        issuer: "",
        language: "en",
        orderNum: 1,
        isActive: true,
      },
      {
        name: "Kişilik, Kişilik Bozuklukları ve Dinamik Psikoterapi Temel Eğitimi",
        date: "",
        issuer: "",
        language: "tr",
        orderNum: 2,
        isActive: true,
      },
      {
        name: "Personality, Personality Disorders and Dynamic Psychotherapy Basic Training",
        date: "",
        issuer: "",
        language: "en",
        orderNum: 2,
        isActive: true,
      },
      {
        name: "ISST Onaylı Şema Terapi Temel Eğitimi",
        date: "",
        issuer: "",
        language: "tr",
        orderNum: 3,
        isActive: true,
      },
      {
        name: "ISST Approved Schema Therapy Basic Training",
        date: "",
        issuer: "",
        language: "en",
        orderNum: 3,
        isActive: true,
      },
      {
        name: "MMPI Training Practitioner Certificate",
        date: "",
        issuer: "MOODİST Psikiyatri ve Nöroloji Hastanesi",
        language: "tr",
        orderNum: 4,
        isActive: true,
      },
      {
        name: "MMPI Training Practitioner Certificate",
        date: "",
        issuer: "MOODIST Psychiatry and Neurology Hospital",
        language: "en",
        orderNum: 4,
        isActive: true,
      },
      {
        name: "Sanat Terapisi Eğitimi",
        date: "",
        issuer: "İstanbul Üniversitesi S.E.M",
        language: "tr",
        orderNum: 5,
        isActive: true,
      },
      {
        name: "Art Therapy Training",
        date: "",
        issuer: "Istanbul University S.E.M",
        language: "en",
        orderNum: 5,
        isActive: true,
      },
      {
        name: "Çözüm Odaklı Terapi Eğitimi",
        date: "",
        issuer: "",
        language: "tr",
        orderNum: 6,
        isActive: true,
      },
      {
        name: "Solution Focused Therapy Training",
        date: "",
        issuer: "",
        language: "en",
        orderNum: 6,
        isActive: true,
      },
      {
        name: "Rasyonel Duygusal Davranışçı ve Bilişsel Terapi Uygulama Öncesi Eğitim Programı",
        date: "",
        issuer: "",
        language: "tr",
        orderNum: 7,
        isActive: true,
      },
      {
        name: "Rational Emotive Behavioural & Cognitive Therapy Pre-Practitioner Training",
        date: "",
        issuer: "",
        language: "en",
        orderNum: 7,
        isActive: true,
      },
      {
        name: "MOXO ADHD Test A.O",
        date: "",
        issuer: "The Science of Well-being, Coursera, Yale Üniversitesi",
        language: "tr",
        orderNum: 8,
        isActive: true,
      },
      {
        name: "MOXO ADHD Test A.O",
        date: "",
        issuer: "The Science of Well-being, Coursera, Yale University",
        language: "en",
        orderNum: 8,
        isActive: true,
      },
    ],
  });

  // Educations
  const educations = await prisma.education.createMany({
    data: [
      {
        name: 'T.C. İstanbul Rumeli Üniversitesi',
        program: 'Klinik Psikoloji Ana Bilim Dalı- Klinik Psikoloji Tezli Yüksek Lisans Programı',
        date: '2022-2024',
        location: 'İstanbul, Türkiye',
        language: 'tr',
        orderNum: 1,
        isActive: true,
      },
      {
        name: 'T. R. Istanbul Rumeli University',
        program: "Department of Clinical Psychology - Clinical Psychology Master's Program with Thesis",
        date: '2022-2024',
        location: 'Istanbul, Turkey',
        language: 'en',
        orderNum: 1,
        isActive: true,
      },
      {
        name: 'Özyeğin Üniversitesi',
        program: 'Sosyal Bilimler Fakültesi- Psikoloji Bölümü',
        date: '2015-2020',
        location: 'İstanbul, Türkiye',
        language: 'tr',
        orderNum: 2,
        isActive: true,
      },
      {
        name: 'Özyeğin University',
        program: 'Faculty of Social Sciences - Department of Psychology',
        date: '2015-2020',
        location: 'Istanbul, Turkey',
        language: 'en',
        orderNum: 2,
        isActive: true,
      },
    ],
  });
  const experiences = await prisma.experience.createMany({
    data: [
      {
        company: "Bİ'ŞEY SEANS PSİKOLOJİK DANIŞMANLIK MERKEZİ",
        project: "Öğrenci Seans Destek Projesi",
        location: "İstanbul, Türkiye",
        date: "11/2023 - 2026",
        position: "Klinik Psikolog",
        descriptionFirst: "17-24 yaş arası lise ve lisans öğrencilerine erişilebilir terapi hizmeti.",
        descriptionSecond: "",
        descriptionThird: "",
        language: "tr",
        orderNum: 1,
        isActive: true,
      },
      {
        company: "BI'ŞEY SEANS PSYCHOLOGICAL COUNSELING CENTER",
        project: "Student Session Support Project",
        location: "Istanbul, Turkey",
        date: "11/2023 - 2026",
        position: "Clinical Psychologist",
        descriptionFirst: "Accessible therapy services for high school and undergraduate students aged 17-24.",
        descriptionSecond: "",
        descriptionThird: "",
        language: "en",
        orderNum: 1,
        isActive: true,
      },
      {
        company: "ÖZEL MOODİST HASTANESİ",
        location: "İstanbul, Türkiye",
        date: "05/2023 - 06/2023",
        position: "Stajyer Klinik Psikolog",
        descriptionFirst: "Çeşitli servis katlarında gözlem yapıldı.",
        descriptionSecond: "Grup terapi toplantılarına katılım gösterildi.",
        descriptionThird: "Bağımlılık üzerine detaylanmış kazanımlar öğrenildi.",
        language: "tr",
        orderNum: 2,
        isActive: true,
      },
      {
        company: "MOODIST PRIVATE HOSPITAL",
        location: "Istanbul, Turkey",
        date: "05/2023 - 06/2023",
        position: "Clinical Psychology Intern",
        descriptionFirst: "Conducted observations in various service departments",
        descriptionSecond: "Participated in group therapy sessions",
        descriptionThird: "Gained in-depth knowledge of addiction treatment",
        language: "en",
        orderNum: 2,
        isActive: true,
      },
      {
        company: "FRANSIZ LAPE HASTANESİ",
        location: "İstanbul, Türkiye",
        date: "03/2021-04/21",
        position: "Klinik Psikoloji/ Stajyer",
        descriptionFirst: "Yatılı hasta gözlemleri yapıldı.",
        descriptionSecond: "Doktor vizitelerine ve birebir görüşmelerine katılım sağlandı.",
        descriptionThird: "Klinik Psikoloji Eğitimi kapsamında yapılan seminerlere katılım gösterildi.",
        language: "tr",
        orderNum: 3,
        isActive: true,
      },
      {
        company: "FRENCH LAPE HOSPITAL",
        location: "Istanbul, Turkey",
        date: "03/2021-04/21",
        position: "Clinical Psychology Intern",
        descriptionFirst: "Conducted inpatient observations.",
        descriptionSecond: "Participated in doctor's rounds and one-on-one meetings.",
        descriptionThird: "Attended seminars held within the scope of Clinical Psychology Education.",
        language: "en",
        orderNum: 3,
        isActive: true,
      },
      {
        company: "İSTANBUL ÜNİVERSİTESİ CERRAHPAŞA TIP FAKÜLTESİ",
        location: "İstanbul, Türkiye",
        date: "09/2019 - 10/2019",
        position: "Psikiyatri Servisi/ Stajyer",
        descriptionFirst: "Polikliniklerde psikiyatri görüşmeleri gözlemlendi.",
        descriptionSecond: "Psikofarmakolojik tedaviler hakkında bilgi alındı.",
        descriptionThird: "Geriatri psikolojisine ilişkin poliklinik gözlemleri yapıldı.",
        language: "tr",
        orderNum: 4,
        isActive: true,
      },
      {
        company: "ISTANBUL UNIVERSITY CERRAHPAŞA FACULTY OF MEDICINE",
        location: "Istanbul, Turkey",
        date: "09/2019 - 10/2019",
        position: "Psychiatry Department Intern",
        descriptionFirst: "Observed psychiatric consultations in outpatient clinics.",
        descriptionSecond: "Gained knowledge about psychopharmacological treatments.",
        descriptionThird: "Conducted clinic observations related to geriatric psychology.",
        language: "en",
        orderNum: 4,
        isActive: true,
      },
    ],
  });

  // Experiences
  const seminars = await prisma.seminar.createMany({
    data: [
      {
        name: "24 Ekim Dünya Şema Terapi Günü",
        date: "24 Ekim 2024",
        type: "Sunucu/Organizatör Ekip Üyesi",
        organization: "",
        duration: "",
        language: "tr",
        orderNum: 1,
        isActive: true,
      },
      {
        name: "World Schema Therapy Day",
        date: "October 24, 2024",
        type: "Host/Organizer Team Member",
        organization: "",
        duration: "",
        language: "en",
        orderNum: 1,
        isActive: true,
      },
      {
        name: "2. Şema Terapi Türkiye Sempozyumu",
        date: "29-30 Eylül 2023",
        type: "Katılım Belgesi",
        organization: "",
        duration: "",
        language: "tr",
        orderNum: 2,
        isActive: true,
      },
      {
        name: "2nd Schema Therapy Turkey Symposium",
        date: "September 29-30, 2023",
        type: "Participation Certificate",
        organization: "",
        duration: "",
        language: "en",
        orderNum: 2,
        isActive: true,
      },
      {
        name: "MOODİST Ruh Sağlığı Sempozyumu",
        date: "2-4 Nisan 2021",
        type: "Katılım Belgesi",
        organization: "",
        duration: "",
        language: "tr",
        orderNum: 3,
        isActive: true,
      },
      {
        name: "MOODİST Mental Health Symposium",
        date: "April 2-4, 2021",
        type: "Participation Certificate",
        organization: "",
        duration: "",
        language: "en",
        orderNum: 3,
        isActive: true,
      },
      {
        name: "İnsanca Akademi - İlişkiler Haftası",
        date: "1-5 Mart 2021",
        type: "Katılım Belgesi",
        organization: "",
        duration: "",
        language: "tr",
        orderNum: 4,
        isActive: true,
      },
      {
        name: "Insanca Academy - Relationships Week",
        date: "March 1-5, 2021",
        type: "Participation Certificate",
        organization: "",
        duration: "",
        language: "en",
        orderNum: 4,
        isActive: true,
      },
      {
        name: "Doğan Cüceloğlu Anısına Zirve Psikoloji Seminerleri",
        date: "20-21 Mart 2021",
        type: "Katılım Belgesi",
        organization: "Akansel Eğitim Danışmanlık ve Ev Okulu Derneği",
        duration: "",
        language: "tr",
        orderNum: 5,
        isActive: true,
      },
      {
        name: "Psychology Summit in Memory of Doğan Cüceloğlu",
        date: "March 20-21, 2021",
        type: "Participation Certificate",
        organization: "Akansel Education Consultancy and Home School Association",
        duration: "",
        language: "en",
        orderNum: 5,
        isActive: true,
      },
      {
        name: "Terapistin Rotası Mesleğe Hazırlık Seminerleri-2 Programı",
        date: "11 Şubat - 7 Mart 2021",
        type: "Katılım Belgesi",
        organization: "Kolektif Psikoloji Eğitim ve Danışmanlık",
        duration: "7 gün/14 Oturum",
        language: "tr",
        orderNum: 6,
        isActive: true,
      },
      {
        name: "Therapist's Route Career Preparation Seminars-2 Program",
        date: "February 11 - March 7, 2021",
        type: "Participation Certificate",
        organization: "Collective Psychology Education and Consultancy",
        duration: "7 days/14 Sessions",
        language: "en",
        orderNum: 6,
        isActive: true,
      },
      {
        name: "Online Psikoloji Zirvesi Programı",
        date: "24-25 Ekim 2020",
        type: "Katılım Belgesi",
        organization: "Alfa Etkinlik Organizasyon",
        duration: "",
        language: "tr",
        orderNum: 7,
        isActive: true,
      },
      {
        name: "Online Psychology Summit Program",
        date: "October 24-25, 2020",
        type: "Participation Certificate",
        organization: "Alfa Event Organization",
        duration: "",
        language: "en",
        orderNum: 7,
        isActive: true,
      },
      {
        name: "Online Psikoloji Zirvesi Programı",
        date: "18-21 Aralık 2020",
        type: "Katılım Belgesi",
        organization: "Alfa Etkinlik Organizasyon",
        duration: "",
        language: "tr",
        orderNum: 8,
        isActive: true,
      },
      {
        name: "Online Psychology Summit Program",
        date: "December 18-21, 2020",
        type: "Participation Certificate",
        organization: "Alfa Event Organization",
        duration: "",
        language: "en",
        orderNum: 8,
        isActive: true,
      },

    ],
  });
  // Services
  const services = await prisma.service.createMany({
    data: [
      {
        name: "Bireysel Terapi",
        description:
          "Yetişkinler için bireysel psikolojik destek ve terapi hizmetleri. Anksiyete, depresyon, stres yönetimi ve kişisel gelişim alanlarında profesyonel destek.",
        language: "tr",
        isActive: true,
      },
      {
        name: "Individual Therapy",
        description:
          "Individual psychological support and therapy services for adults. Professional support in areas of anxiety, depression, stress management and personal development.",
        language: "en",
        isActive: true,
      },
      {
        name: "Şema Terapi",
        description:
          "Kişilik bozuklukları ve kronik psikolojik sorunlar için özelleşmiş şema terapi yaklaşımı.",
        language: "tr",
        isActive: true,
      },
      {
        name: "Schema Therapy",
        description:
          "Specialized schema therapy approach for personality disorders and chronic psychological problems.",
        language: "en",
        isActive: true,
      },
    ],
  });

  // FAQs
  const faqs = await prisma.faq.createMany({
    data: [
      {
        question: "Seans süresi ne kadar?",
        answer: "Her bir terapi seansı 50 dakika sürmektedir.",
        language: "tr",
        orderNum: 1,
        isActive: true,
      },
      {
        question: "How long is each session?",
        answer: "Each therapy session lasts 50 minutes.",
        language: "en",
        orderNum: 1,
        isActive: true,
      },
      {
        question: "Online görüşme nasıl yapılıyor?",
        answer:
          "Online görüşmeler Google Meet üzerinden gerçekleşmektedir. Link WhatsApp üzerinden paylaşılmaktadır.",
        language: "tr",
        orderNum: 2,
        isActive: true,
      },
      {
        question: "How are online sessions conducted?",
        answer:
          "Online sessions are conducted via Google Meet. The link is shared through WhatsApp.",
        language: "en",
        orderNum: 2,
        isActive: true,
      },
      {
        question: "Ödeme nasıl yapılır?",
        answer: "Ödeme havale yoluyla veya ofiste elden yapılabilmektedir.",
        language: "tr",
        orderNum: 3,
        isActive: true,
      },
      {
        question: "How can I make payment?",
        answer:
          "Payment can be made by bank transfer or in person at the office.",
        language: "en",
        orderNum: 3,
        isActive: true,
      },
    ],
  });

  // Contact Submissions
  const contactSubmissions = await prisma.contactSubmission.createMany({
    data: [
      {
        name: "Ahmet Yılmaz",
        email: "ahmet@email.com",
        phone: "05321234567",
        message: "Merhaba, terapi hakkında bilgi almak istiyorum.",
        status: "new",
      },
      {
        name: "Sarah Johnson",
        email: "sarah@email.com",
        phone: "05369876543",
        message:
          "I would like to schedule an appointment for therapy sessions.",
        status: "responded",
      },
      {
        name: "Melek Özkan",
        email: "melek@email.com",
        phone: "05451234567",
        message: "Anksiyete sorunu yaşıyorum, yardıma ihtiyacım var.",
        status: "new",
      },
    ],
  });

  console.log(`📞 Created ${contactSubmissions.count} contact submissions`);
  console.log("✅ Database seeded successfully!");
  console.log(`📝 Created ${blogPosts.count} blog posts`);
  console.log(`🔧 Created ${services.count} services`);
  console.log(`❓ Created ${faqs.count} FAQs`);
  console.log(`🎓 Created ${educations.count} educations`);
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
