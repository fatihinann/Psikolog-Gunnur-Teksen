'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Lock, User, Eye, EyeOff } from 'lucide-react';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    if (!username.trim() || !password.trim()) {
      setLoginError('Kullanıcı adı ve şifre gereklidir.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        sessionStorage.setItem('adminAuthenticated', 'true');
        sessionStorage.setItem('adminUsername', username);
        toast({ description: 'Başarıyla giriş yapıldı!' });
        router.push('/admin');
      } else {
        setLoginError(data.message || 'Giriş başarısız!');
        if (data.retryAfter) {
          toast({
            variant: 'destructive',
            description: `Çok fazla başarısız deneme. Lütfen ${Math.ceil(data.retryAfter / 60)} dakika sonra tekrar deneyin.`
          });
        }
      }
    } catch (error) {
      setLoginError('Sunucu hatası oluştu. Lütfen daha sonra tekrar deneyin.');
      toast({
        variant: 'destructive',
        description: 'Bağlantı hatası oluştu. İnternet bağlantınızı kontrol edin.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-base flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-dark-forest/25 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent-terracotta/8 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-sm">
        {/* Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-dark-forest/60 border border-primary-sage/20 mb-5 shadow-xl shadow-dark-forest/30">
            <Lock className="h-6 w-6 text-primary-sage" />
          </div>
          <h1 className="text-2xl font-serif font-light text-stone-100 tracking-tight mb-1">
            Yönetim Paneli
          </h1>
          <p className="text-sm text-stone-500 font-light">
            Uzm. Klinik Psikolog Günnur Tekşen
          </p>
        </div>

        {/* Card */}
        <div className="bg-dark-surface border border-dark-muted/50 rounded-2xl p-7 shadow-2xl shadow-black/50">
          <form onSubmit={handleSubmit} className="space-y-5">
            {loginError && (
              <div className="p-3 rounded-xl bg-red-950/30 border border-red-900/30 text-red-400 text-sm font-light">
                {loginError}
              </div>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="username" className="text-stone-400 text-xs font-semibold uppercase tracking-widest">
                Kullanıcı Adı
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-500" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Kullanıcı adınızı girin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={cn(
                    "pl-10 bg-dark-muted/40 border-dark-muted/60 text-stone-200 placeholder:text-stone-600 rounded-xl focus:border-primary-sage/40 focus:ring-primary-sage/20",
                    loginError && "border-red-900/60"
                  )}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-stone-400 text-xs font-semibold uppercase tracking-widest">
                Şifre
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-500" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Şifrenizi girin"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={cn(
                    "pl-10 pr-10 bg-dark-muted/40 border-dark-muted/60 text-stone-200 placeholder:text-stone-600 rounded-xl focus:border-primary-sage/40 focus:ring-primary-sage/20",
                    loginError && "border-red-900/60"
                  )}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300 transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary-green hover:bg-primary-green/90 dark:bg-dark-forest dark:hover:bg-dark-forest/80 text-white rounded-xl py-6 font-medium shadow-lg shadow-primary-green/20 dark:shadow-dark-forest/30 transition-all duration-300 hover:scale-[1.02] mt-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Giriş yapılıyor...
                </span>
              ) : 'Giriş Yap'}
            </Button>
          </form>

          <p className="mt-5 text-center text-xs text-stone-600 font-light">
            Bu sayfa yalnızca yetkili personel içindir.
          </p>
        </div>
      </div>
    </div>
  );
}
