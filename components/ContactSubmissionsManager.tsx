'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Eye, Mail, Phone, MessageSquare, Check, Clock, Trash2 } from 'lucide-react';
import updateContactStatusAction from '@/actions/contact/updateContactStatus';
import deleteContactSubmissionAction from '@/actions/contact/deleteContactSubmission';

interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  status: string;
  createdAt: Date;
}

interface ContactSubmissionsManagerProps {
  contacts: ContactSubmission[];
  onRefresh: () => void;
}

export function ContactSubmissionsManager({ contacts, onRefresh }: ContactSubmissionsManagerProps) {
  const { toast } = useToast();
  const [selectedContact, setSelectedContact] = useState<ContactSubmission | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);

  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusUpdate = async (contactId: number, newStatus: string) => {
    try {
      setIsUpdating(true);
      await updateContactStatusAction({ id: contactId, status: newStatus });
      toast({
        description: `İletişim durumu "${newStatus}" olarak güncellendi!`
      });
      onRefresh();
    } catch (error) {
      toast({
        variant: 'destructive',
        description: 'Durum güncellenirken hata oluştu.'
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (contactId: number) => {
    if (!window.confirm('Bu mesajı silmek istediğinizden emin misiniz?')) return;

    try {
      setIsUpdating(true);
      await deleteContactSubmissionAction(contactId);
      toast({
        description: 'Mesaj başarıyla silindi!'
      });
      onRefresh();
    } catch (error) {
      toast({
        variant: 'destructive',
        description: 'Mesaj silinirken hata oluştu.'
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleView = (contact: ContactSubmission) => {
    setSelectedContact(contact);
    setIsViewOpen(true);

    // Mark as read if it's new
    if (contact.status === 'new') {
      handleStatusUpdate(contact.id, 'read');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge variant="destructive" className="bg-red-100 text-red-800 dark:bg-red-950/30 dark:text-red-400 border-none">Yeni</Badge>;
      case 'read':
        return <Badge variant="default" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-none">Okundu</Badge>;
      case 'responded':
        return <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-none">Yanıtlandı</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new':
        return <MessageSquare className="h-4 w-4" />;
      case 'read':
        return <Eye className="h-4 w-4" />;
      case 'responded':
        return <Check className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">İletişim Mesajları</h3>
        <div className="text-sm text-gray-500">
          Toplam {contacts.length} mesaj
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ad Soyad</TableHead>
                <TableHead>İletişim</TableHead>
                <TableHead>Mesaj Önizleme</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>Tarih</TableHead>
                <TableHead>İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.map((contact) => (
                <TableRow key={contact.id} className={contact.status === 'new' ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(contact.status)}
                      {contact.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-3 w-3" />
                        {contact.email}
                      </div>
                      {contact.phone && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="h-3 w-3" />
                          {contact.phone}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-gray-600 line-clamp-2 max-w-xs">
                      {contact.message}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(contact.status)}</TableCell>
                  <TableCell>
                    {new Date(contact.createdAt).toLocaleDateString('tr-TR')}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleView(contact)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {contact.status !== 'responded' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleStatusUpdate(contact.id, 'responded')}
                          disabled={isUpdating}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(contact.id)}
                        disabled={isUpdating}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
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

      {/* View Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-2xl bg-white dark:bg-dark-card dark:text-stone-100 border-none shadow-2xl">
          <DialogHeader>
            <DialogTitle>İletişim Mesajı Detayları</DialogTitle>
          </DialogHeader>
          {selectedContact && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Ad Soyad</label>
                  <p className="text-sm">{selectedContact.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Durum</label>
                  <div className="mt-1">{getStatusBadge(selectedContact.status)}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">E-posta</label>
                  <p className="text-sm">{selectedContact.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Telefon</label>
                  <p className="text-sm">{selectedContact.phone || 'Belirtilmedi'}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Mesaj</label>
                <div className="mt-1 p-3 bg-stone-50 dark:bg-dark-surface/50 rounded-lg">
                  <p className="text-sm whitespace-pre-wrap text-stone-900 dark:text-stone-100">{selectedContact.message}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Gönderim Tarihi</label>
                <p className="text-sm">
                  {new Date(selectedContact.createdAt).toLocaleString('tr-TR')}
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsViewOpen(false)}
                >
                  Kapat
                </Button>
                {selectedContact.status !== 'responded' && (
                  <Button
                    onClick={() => {
                      handleStatusUpdate(selectedContact.id, 'responded');
                      setIsViewOpen(false);
                    }}
                    disabled={isUpdating}
                  >
                    Yanıtlandı Olarak İşaretle
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
