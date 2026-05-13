import { NextRequest, NextResponse } from 'next/server';
import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(
      JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT ?? '{}')
    ),
  });
}

export async function POST(req: NextRequest) {
  try {
    const { code, redirectUri } = await req.json();
    if (!code || !redirectUri) {
      return NextResponse.json({ error: 'code와 redirectUri가 필요합니다' }, { status: 400 });
    }

    // 1. 인가코드 → 카카오 액세스 토큰
    const tokenRes = await fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: process.env.KAKAO_REST_API_KEY ?? '',
        redirect_uri: redirectUri,
        code,
      }),
    });
    const tokenData = await tokenRes.json();
    if (!tokenRes.ok) throw new Error(tokenData.error_description ?? '카카오 토큰 오류');

    // 2. 액세스 토큰 → 카카오 유저 정보
    const userRes = await fetch('https://kapi.kakao.com/v2/user/me', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });
    const kakaoUser = await userRes.json();

    // 3. Firebase Custom Token 발급
    const customToken = await admin.auth().createCustomToken(`kakao:${kakaoUser.id}`);

    return NextResponse.json({
      customToken,
      user: {
        id: String(kakaoUser.id),
        nickname: kakaoUser.kakao_account?.profile?.nickname ?? '',
        profileImageUrl: kakaoUser.kakao_account?.profile?.profile_image_url ?? '',
      },
    });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : '알 수 없는 오류';
    console.error('kakaoAuth error:', msg);
    return NextResponse.json({ error: '카카오 인증 중 오류가 발생했습니다' }, { status: 500 });
  }
}
