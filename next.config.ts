import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // firebase-admin은 서버에서만 실행되므로 클라이언트 번들에서 제외
  serverExternalPackages: ['firebase-admin'],
};

export default nextConfig;
