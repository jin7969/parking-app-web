'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { COLORS } from '@/constants/colors';
import { getUser } from '@/lib/firestore';

const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY ?? '';
const REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI ?? '';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    setLoading(true);
    const authUrl =
      `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}` +
      `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code`;
    window.location.href = authUrl;
  };

  return (
    <main
      className="min-h-dvh flex flex-col px-6 pt-28 pb-14"
      style={{ backgroundColor: COLORS.bg }}
    >
      <div className="flex flex-col gap-3">
        <h1
          className="text-4xl font-extrabold tracking-tight"
          style={{ color: COLORS.text }}
        >
          주차 관리
        </h1>
        <p className="text-base leading-6" style={{ color: COLORS.textSub }}>
          내 차량을 등록하고 간편하게 관리하세요
        </p>
      </div>

      <div className="mt-auto">
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-4 rounded-2xl text-base font-bold flex items-center justify-center"
          style={{ backgroundColor: '#FEE500', color: '#3C1E1E' }}
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-[#3C1E1E] border-t-transparent rounded-full animate-spin" />
          ) : (
            '카카오로 시작하기'
          )}
        </button>
      </div>
    </main>
  );
}
