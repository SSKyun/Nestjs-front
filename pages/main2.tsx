import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.css';
import Header from '@/components/common/Header';
import { Fragment } from 'react';
import main from '/public/main.png';
import { useRouter } from 'next/router';
import Product from '@/components/Product';

// const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const router = useRouter();

  return (
    <Fragment>
      <Header />
      <div className="relative h-[850px] w-full overflow-hidden bg-[#f5f9fd]">
        <Image
          src={main}
          alt="main image"
          className="absolute left-[447px] top-[-310px] h-[1469px] w-[1825px] object-cover"
          placeholder="blur"
        />
        <p className="absolute left-[77px] top-[114px] w-[851px] text-left text-8xl font-bold text-black">
          <span className="w-[851px] text-left text-8xl font-bold text-black">
            The
          </span>
          <br />
          <span className="w-[851px] text-left text-8xl font-bold text-black">
            future of{' '}
          </span>
          <br />
          <span className="w-[851px] text-left text-8xl font-bold text-black">
            irrigation
          </span>
          <br />
          <span className="w-[851px] text-left text-8xl font-bold text-black">
            is now
          </span>
        </p>
        <p className="absolute left-[77px] top-[668px] text-left text-2xl font-bold text-black">
          <span className="text-left text-2xl font-bold text-black">
            나만의 스마트팜을
          </span>
          <br />
          <span className="text-left text-2xl font-bold text-black">
            만들어 보세요
          </span>
        </p>
        <div className="absolute left-[77px] top-[781px] h-[66px] w-[151px] overflow-hidden bg-[#282828]">
          <div className="absolute left-[201px] top-0 h-[66px] w-[151px] overflow-hidden bg-[#f5f9fd]">
            <p className="absolute left-9 top-[22px] text-left text-[15px] text-[#282828]">
              Contact us
            </p>
          </div>
          <button
            // onClick={() => router.push('/signin')}
            className="absolute left-9 top-[22px] text-left text-[15px] text-white"
          >
            Contact us
          </button>
        </div>
      </div>
      <Product />
    </Fragment>
  );
}
