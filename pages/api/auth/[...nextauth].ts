import NextAuth from 'next-auth';
import KakaoProvider from 'next-auth/providers/kakao';
export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: 'secret',
  },
  // 원하는 소셜 provider를 같은 방식으로 추가
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: '/login',
    signOut: '/signOut',
    error: '/error',
  },
});
