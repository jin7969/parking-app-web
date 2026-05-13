import { signInWithCustomToken, signOut as firebaseSignOut } from 'firebase/auth';

import { auth } from '@/lib/firebase';
import { saveUser } from '@/lib/firestore';

export async function signInWithKakaoCode(code: string) {
  const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI ?? '';

  const res = await fetch('/api/kakao-auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, redirectUri }),
  });

  if (!res.ok) throw new Error('카카오 인증 서버 오류');
  const { customToken, user: kakaoUser } = await res.json();

  const { user } = await signInWithCustomToken(auth, customToken);

  await saveUser(user.uid, {
    kakaoId: kakaoUser.id,
    nickname: kakaoUser.nickname ?? '',
    profileImage: kakaoUser.profileImageUrl ?? '',
  });

  return user;
}

export async function signOutAll() {
  await firebaseSignOut(auth);
}
