import { kakaoInit } from "@/utils/kakao/kakaoinit";
import mainRequest from "@/utils/request/mainReqeust";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const LOGOUT_URL = 'http://localhost:8000/auth/logout';

export default function NavBar(){
    const router = useRouter();
    const [userName, setUserName] = useState<string | null>(null);

    const logout = () => {
        axios
          .post(LOGOUT_URL)
          .then(() => {
            //어차피 kakao-refresh-token을 받아오지 않으니까 localStorage안에 들어있는 값은 새로고침 시 없어지니까
            // 로컬에서 refresh-token을 발급 받은 걸 사용하면 된다.
            localStorage.removeItem('name');
            localStorage.removeItem('accessToken');
            window.alert('로그아웃 되었습니다.');
            router.replace('/');
          })
          .catch((err) => {
            console.log(err);
          });
          setUserName(null);
      };
      
    useEffect(() => {
        const name = typeof window !== 'undefined' && window.localStorage.getItem('name');
            if (name) {
            setUserName(name);
            }
        const kakao = kakaoInit(); 
        return () => {
            if (kakao && kakao.Auth.getAccessToken()) {
            kakao.Auth.logout();
            }
        };
      }, [typeof window !== 'undefined' && window.localStorage.getItem('name')]
    );
    
    
      return (
        <>
          <nav className="border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
            <div className="container flex flex-wrap items-center justify-between mx-auto">
              <a href="/" className="flex items-center">
                {/* <img src="" className="h-6 mr-3 sm:h-9" alt="Logo" /> */}
                <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">アグリート</span>
              </a>
              <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
              </button>
              <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                  <li>
                    <a href="#" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" aria-current="page">Home</a>
                  </li>
                  <li>
                    <a href="#" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About</a>
                  </li>
                  <li>
                    <a href="/boards/main" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">FAQ</a>
                  </li>
                  <li>
                    {userName ? (
                        <>
                        <div>{`Hello, ${userName}`}</div>
                        <button onClick={logout}>로그아웃</button>
                        </>
                    ) : (
                        <Link href="/login">
                            <p>로그인</p>
                        </Link>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </>
      );
}