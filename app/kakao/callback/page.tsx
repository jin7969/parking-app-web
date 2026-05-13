'use client';

import { useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { signInWithKakaoCode } from '@/lib/auth';
import { getUser } from '@/lib/firestore';
import { COLORS } from '@/constants/colors';

function KakaoCallbackInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const called = useRef(false);

  useEffect(() => {
    if (called.current) return;
    called.current = true;

    const code = searchParams.get('code');
    if (!code) {
      router.replace('/login');
      return;
    }

    signInWithKakaoCode(code)
      .then(async (user) => {
        const profile = await getUser(user.uid);
        if (!profile?.address) {
          router.replace('/onboarding');
        } else {
          router.replace('/vehicles');
        }
      })
      .catch(() => {
        router.replace('/login');
      });
  }, [router, searchParams]);

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center gap-4" style={{ backgroundColor: COLORS.bg }}>
      <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      <p className="text-sm" style={{ color: COLORS.textSub }}>카카오 로그인 처리 중...</p>
    </div>
  );
}

export default function KakaoCallbackPage() {
  return (
    <Suspense>
      <KakaoCallbackInner />
    </Suspense>
  );
}
