import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Image from 'next/image';
//import logoImage from '/public/logo.webp';

const LOGOUT_URL = 'http://localhost:8000/auth/logout';

const HeaderComponent = (props: any) => {
  const { data, status } = useSession();
  const router = useRouter();
  const [user2, setUser] = useState('');
  let localLogin: any;
  let kakaoLogin: any = data?.user?.name;
  if (typeof window !== 'undefined') {
    // Perform localStorage action
    localLogin = localStorage.getItem('name');
    localStorage.setItem('kakao-Name', kakaoLogin);
  }
  const user = router.query.name;

  const logout = () => {
    signOut({ callbackUrl: '/' });
    axios
      .post(LOGOUT_URL, null)
      .then(() => {
        localStorage.removeItem('name');
      })
      .then(() => {
        localStorage.removeItem('kakao-Name');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <header className="top-0 left-0 z-20 w-full  bg-white px-2 py-2.5 dark:border-gray-600 dark:bg-gray-900 sm:px-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <Link href="/" className="flex items-center">
          {/* <Image
            src={""}
            className="mr-3 h-6 w-6 sm:h-9 sm:w-6"
            alt="logo"
            placeholder="blur"
          ></Image> */}
          {/* <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Maco
          </span> */}
        </Link>
        <div className="flex md:order-2">
          {status != 'unauthenticated' || localLogin != null ? (
            <div>
              안녕하세요 {localLogin}
              {kakaoLogin}
              <button
                type="button"
                className="mr-3 rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 md:mr-0"
                onClick={() => {
                  logout();
                }}
              >
                로그아웃
              </button>
            </div>
          ) : (
            <Link href={'/login'}>
              <button
                type="button"
                className="mr-3 rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 md:mr-0"
              >
                로그인
              </button>
            </Link>
          )}
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div
          className="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto"
          id="navbar-sticky"
        >
          <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:text-sm md:font-medium md:dark:bg-gray-900">
            <li>
              <Link
                href="/"
                className="block rounded bg-blue-700 py-2 pl-3 pr-4 text-white dark:text-white md:bg-transparent md:p-0 md:text-blue-700"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard"
                className="block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/control"
                className="block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
              >
                Control
              </Link>
            </li>
            <li>
              <button
                onClick={() => {
                  router.replace('/boards/main');
                }}
                className="block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
              >
                FAQ
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;
