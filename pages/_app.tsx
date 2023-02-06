import '@/styles/globals.css';
import { AppProps } from 'next/app';
import { SessionProvider, useSession } from 'next-auth/react';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  // OAuth 인증 후에 인증 정보를 session에 적용하기 위해, Provider로 감싸주기
  return (
    <SessionProvider session={session}>
      {/* {Component.auth ? ( */}
      {/* <Auth> */}
      <Component {...pageProps} />
      {/* </Auth> */}
      {/* ) : ( */}
      {/* <Component {...pageProps} /> */}
      {/* )} */}
    </SessionProvider>
  );
}

// function Auth({ children }) {
//   const { status } = useSession();

//   if (status === 'loading') {
//     return <div>Loading...</div>;
//   }
//   return children;
// }
