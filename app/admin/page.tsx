'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Toaster } from '@/components/ui/toaster';
import { FileText, MessageSquare, Phone, HelpCircle, Plus, LogOut } from 'lucide-react';
import { BlogPostsManager } from '@/components/BlogPostsMenager';
import { ContactSubmissionsManager } from '@/components/ContactSubmissionsManager';
import { ServicesManager } from '@/components/ServicesManager';
import { FaqsManager } from '@/components/FaqsManager';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import loadBlogPostsAction from '@/actions/blog/loadBlogPosts';
import loadContactSubmissionsAction from '@/actions/contact/loadContactSubmissions';
import loadServicesAction from '@/actions/services/loadServices';
import loadFaqsAction from '@/actions/faqs/loadFaqs';

// Type definitions
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

export default function AdminPage() {
  const { isAuthenticated, username, isLoading: authLoading, logout } = useAuth();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [posts, contacts, servicesData, faqsData] = await Promise.all([
          loadBlogPostsAction(true),
          loadContactSubmissionsAction(),
          loadServicesAction(true),
          loadFaqsAction(true),
        ]);
        setBlogPosts(posts);
        setContactSubmissions(contacts);
        setServices(servicesData);
        setFaqs(faqsData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const refreshBlogPosts = () => {
    loadBlogPostsAction().then(setBlogPosts);
  };
  const refreshContacts = () => {
    loadContactSubmissionsAction().then(setContactSubmissions);
  };
  const refreshServices = () => {
    loadServicesAction().then(setServices);
  };
  const refreshFaqs = () => {
    loadFaqsAction().then(setFaqs);
  };

  const publishedPosts = blogPosts.filter(post => post.status === 'published').length;
  const draftPosts = blogPosts.filter(post => post.status === 'draft').length;
  const newContacts = contactSubmissions.filter(contact => contact.status === 'new').length;
  const activeServices = services.filter(service => service.isActive).length;

  // Authentication loading state
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Kimlik doğrulanıyor...</p>
        </div>
      </div>
    );
  }

  // Not authenticated - redirect will happen in useAuth hook
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-300 to-zinc-300 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-between items-start mb-4">
            <div></div>
            <Button
              variant="outline"
              onClick={logout}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Çıkış Yap
            </Button>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">İçerik Yönetim Paneli</h1>
          <p className="text-gray-600">Uzm. Klinik Psikolog Günnur Tekşen</p>
          <p className="text-sm text-gray-500">Hoş geldiniz, {username}</p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-blue-200 bg-blue-50/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-blue-700 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Blog Yazıları
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-2xl font-bold text-blue-900">{blogPosts.length}</div>
              <div className="flex gap-2 mt-2">
                <Badge variant="default" className="bg-green-100 text-green-800">
                  {publishedPosts} Yayında
                </Badge>
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                  {draftPosts} Taslak
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-purple-50/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-purple-700 flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Hizmetler
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-2xl font-bold text-purple-900">{services.length}</div>
              <div className="mt-2">
                <Badge variant="default" className="bg-purple-100 text-purple-800">
                  {activeServices} Aktif
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-200 bg-orange-50/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-orange-700 flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                SSS
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-2xl font-bold text-orange-900">{faqs.length}</div>
              <div className="mt-2">
                <Badge variant="default" className="bg-orange-100 text-orange-800">
                  Soru & Cevap
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-green-700 flex items-center gap-2">
                <Phone className="h-4 w-4" />
                İletişim
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-2xl font-bold text-green-900">{contactSubmissions.length}</div>
              <div className="mt-2">
                <Badge variant="destructive" className="bg-red-100 text-red-800">
                  {newContacts} Yeni Mesaj
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Card>
          <CardContent className="p-6">
            <Tabs defaultValue="blog" className="w-full">
              <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                <TabsTrigger value="blog">Blog Yazıları</TabsTrigger>
                <TabsTrigger value="services">Hizmetler</TabsTrigger>
                <TabsTrigger value="faqs">SSS</TabsTrigger>
                <TabsTrigger value="contacts">İletişim Mesajları</TabsTrigger>
              </TabsList>

              <TabsContent value="blog" className="mt-6 ">
                <BlogPostsManager
                  blogPosts={blogPosts}
                  onRefresh={refreshBlogPosts}
                />
              </TabsContent>

              <TabsContent value="contacts" className="mt-6">
                <ContactSubmissionsManager
                  contacts={contactSubmissions}
                  onRefresh={refreshContacts}
                />
              </TabsContent>

              <TabsContent value="services" className="mt-6">
                <ServicesManager
                  services={services}
                  onRefresh={refreshServices}
                />
              </TabsContent>

              <TabsContent value="faqs" className="mt-6">
                <FaqsManager
                  faqs={faqs}
                  onRefresh={refreshFaqs}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <Toaster />
    </div>
  );
}
