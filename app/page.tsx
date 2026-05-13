'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { getUser } from '@/lib/firestore';

export default function RootPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace('/login');
      return;
    }
    getUser(user.uid).then((profile) => {
      if (!profile?.address) {
        router.replace('/onboarding');
      } else {
        router.replace('/vehicles');
      }
    });
  }, [user, loading, router]);

  return (
    <div className="min-h-dvh flex items-center justify-center" style={{ backgroundColor: '#F2F4F7' }}>
      <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
