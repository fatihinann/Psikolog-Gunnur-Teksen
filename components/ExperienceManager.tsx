'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import createExperienceAction from '@/actions/experience/createExperience';
import updateExperienceAction from '@/actions/experience/updateExperience';
import deleteExperienceAction from '@/actions/experience/deleteExperience';

const experienceSchema = z.object({
    company: z.string().min(1, 'Kurum adı gereklidir'),
    position: z.string().min(1, 'Pozisyon gereklidir'),
    date: z.string().min(1, 'Tarih gereklidir'),
    description: z.string().min(1, 'Açıklama gereklidir'),
    language: z.enum(['tr', 'en']),
    orderNum: z.number().int().min(0),
    isActive: z.boolean(),
});

type ExperienceFormData = z.infer<typeof experienceSchema>;

interface Experience {
    id: number;
    company: string;
    position: string;
    date: string;
    description: string;
    language: string;
    orderNum: number;
    isActive: boolean;
}

interface ExperienceManagerProps {
    experiences: Experience[];
    onRefresh: () => void;
}

export function ExperienceManager({ experiences, onRefresh }: ExperienceManagerProps) {
    const { toast } = useToast();
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Experience | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const createForm = useForm<ExperienceFormData>({
        resolver: zodResolver(experienceSchema) as any,
        defaultValues: { company: '', position: '', date: '', description: '', language: 'tr', orderNum: 0, isActive: true },
    });

    const editForm = useForm<ExperienceFormData>({
        resolver: zodResolver(experienceSchema) as any,
        defaultValues: { company: '', position: '', date: '', description: '', language: 'tr', orderNum: 0, isActive: true },
    });

    const handleCreate = async (data: ExperienceFormData) => {
        try {
            setIsCreating(true);
            await createExperienceAction(data);
            toast({ description: 'Deneyim bilgisi başarıyla eklendi!' });
            createForm.reset();
            setIsCreateOpen(false);
            onRefresh();
        } catch {
            toast({ variant: 'destructive', description: 'Deneyim bilgisi eklenirken hata oluştu.' });
        } finally {
            setIsCreating(false);
        }
    };

    const handleEdit = (item: Experience) => {
        setSelectedItem(item);
        editForm.reset({
            company: item.company,
            position: item.position,
            date: item.date,
            description: item.description,
            language: item.language as 'tr' | 'en',
            orderNum: Number(item.orderNum),
            isActive: item.isActive,
        });
        setIsEditOpen(true);
    };

    const handleUpdate = async (data: ExperienceFormData) => {
        if (!selectedItem) return;
        try {
            setIsUpdating(true);
            await updateExperienceAction({ ...data, id: selectedItem.id });
            toast({ description: 'Deneyim bilgisi başarıyla güncellendi!' });
            setIsEditOpen(false);
            setSelectedItem(null);
            onRefresh();
        } catch {
            toast({ variant: 'destructive', description: 'Güncelleme sırasında hata oluştu.' });
        } finally {
            setIsUpdating(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Bu deneyim bilgisini silmek istediğinize emin misiniz?')) return;
        try {
            await deleteExperienceAction(id);
            toast({ description: 'Deneyim bilgisi silindi.' });
            onRefresh();
        } catch {
            toast({ variant: 'destructive', description: 'Silme sırasında hata oluştu.' });
        }
    };

    const renderFormFields = (form: UseFormReturn<ExperienceFormData>) => (
        <>
            <div className="grid grid-cols-2 gap-4">
                <FormField control={form.control} name="language" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Dil</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl><SelectTrigger><SelectValue placeholder="Dil seçin" /></SelectTrigger></FormControl>
                            <SelectContent>
                                <SelectItem value="tr">🇹🇷 Türkçe</SelectItem>
                                <SelectItem value="en">🇺🇸 İngilizce</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="orderNum" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Sıra No</FormLabel>
                        <FormControl><Input type="number" min={0} {...field} value={field.value ?? 0} onChange={(e) => field.onChange(e.target.valueAsNumber || 0)} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
            </div>
            <FormField control={form.control} name="company" render={({ field }) => (
                <FormItem>
                    <FormLabel>Kurum / Şirket</FormLabel>
                    <FormControl><Input placeholder="Kurum adı" {...field} /></FormControl>
                    <FormMessage />
                </FormItem>
            )} />
            <div className="grid grid-cols-2 gap-4">
                <FormField control={form.control} name="position" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Pozisyon</FormLabel>
                        <FormControl><Input placeholder="Klinik Psikolog" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="date" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Tarih</FormLabel>
                        <FormControl><Input placeholder="2020 - Devam" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
            </div>
            <FormField control={form.control} name="description" render={({ field }) => (
                <FormItem>
                    <FormLabel>Açıklama (her satır ayrı madde olarak gösterilir)</FormLabel>
                    <FormControl>
                        <Textarea placeholder="Bireysel terapi seansları&#10;Aile danışmanlığı&#10;Çocuk psikolojisi" className="resize-none" rows={5} {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )} />
            <FormField control={form.control} name="isActive" render={({ field }) => (
                <FormItem className="flex items-center gap-3">
                    <FormLabel>Aktif</FormLabel>
                    <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                </FormItem>
            )} />
        </>
    );

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Deneyim Bilgileri</h3>
                <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                    <DialogTrigger asChild>
                        <Button><Plus className="h-4 w-4 mr-2" />Yeni Deneyim</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-dark-card border-none shadow-2xl">
                        <DialogHeader><DialogTitle>Yeni Deneyim Bilgisi Ekle</DialogTitle></DialogHeader>
                        <Form {...createForm}>
                            <form onSubmit={createForm.handleSubmit(handleCreate)} className="space-y-4">
                                {renderFormFields(createForm)}
                                <div className="flex justify-end gap-2">
                                    <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>İptal</Button>
                                    <Button type="submit" disabled={isCreating}>{isCreating ? 'Ekleniyor...' : 'Ekle'}</Button>
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
                                <TableHead>Kurum</TableHead>
                                <TableHead>Pozisyon</TableHead>
                                <TableHead>Tarih</TableHead>
                                <TableHead>Dil</TableHead>
                                <TableHead>Durum</TableHead>
                                <TableHead>İşlemler</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {experiences.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">{item.company}</TableCell>
                                    <TableCell>{item.position}</TableCell>
                                    <TableCell>{item.date}</TableCell>
                                    <TableCell><Badge variant="outline">{item.language === 'tr' ? '🇹🇷 TR' : '🇺🇸 EN'}</Badge></TableCell>
                                    <TableCell>
                                        {item.isActive
                                            ? <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-none">Aktif</Badge>
                                            : <Badge variant="secondary" className="bg-gray-100 text-gray-800 dark:bg-stone-800 dark:text-stone-400 border-none">Pasif</Badge>}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm" onClick={() => handleEdit(item)}><Edit className="h-4 w-4" /></Button>
                                            <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700" onClick={() => handleDelete(item.id)}><Trash2 className="h-4 w-4" /></Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-dark-card border-none shadow-2xl">
                    <DialogHeader><DialogTitle>Deneyim Bilgisi Düzenle</DialogTitle></DialogHeader>
                    <Form {...editForm}>
                        <form onSubmit={editForm.handleSubmit(handleUpdate)} className="space-y-4">
                            {renderFormFields(editForm)}
                            <div className="flex justify-end gap-2">
                                <Button type="button" variant="outline" onClick={() => setIsEditOpen(false)}>İptal</Button>
                                <Button type="submit" disabled={isUpdating}>{isUpdating ? 'Güncelleniyor...' : 'Güncelle'}</Button>
                            </div>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
