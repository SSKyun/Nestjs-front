import '@/styles/globals.css';
import { AppProps } from 'next/app';
import { SessionProvider, useSession } from 'next-auth/react';
import NavBar2 from './components/navbar2';
import Footer from './components/footer';
import { Suspense } from 'react';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {


  return (
    <SessionProvider session={session}>
      <Suspense fallback={<div>Loading...</div>}></Suspense>
      <script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
      <NavBar2 />
      <Component {...pageProps} />
    </SessionProvider>
  );
}