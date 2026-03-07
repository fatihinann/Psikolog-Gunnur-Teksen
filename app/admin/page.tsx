'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Toaster } from '@/components/ui/toaster';
import { FileText, MessageSquare, Phone, HelpCircle, LogOut, LayoutDashboard, GraduationCap, Briefcase, Award, Calendar } from 'lucide-react';
import { BlogPostsManager } from '@/components/BlogPostsMenager';
import { ContactSubmissionsManager } from '@/components/ContactSubmissionsManager';
import { ServicesManager } from '@/components/ServicesManager';
import { FaqsManager } from '@/components/FaqsManager';
import { EducationManager } from '@/components/EducationManager';
import { ExperienceManager } from '@/components/ExperienceManager';
import { CertificateManager } from '@/components/CertificateManager';
import { SeminarManager } from '@/components/SeminarManager';
import { ThemeToggle } from '@/components/theme-toggle';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import loadBlogPostsAction from '@/actions/blog/loadBlogPosts';
import loadContactSubmissionsAction from '@/actions/contact/loadContactSubmissions';
import loadServicesAction from '@/actions/services/loadServices';
import loadFaqsAction from '@/actions/faqs/loadFaqs';
import loadEducationsAction from '@/actions/education/loadEducations';
import loadExperiencesAction from '@/actions/experience/loadExperiences';
import loadCertificatesAction from '@/actions/certificate/loadCertificates';
import loadSeminarsAction from '@/actions/seminar/loadSeminars';

interface BlogPost {
  id: number;
  title: string;
  content: string;
  excerpt: string | null;
  language: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  status: string;
  createdAt: Date;
}

interface Service {
  id: number;
  name: string;
  description: string;
  language: string;
  isActive: boolean;
}

interface FAQ {
  id: number;
  question: string;
  answer: string;
  language: string;
  orderNum: number;
  isActive: boolean;
}

interface Education {
  id: number;
  name: string;
  program: string;
  location: string;
  date: string;
  language: string;
  orderNum: number;
  isActive: boolean;
}

interface Experience {
  id: number;
  company: string;
  position: string;
  date: string;
  descriptionFirst: string;
  descriptionSecond: string | null;
  descriptionThird: string | null;
  language: string;
  orderNum: number;
  isActive: boolean;
}

interface Certificate {
  id: number;
  name: string;
  issuer: string | null;
  date: string;
  language: string;
  orderNum: number;
  isActive: boolean;
}

interface Seminar {
  id: number;
  name: string;
  date: string;
  type: string;
  organization: string | null;
  duration: string | null;
  language: string;
  orderNum: number;
  isActive: boolean;
}

export default function AdminPage() {
  const { isAuthenticated, username, isLoading: authLoading, logout } = useAuth();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [educations, setEducations] = useState<Education[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [seminars, setSeminars] = useState<Seminar[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [posts, contacts, servicesData, faqsData, educationsData, experiencesData, certificatesData, seminarsData] = await Promise.all([
          loadBlogPostsAction(true),
          loadContactSubmissionsAction(),
          loadServicesAction(true),
          loadFaqsAction(true),
          loadEducationsAction(true),
          loadExperiencesAction(true),
          loadCertificatesAction(true),
          loadSeminarsAction(true),
        ]);
        setBlogPosts(posts);
        setContactSubmissions(contacts);
        setServices(servicesData);
        setFaqs(faqsData);
        setEducations(educationsData);
        setExperiences(experiencesData);
        setCertificates(certificatesData);
        setSeminars(seminarsData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const refreshBlogPosts = () => loadBlogPostsAction().then(setBlogPosts);
  const refreshContacts = () => loadContactSubmissionsAction().then(setContactSubmissions);
  const refreshServices = () => loadServicesAction().then(setServices);
  const refreshFaqs = () => loadFaqsAction().then(setFaqs);
  const refreshEducations = () => loadEducationsAction(true).then(setEducations);
  const refreshExperiences = () => loadExperiencesAction(true).then(setExperiences);
  const refreshCertificates = () => loadCertificatesAction(true).then(setCertificates);
  const refreshSeminars = () => loadSeminarsAction(true).then(setSeminars);

  const publishedPosts = blogPosts.filter(p => p.status === 'published').length;
  const draftPosts = blogPosts.filter(p => p.status === 'draft').length;
  const newContacts = contactSubmissions.filter(c => c.status === 'new').length;
  const activeServices = services.filter(s => s.isActive).length;

  if (authLoading) {
    return (
      <div className="min-h-screen bg-dark-base flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-primary-sage/30 border-t-primary-sage rounded-full animate-spin mx-auto mb-5" />
          <p className="text-stone-500 text-sm font-light">Kimlik doğrulanıyor...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-accent-bone dark:bg-dark-base transition-colors duration-300">
      {/* Top Bar */}
      <header className="bg-white/80 dark:bg-dark-surface/90 backdrop-blur-xl border-b border-stone-200/40 dark:border-dark-muted/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-primary-green/8 dark:bg-dark-forest/40 rounded-xl border border-primary-green/10 dark:border-primary-sage/20">
              <LayoutDashboard className="h-5 w-5 text-primary-green dark:text-primary-sage" />
            </div>
            <div>
              <div className="text-sm font-serif font-semibold text-stone-900 dark:text-stone-100 leading-none">
                Günnur Tekşen
              </div>
              <div className="text-[10px] text-stone-400 dark:text-stone-500 uppercase tracking-[0.15em] mt-0.5 font-medium">
                Yönetim Paneli
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="hidden sm:block text-xs text-stone-400 dark:text-stone-500 font-light">
              Hoş geldiniz, <span className="text-stone-600 dark:text-stone-400 font-medium">{username}</span>
            </span>
            <ThemeToggle />
            <Button
              variant="outline"
              size="sm"
              onClick={logout}
              className="flex items-center gap-2 border-stone-200 dark:border-dark-muted text-stone-500 dark:text-stone-400 hover:text-red-500 dark:hover:text-red-400 hover:border-red-200 dark:hover:border-red-900 rounded-xl transition-all duration-300 text-xs"
            >
              <LogOut className="h-3.5 w-3.5" />
              Çıkış
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10 space-y-8">
        {/* Page Title */}
        <div>
          <h1 className="text-3xl font-serif font-light text-stone-900 dark:text-stone-100 tracking-tight">
            İçerik Yönetimi
          </h1>
          <p className="text-stone-400 dark:text-stone-500 text-sm font-light mt-1">
            Site içeriklerini buradan yönetebilirsiniz.
          </p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Blog */}
          <div className="minimalist-card p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2.5 bg-primary-green/8 dark:bg-dark-forest/40 rounded-xl border border-primary-green/10 dark:border-primary-sage/20">
                <FileText className="h-5 w-5 text-primary-green dark:text-primary-sage" />
              </div>
              <span className="text-2xl font-serif font-semibold text-stone-900 dark:text-stone-100">
                {loading ? '—' : blogPosts.length}
              </span>
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-2">Blog Yazıları</p>
            <div className="flex gap-1.5 flex-wrap">
              <Badge className="bg-primary-green/10 text-primary-green dark:bg-dark-forest/50 dark:text-primary-sage border-none text-xs font-medium px-2 py-0.5">
                {publishedPosts} Yayında
              </Badge>
              <Badge className="bg-stone-100 dark:bg-dark-muted/50 text-stone-500 dark:text-stone-400 border-none text-xs px-2 py-0.5">
                {draftPosts} Taslak
              </Badge>
            </div>
          </div>

          {/* Services */}
          <div className="minimalist-card p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2.5 bg-accent-terracotta/8 dark:bg-accent-terracotta/15 rounded-xl border border-accent-terracotta/12 dark:border-accent-terracotta/20">
                <MessageSquare className="h-5 w-5 text-accent-terracotta" />
              </div>
              <span className="text-2xl font-serif font-semibold text-stone-900 dark:text-stone-100">
                {loading ? '—' : services.length}
              </span>
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-2">Hizmetler</p>
            <Badge className="bg-accent-terracotta/10 text-accent-terracotta border-none text-xs font-medium px-2 py-0.5">
              {activeServices} Aktif
            </Badge>
          </div>

          {/* FAQs */}
          <div className="minimalist-card p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2.5 bg-primary-sage/10 dark:bg-primary-sage/10 rounded-xl border border-primary-sage/15 dark:border-primary-sage/20">
                <HelpCircle className="h-5 w-5 text-primary-sage" />
              </div>
              <span className="text-2xl font-serif font-semibold text-stone-900 dark:text-stone-100">
                {loading ? '—' : faqs.length}
              </span>
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-2">SSS</p>
            <Badge className="bg-primary-sage/10 text-primary-sage border-none text-xs font-medium px-2 py-0.5">
              Soru & Cevap
            </Badge>
          </div>

          {/* Contact */}
          <div className="minimalist-card p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2.5 bg-stone-100 dark:bg-dark-muted/50 rounded-xl border border-stone-200/60 dark:border-dark-muted/30">
                <Phone className="h-5 w-5 text-stone-500 dark:text-stone-400" />
              </div>
              <span className="text-2xl font-serif font-semibold text-stone-900 dark:text-stone-100">
                {loading ? '—' : contactSubmissions.length}
              </span>
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-2">İletişim</p>
            {newContacts > 0 ? (
              <Badge className="bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/40 text-xs font-medium px-2 py-0.5">
                {newContacts} Yeni Mesaj
              </Badge>
            ) : (
              <Badge className="bg-stone-100 dark:bg-dark-muted/50 text-stone-400 border-none text-xs px-2 py-0.5">
                Yeni mesaj yok
              </Badge>
            )}
          </div>
        </div>

        {/* Content Tabs */}
        <div className="minimalist-card p-6">
          <Tabs defaultValue="blog" className="w-full">
            <TabsList className="grid w-full grid-cols-4 sm:grid-cols-8 bg-stone-100/80 dark:bg-dark-muted/40 rounded-xl p-1 mb-6 border border-stone-200/30 dark:border-dark-muted/30">
              <TabsTrigger
                value="blog"
                className="rounded-lg text-xs sm:text-sm font-medium data-[state=active]:bg-white dark:data-[state=active]:bg-dark-card data-[state=active]:text-primary-green dark:data-[state=active]:text-primary-sage data-[state=active]:shadow-sm transition-all duration-200"
              >
                Blog
              </TabsTrigger>
              <TabsTrigger
                value="services"
                className="rounded-lg text-xs sm:text-sm font-medium data-[state=active]:bg-white dark:data-[state=active]:bg-dark-card data-[state=active]:text-accent-terracotta dark:data-[state=active]:text-accent-terracotta data-[state=active]:shadow-sm transition-all duration-200"
              >
                Hizmetler
              </TabsTrigger>
              <TabsTrigger
                value="faqs"
                className="rounded-lg text-xs sm:text-sm font-medium data-[state=active]:bg-white dark:data-[state=active]:bg-dark-card data-[state=active]:text-primary-sage dark:data-[state=active]:text-primary-sage data-[state=active]:shadow-sm transition-all duration-200"
              >
                SSS
              </TabsTrigger>
              <TabsTrigger
                value="contacts"
                className="rounded-lg text-xs sm:text-sm font-medium data-[state=active]:bg-white dark:data-[state=active]:bg-dark-card data-[state=active]:shadow-sm transition-all duration-200"
              >
                İletişim
              </TabsTrigger>
              <TabsTrigger
                value="education"
                className="rounded-lg text-xs sm:text-sm font-medium data-[state=active]:bg-white dark:data-[state=active]:bg-dark-card data-[state=active]:text-primary-green dark:data-[state=active]:text-primary-sage data-[state=active]:shadow-sm transition-all duration-200"
              >
                Eğitim
              </TabsTrigger>
              <TabsTrigger
                value="experience"
                className="rounded-lg text-xs sm:text-sm font-medium data-[state=active]:bg-white dark:data-[state=active]:bg-dark-card data-[state=active]:text-primary-green dark:data-[state=active]:text-primary-sage data-[state=active]:shadow-sm transition-all duration-200"
              >
                Deneyim
              </TabsTrigger>
              <TabsTrigger
                value="certificates"
                className="rounded-lg text-xs sm:text-sm font-medium data-[state=active]:bg-white dark:data-[state=active]:bg-dark-card data-[state=active]:text-accent-terracotta dark:data-[state=active]:text-accent-terracotta data-[state=active]:shadow-sm transition-all duration-200"
              >
                Sertifikalar
              </TabsTrigger>
              <TabsTrigger
                value="seminars"
                className="rounded-lg text-xs sm:text-sm font-medium data-[state=active]:bg-white dark:data-[state=active]:bg-dark-card data-[state=active]:text-accent-terracotta dark:data-[state=active]:text-accent-terracotta data-[state=active]:shadow-sm transition-all duration-200"
              >
                Seminerler
              </TabsTrigger>
            </TabsList>

            <TabsContent value="blog" className="mt-0">
              <BlogPostsManager blogPosts={blogPosts} onRefresh={refreshBlogPosts} />
            </TabsContent>
            <TabsContent value="contacts" className="mt-0">
              <ContactSubmissionsManager contacts={contactSubmissions} onRefresh={refreshContacts} />
            </TabsContent>
            <TabsContent value="services" className="mt-0">
              <ServicesManager services={services} onRefresh={refreshServices} />
            </TabsContent>
            <TabsContent value="faqs" className="mt-0">
              <FaqsManager faqs={faqs} onRefresh={refreshFaqs} />
            </TabsContent>
            <TabsContent value="education" className="mt-0">
              <EducationManager educations={educations} onRefresh={refreshEducations} />
            </TabsContent>
            <TabsContent value="experience" className="mt-0">
              <ExperienceManager experiences={experiences} onRefresh={refreshExperiences} />
            </TabsContent>
            <TabsContent value="certificates" className="mt-0">
              <CertificateManager certificates={certificates} onRefresh={refreshCertificates} />
            </TabsContent>
            <TabsContent value="seminars" className="mt-0">
              <SeminarManager seminars={seminars} onRefresh={refreshSeminars} />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Toaster />
    </div>
  );
}
