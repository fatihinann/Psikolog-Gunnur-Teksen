import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const counts = {
    blogPost: await prisma.blogPost.count(),
    service: await prisma.service.count(),
    contactSubmission: await prisma.contactSubmission.count(),
    faq: await prisma.faq.count(),
    experience: await prisma.experience.count(),
    certificate: await prisma.certificate.count(),
    seminar: await prisma.seminar.count(),
    education: await prisma.education.count(),
  };

  console.log(JSON.stringify(counts, null, 2));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
