'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import createFaqAction from '@/actions/faqs/createFaq';
import updateFaqAction from '@/actions/faqs/updateFaq';
import deleteFaqAction from '@/actions/faqs/deleteFaq';

const faqSchema = z.object({
  question: z.string().min(1, 'Soru gereklidir'),
  answer: z.string().min(1, 'Cevap gereklidir'),
  language: z.enum(['tr', 'en']),
  orderNum: z.number().int(),
  isActive: z.boolean(),
});

type FaqFormData = z.infer<typeof faqSchema>;

interface FAQ {
  id: number;
  question: string;
  answer: string;
  language: string;
  orderNum: number;
  isActive: boolean;
}

interface FaqsManagerProps {
  faqs: FAQ[];
  onRefresh: () => void;
}

export function FaqsManager({ faqs, onRefresh }: FaqsManagerProps) {
  const { toast } = useToast();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState<FAQ | null>(null);

  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const createForm = useForm<FaqFormData>({
    resolver: zodResolver(faqSchema),
    defaultValues: {
      question: '',
      answer: '',
      language: 'tr',
      orderNum: 0,
      isActive: true,
    },
  });

  const editForm = useForm<FaqFormData>({
    resolver: zodResolver(faqSchema),
    defaultValues: {
      question: '',
      answer: '',
      language: 'tr',
      orderNum: 0,
      isActive: true,
    },
  });

  const handleCreate = async (data: FaqFormData) => {
    try {
      setIsCreating(true);
      await createFaqAction(data);
      toast({ description: 'SSS başarıyla oluşturuldu!' });
      createForm.reset();
      setIsCreateOpen(false);
      onRefresh();
    } catch (error) {
      toast({
        variant: 'destructive',
        description: 'SSS oluşturulurken hata oluştu.'
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleEdit = (faq: FAQ) => {
    setSelectedFaq(faq);
    editForm.reset({
      question: faq.question,
      answer: faq.answer,
      language: faq.language as 'tr' | 'en',
      orderNum: faq.orderNum,
      isActive: faq.isActive,
    });
    setIsEditOpen(true);
  };

  const handleUpdate = async (data: FaqFormData) => {
    if (!selectedFaq) return;

    try {
      setIsUpdating(true);
      await updateFaqAction({ ...data, id: selectedFaq.id });
      toast({ description: 'SSS başarıyla güncellendi!' });
      editForm.reset();
      setIsEditOpen(false);
      setSelectedFaq(null);
      onRefresh();
    } catch (error) {
      toast({
        variant: 'destructive',
        description: 'SSS güncellenirken hata oluştu.'
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteClick = (faq: FAQ) => {
    setSelectedFaq(faq);
    setIsDeleteOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedFaq) return;
    try {
      setIsDeleting(true);
      await deleteFaqAction(selectedFaq.id);
      toast({ description: 'SSS başarıyla silindi!' });
      setIsDeleteOpen(false);
      setSelectedFaq(null);
      onRefresh();
    } catch (error) {
      toast({
        variant: 'destructive',
        description: 'SSS silinirken hata oluştu.'
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const getLanguageBadge = (language: string) => {
    return (
      <Badge variant="outline">
        {language === 'tr' ? '🇹🇷 TR' : '🇺🇸 EN'}
      </Badge>
    );
  };

  const getStatusBadge = (isActive: boolean) => {
    return isActive ? (
      <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-none">Aktif</Badge>
    ) : (
      <Badge variant="secondary" className="bg-gray-100 text-gray-800 dark:bg-stone-800 dark:text-stone-400 border-none">Pasif</Badge>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">SSS Yönetimi</h3>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Yeni Soru
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl bg-white dark:bg-dark-card dark:text-stone-100 border-none shadow-2xl">
            <DialogHeader>
              <DialogTitle>Yeni SSS Oluştur</DialogTitle>
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
                    name="orderNum"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sıralama</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={createForm.control}
                  name="question"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Soru</FormLabel>
                      <FormControl>
                        <Input placeholder="Soru metni" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={createForm.control}
                  name="answer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cevap</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Cevap metni..."
                          className="resize-none"
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={createForm.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>Aktif mi?</FormLabel>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
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
                <TableHead className="w-16">Sıra</TableHead>
                <TableHead>Soru / Cevap</TableHead>
                <TableHead className="w-24">Dil</TableHead>
                <TableHead className="w-24">Durum</TableHead>
                <TableHead className="w-32">İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {faqs.map((faq) => (
                <TableRow key={faq.id}>
                  <TableCell>{faq.orderNum}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium text-stone-900 dark:text-stone-100">{faq.question}</div>
                      <div className="text-sm text-stone-500 dark:text-stone-400 line-clamp-2">{faq.answer}</div>
                    </div>
                  </TableCell>
                  <TableCell>{getLanguageBadge(faq.language)}</TableCell>
                  <TableCell>{getStatusBadge(faq.isActive)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(faq)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteClick(faq)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
                      >
                        <Trash2 className="h-4 w-4" />
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
        <DialogContent className="max-w-2xl bg-white dark:bg-dark-card dark:text-stone-100 border-none shadow-2xl">
          <DialogHeader>
            <DialogTitle>SSS Düzenle</DialogTitle>
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
                  name="orderNum"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sıralama</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={editForm.control}
                name="question"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Soru</FormLabel>
                    <FormControl>
                      <Input placeholder="Soru metni" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="answer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cevap</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Cevap metni..."
                        className="resize-none"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <FormLabel>Aktif mi?</FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
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

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="bg-white dark:bg-dark-card border-none text-stone-900 dark:text-stone-100">
          <DialogHeader>
            <DialogTitle>Emin misiniz?</DialogTitle>
            <DialogDescription>
              Bu soru ve cevabı kalıcı olarak silinecektir. Bu işlem geri alınamaz.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>İptal</Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? 'Siliniyor...' : 'Sil'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
