import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.css';
import Header from '@/components/common/Header';
import { Fragment, useEffect, useState } from 'react';
import main from '/public/main.png';
import { useRouter } from 'next/router';
import Product from '@/components/Product';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useLocation } from 'react-router-dom';

const inter = Inter({ subsets: ['latin'] });

export default function Main() {
  const router = useRouter();
 
  const { data, status } = useSession();

  return (
    <>
      <div className="flex h-screen w-screen flex-row ">
        <div className="z-50 w-1/4">
          <p className="mt-20 ml-28 h-[500px] ">
            <span className="text-left text-8xl font-bold">The</span>
            <br />
            <span className="text-left text-8xl font-bold">future of</span>
            <br />
            <span className="text-left text-8xl font-bold">irrigation</span>
            <br />
            <span className="text-left text-8xl font-bold">is now!</span>
          </p>
          <div className="ml-32 mt-32 h-[300px]">
            <p className="">
              <span className="text-left text-2xl font-bold">
                나만의 스마트팜을
              </span>
              <br />
              <span className="text-left text-2xl font-bold">
                만들어 보세요.
              </span>
            </p>
            <Link href="/login">
              <button
                // onClick={() => router.push('/signin')}
                className="mt-8 h-12 w-32 rounded-3xl bg-green-500 text-center text-xl text-white"
              >
                Contact us
              </button>
            </Link>
          </div>
        </div>
        <Image
          src={main}
          alt="Main Image"
          placeholder="blur"
          className="z-0 w-3/4"
        ></Image>
      </div>
      <Product />
    </>
  );
}
