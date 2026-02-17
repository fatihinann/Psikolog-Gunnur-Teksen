'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

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
  const getLanguageBadge = (language: string) => {
    return (
      <Badge variant="outline">
        {language === 'tr' ? '🇹🇷 TR' : '🇺🇸 EN'}
      </Badge>
    );
  };

  const getStatusBadge = (isActive: boolean) => {
    return isActive ? (
      <Badge variant="default" className="bg-green-100 text-green-800">Aktif</Badge>
    ) : (
      <Badge variant="secondary" className="bg-gray-100 text-gray-800">Pasif</Badge>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">SSS Yönetimi</h3>
        <div className="text-sm text-gray-500">
          Toplam {faqs.length} soru-cevap
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sıra</TableHead>
                <TableHead>Soru</TableHead>
                <TableHead>Cevap</TableHead>
                <TableHead>Dil</TableHead>
                <TableHead>Durum</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {faqs.map((faq) => (
                <TableRow key={faq.id}>
                  <TableCell>{faq.orderNum}</TableCell>
                  <TableCell className="font-medium">
                    <div className="max-w-xs">{faq.question}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-gray-600 line-clamp-3 max-w-md">
                      {faq.answer}
                    </div>
                  </TableCell>
                  <TableCell>{getLanguageBadge(faq.language)}</TableCell>
                  <TableCell>{getStatusBadge(faq.isActive)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
