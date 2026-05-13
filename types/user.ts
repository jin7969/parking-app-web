export interface AppUser {
  kakaoId: string;
  nickname: string;
  profileImage: string;
  address: string | null;
  fcmToken: string | null;
  createdAt: unknown;
}
