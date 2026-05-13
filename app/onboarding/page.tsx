'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { COLORS } from '@/constants/colors';
import { auth } from '@/lib/firebase';
import { updateUser } from '@/lib/firestore';

export default function OnboardingPage() {
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim()) {
      setError('주소를 입력해주세요');
      return;
    }
    try {
      setLoading(true);
      const uid = auth.currentUser?.uid;
      if (!uid) throw new Error();
      await updateUser(uid, { address: address.trim() });
      router.replace('/vehicles');
    } catch {
      setError('오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-dvh flex flex-col px-6 pt-20 gap-4" style={{ backgroundColor: COLORS.bg }}>
      <h1 className="text-[28px] font-extrabold tracking-tight" style={{ color: COLORS.text }}>
        주소를 입력해주세요
      </h1>
      <p className="text-[15px] -mt-2" style={{ color: COLORS.textSub }}>
        주차 위치 관리에 사용됩니다
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
        <input
          type="text"
          placeholder="예: 서울시 강남구 테헤란로 123"
          value={address}
          onChange={(e) => { setAddress(e.target.value); setError(''); }}
          autoFocus
          className="w-full px-4 py-4 rounded-2xl text-base outline-none border-[1.5px]"
          style={{
            backgroundColor: COLORS.card,
            borderColor: error ? COLORS.danger : COLORS.border,
            color: COLORS.text,
          }}
        />
        {error && <p className="text-sm" style={{ color: COLORS.danger }}>{error}</p>}

        <button
          type="submit"
          disabled={!address.trim() || loading}
          className="w-full py-4 rounded-2xl text-base font-bold text-white flex items-center justify-center transition-opacity"
          style={{
            backgroundColor: COLORS.primary,
            opacity: !address.trim() || loading ? 0.4 : 1,
          }}
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            '시작하기'
          )}
        </button>
      </form>
    </main>
  );
}
