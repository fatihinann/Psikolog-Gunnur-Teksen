'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/lib/i18n';
import createContactSubmissionAction from '@/actions/contact/createContactSubmission';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Phone, Mail, MapPin, Send } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(1, 'Ad soyad gereklidir'),
  email: z.string().email('Geçerli bir e-posta adresi giriniz'),
  phone: z.string().optional(),
  message: z.string().min(1, 'Mesaj gereklidir'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactSection() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      setIsSubmitting(true);
      await createContactSubmissionAction(data);
      toast({ description: t('common.success') });
      form.reset();
    } catch (error) {
      toast({
        variant: 'destructive',
        description: t('common.error')
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants} className="space-8 grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="space-y-6">
              <a
                href="tel:+905356516747"
                className="flex items-center space-x-4 p-4 rounded-lg psychology-card hover:scale-105 transition-all duration-300 group"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <Phone className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{t('contact.phone')}</p>
                  <p className="text-lg font-semibold text-gray-900">+90 535 651 67 47</p>
                </div>
              </a>

              <a
                href="mailto:pskgunnurteksen@gmail.com"
                className="flex items-center space-x-4 p-4 rounded-lg psychology-card hover:scale-105 transition-all duration-300 group"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <Mail className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{t('contact.email')}</p>
                  <p className="text-lg font-semibold text-gray-900">pskgunnurteksen@gmail.com</p>
                </div>
              </a>

              <div className="flex items-start space-x-4 p-4 rounded-lg psychology-card">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{t('contact.address')}</p>
                  <p className="text-lg font-semibold text-gray-900 leading-relaxed">
                    {t('common.address')}
                  </p>
                </div>
              </div>
            </div>

            {/* Session Info */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">{t('session.informations.title')}</h4>
                <div className="space-y-3 text-gray-600">
                  <p>• <strong>{t('session.duration')}</strong> 50 {t('min')}</p>
                  <p>• <strong>{t('session.online')}</strong> {t('session.via')}</p>
                  <p>• <strong>{t('session.payment')}</strong> {t('session.payment.description')}</p>
                </div>
              </div>
          </motion.div>

          {/* Contact Form */}
          {/*<motion.div variants={itemVariants}>
              <Card className="psychology-card">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Mesaj Gönderin</h3>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t('contact.form.name')}</FormLabel>
                            <FormControl>
                              <Input placeholder="Adınız ve soyadınız" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t('contact.form.email')}</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="email@ornek.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t('contact.form.phone')} (İsteğe bağlı)</FormLabel>
                            <FormControl>
                              <Input placeholder="+90 5xx xxx xx xx" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t('contact.form.message')}</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Mesajınızı buraya yazın..." 
                                className="resize-none" 
                                rows={5}
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                        size="lg"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                            {t('contact.form.sending')}
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2" />
                            {t('contact.form.submit')}
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </motion.div>*/}

        </motion.div>
      </div>
    </section>
  );
}
