'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Service {
  id: number;
  name: string;
  description: string;
  language: string;
  isActive: boolean;
}

interface ServicesManagerProps {
  services: Service[];
  onRefresh: () => void;
}

export function ServicesManager({ services, onRefresh }: ServicesManagerProps) {
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
        <h3 className="text-lg font-semibold">Hizmetler Yönetimi</h3>
        <div className="text-sm text-gray-500">
          Toplam {services.length} hizmet
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Hizmet Adı</TableHead>
                <TableHead>Açıklama</TableHead>
                <TableHead>Dil</TableHead>
                <TableHead>Durum</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((service) => (
                <TableRow key={service.id}>
                  <TableCell className="font-medium">{service.name}</TableCell>
                  <TableCell>
                    <div className="text-sm text-gray-600 line-clamp-3 max-w-md">
                      {service.description}
                    </div>
                  </TableCell>
                  <TableCell>{getLanguageBadge(service.language)}</TableCell>
                  <TableCell>{getStatusBadge(service.isActive)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
