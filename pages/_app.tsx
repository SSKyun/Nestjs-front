import '@/styles/globals.css';
import { AppProps } from 'next/app';
import { SessionProvider, useSession } from 'next-auth/react';
import NavBar from './components/navbar';
import Footer from './components/footer';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {


  return (
    <SessionProvider session={session}>
      <script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
      <NavBar />
      <Component {...pageProps} />
      <Footer/>
    </SessionProvider>
  );
}