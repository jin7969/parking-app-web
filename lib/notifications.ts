import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { updateUser } from '@/lib/firestore';

export async function registerPushToken(uid: string) {
  if (typeof window === 'undefined') return;
  if (!('Notification' in window)) return;

  try {
    const { initializeApp, getApps } = await import('firebase/app');
    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    };
    const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
    const messaging = getMessaging(app);

    const permission = await Notification.requestPermission();
    if (permission !== 'granted') return;

    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
    });

    if (token) {
      await updateUser(uid, { fcmToken: token });
    }

    onMessage(messaging, (payload) => {
      if (payload.notification) {
        new Notification(payload.notification.title ?? '알림', {
          body: payload.notification.body,
        });
      }
    });
  } catch (e) {
    console.error('FCM 토큰 등록 실패:', e);
  }
}
