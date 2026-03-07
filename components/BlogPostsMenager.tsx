'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Eye } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import createBlogPostAction from '@/actions/blog/createBlogPost';
import updateBlogPostAction from '@/actions/blog/updateBlogPost';

const blogPostSchema = z.object({
  title: z.string().min(1, 'Başlık gereklidir'),
  content: z.string().min(1, 'İçerik gereklidir'),
  excerpt: z.string().optional(),
  language: z.enum(['tr', 'en']),
  status: z.enum(['draft', 'published']),
});

type BlogPostFormData = z.infer<typeof blogPostSchema>;

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

interface BlogPostsManagerProps {
  blogPosts: BlogPost[];
  onRefresh: () => void;
}

export function BlogPostsManager({ blogPosts, onRefresh }: BlogPostsManagerProps) {
  const { toast } = useToast();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const createForm = useForm<BlogPostFormData>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      title: '',
      content: '',
      excerpt: '',
      language: 'tr',
      status: 'draft',
    },
  });

  const editForm = useForm<BlogPostFormData>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      title: '',
      content: '',
      excerpt: '',
      language: 'tr',
      status: 'draft',
    },
  });

  const handleCreate = async (data: BlogPostFormData) => {
    try {
      setIsCreating(true);
      await createBlogPostAction(data);
      toast({ description: 'Blog yazısı başarıyla oluşturuldu!' });
      createForm.reset();
      setIsCreateOpen(false);
      onRefresh();
    } catch (error) {
      toast({
        variant: 'destructive',
        description: 'Blog yazısı oluşturulurken hata oluştu.'
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleEdit = (post: BlogPost) => {
    setSelectedPost(post);
    editForm.reset({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt || '',
      language: post.language as 'tr' | 'en',
      status: post.status as 'draft' | 'published',
    });
    setIsEditOpen(true);
  };

  const handleUpdate = async (data: BlogPostFormData) => {
    if (!selectedPost) return;

    try {
      setIsUpdating(true);
      await updateBlogPostAction({ ...data, id: selectedPost.id });
      toast({ description: 'Blog yazısı başarıyla güncellendi!' });
      editForm.reset();
      setIsEditOpen(false);
      setSelectedPost(null);
      onRefresh();
    } catch (error) {
      toast({
        variant: 'destructive',
        description: 'Blog yazısı güncellenirken hata oluştu.'
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-none">Yayında</Badge>;
      case 'draft':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-none">Taslak</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getLanguageBadge = (language: string) => {
    return (
      <Badge variant="outline">
        {language === 'tr' ? '🇹🇷 TR' : '🇺🇸 EN'}
      </Badge>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Blog Yazıları Yönetimi</h3>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Yeni Yazı
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-dark-card dark:text-stone-100 border-none shadow-2xl">
            <DialogHeader>
              <DialogTitle>Yeni Blog Yazısı Oluştur</DialogTitle>
            </DialogHeader>
            <Form {...createForm}>
              <form onSubmit={createForm.handleSubmit(handleCreate)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={createForm.control}
                    name="language"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dil</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Dil seçin" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="tr">🇹🇷 Türkçe</SelectItem>
                            <SelectItem value="en">🇺🇸 İngilizce</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={createForm.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Durum</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Durum seçin" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="draft">Taslak</SelectItem>
                            <SelectItem value="published">Yayında</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={createForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Başlık</FormLabel>
                      <FormControl>
                        <Input placeholder="Blog yazısı başlığı" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={createForm.control}
                  name="excerpt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Özet (İsteğe bağlı)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Kısa özet..."
                          className="resize-none"
                          rows={2}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={createForm.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>İçerik</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Blog yazısı içeriği..."
                          className="resize-none"
                          rows={12}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsCreateOpen(false)}
                  >
                    İptal
                  </Button>
                  <Button type="submit" disabled={isCreating}>
                    {isCreating ? 'Oluşturuluyor...' : 'Oluştur'}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Başlık</TableHead>
                <TableHead>Dil</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>Oluşturulma</TableHead>
                <TableHead>İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogPosts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">
                    <div>
                      <div>{post.title}</div>
                      {post.excerpt && (
                        <div className="text-sm text-gray-500 mt-1 line-clamp-2">
                          {post.excerpt}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{getLanguageBadge(post.language)}</TableCell>
                  <TableCell>{getStatusBadge(post.status)}</TableCell>
                  <TableCell>
                    {new Date(post.createdAt).toLocaleDateString('tr-TR')}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(post)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-dark-card dark:text-stone-100 border-none shadow-2xl">
          <DialogHeader>
            <DialogTitle>Blog Yazısını Düzenle</DialogTitle>
          </DialogHeader>
          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit(handleUpdate)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={editForm.control}
                  name="language"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dil</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Dil seçin" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="tr">🇹🇷 Türkçe</SelectItem>
                          <SelectItem value="en">🇺🇸 İngilizce</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editForm.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Durum</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Durum seçin" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="draft">Taslak</SelectItem>
                          <SelectItem value="published">Yayında</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={editForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Başlık</FormLabel>
                    <FormControl>
                      <Input placeholder="Blog yazısı başlığı" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="excerpt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Özet (İsteğe bağlı)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Kısa özet..."
                        className="resize-none"
                        rows={2}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>İçerik</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Blog yazısı içeriği..."
                        className="resize-none"
                        rows={12}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditOpen(false)}
                >
                  İptal
                </Button>
                <Button type="submit" disabled={isUpdating}>
                  {isUpdating ? 'Güncelleniyor...' : 'Güncelle'}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
