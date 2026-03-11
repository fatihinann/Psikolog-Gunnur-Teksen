'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useTranslation } from '@/lib/i18n';
import { Loader2, CheckCircle2, AlertCircle, Send } from 'lucide-react';
import { submitContactForm } from '@/actions/contact/submitContactForm';
import { useToast } from '@/hooks/use-toast';

const contactFormSchema = z.object({
  name: z.string().min(2, "Ad soyad en az 2 karakter olmalıdır").max(100),
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
  phone: z.string().min(10, "Telefon numarası en az 10 karakter olmalıdır"),
  birthDate: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, "Doğum tarihi GG/AA/YYYY formatında olmalıdır"),
  message: z.string().min(10, "Şikayet özeti en az 10 karakter olmalıdır").max(2000),
  website: z.string().max(0, { message: "Bot detected" }).optional(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export function ContactForm() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      birthDate: '',
      message: '',
      website: '',
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      const result = await submitContactForm(data);
      if (result.success) {
        setIsSuccess(true);
        reset();
        toast({
          title: "Başarılı",
          description: result.message,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Hata",
          description: result.message,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Hata",
        description: "Beklenmedik bir hata oluştu. Lütfen daha sonra tekrar deneyin.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center p-12 text-center minimalist-card border-primary-sage/20 bg-primary-sage/5"
      >
        <div className="w-16 h-16 rounded-full bg-primary-sage/20 flex items-center justify-center mb-6">
          <CheckCircle2 className="w-8 h-8 text-primary-sage" />
        </div>
        <h3 className="text-2xl font-serif font-medium text-stone-900 dark:text-stone-100 mb-4">
          Mesajınız Alındı
        </h3>
        <p className="text-stone-600 dark:text-stone-400 max-w-sm mb-8">
          Başvurunuz başarıyla iletildi. En kısa sürede sizinle iletişime geçeceğiz.
        </p>
        <Button
          variant="outline"
          onClick={() => setIsSuccess(false)}
          className="rounded-xl px-8 border-primary-sage/30 hover:bg-primary-sage/10"
        >
          Yeni Mesaj Gönder
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="minimalist-card p-8 md:p-12 relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary-sage/5 rounded-full -mr-16 -mt-16 pointer-events-none" />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
        <div className="hidden">
          <Input {...register('website')} tabIndex={-1} autoComplete="off" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-stone-700 dark:text-stone-300">
              Ad Soyad
            </Label>
            <Input
              id="name"
              placeholder="Adınız ve soyadınız"
              className={`bg-stone-50/50 dark:bg-dark-muted/20 border-stone-200 dark:border-dark-muted/50 rounded-xl focus:ring-primary-sage/20 ${errors.name ? 'border-red-400' : ''
                }`}
              {...register('name')}
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.name.message}
              </p>
            )}
          </div>

          {/* Birth Date Field */}
          <div className="space-y-2">
            <Label htmlFor="birthDate" className="text-sm font-medium text-stone-700 dark:text-stone-300">
              Doğum Tarihi
            </Label>
            <Input
              id="birthDate"
              placeholder="GG/AA/YYYY"
              className={`bg-stone-50/50 dark:bg-dark-muted/20 border-stone-200 dark:border-dark-muted/50 rounded-xl focus:ring-primary-sage/20 ${errors.birthDate ? 'border-red-400' : ''
                }`}
              {...register('birthDate')}
            />
            {errors.birthDate && (
              <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.birthDate.message}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-stone-700 dark:text-stone-300">
              E-posta
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="ornek@mail.com"
              className={`bg-stone-50/50 dark:bg-dark-muted/20 border-stone-200 dark:border-dark-muted/50 rounded-xl focus:ring-primary-sage/20 ${errors.email ? 'border-red-400' : ''
                }`}
              {...register('email')}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone Field */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium text-stone-700 dark:text-stone-300">
              Telefon
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="05XX XXX XX XX"
              className={`bg-stone-50/50 dark:bg-dark-muted/20 border-stone-200 dark:border-dark-muted/50 rounded-xl focus:ring-primary-sage/20 ${errors.phone ? 'border-red-400' : ''
                }`}
              {...register('phone')}
            />
            {errors.phone && (
              <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.phone.message}
              </p>
            )}
          </div>
        </div>

        {/* Message Field */}
        <div className="space-y-2">
          <Label htmlFor="message" className="text-sm font-medium text-stone-700 dark:text-stone-300">
            Şikayet Özeti
          </Label>
          <Textarea
            id="message"
            placeholder="Lütfen şikayetinizden kısaca bahseder misiniz?"
            className={`min-h-[150px] bg-stone-50/50 dark:bg-dark-muted/20 border-stone-200 dark:border-dark-muted/50 rounded-xl focus:ring-primary-sage/20 resize-none ${errors.message ? 'border-red-400' : ''
              }`}
            {...register('message')}
          />
          {errors.message && (
            <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.message.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary-green hover:bg-primary-green/90 text-white rounded-xl py-6 font-medium shadow-lg shadow-primary-green/10 transition-all duration-300"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Gönderiliyor...
            </>
          ) : (
            <>
              <Send className="w-5 h-5 mr-2" />
              Mesaj Gönder
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
