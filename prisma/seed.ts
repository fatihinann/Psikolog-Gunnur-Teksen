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
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
