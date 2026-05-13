import type { Metadata, Viewport } from 'next';
import { SwRegister } from '@/components/sw-register';
import './globals.css';

export const metadata: Metadata = {
  title: '주차 관리',
  description: '다세대 주택 차량 알림 서비스',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: '주차 관리',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#2563EB',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body className="antialiased">
        {children}
        <SwRegister />
      </body>
    </html>
  );
}
