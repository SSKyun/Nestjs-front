import { kakaoInit } from "@/utils/kakao/kakaoinit";
import mainRequest from "@/utils/request/mainReqeust";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const LOGOUT_URL = 'http://localhost:8000/auth/logout';

export default function NavBar({ props }: any){
    const router = useRouter();
    const UserName = typeof window !== 'undefined' ?
    window.localStorage.getItem('name') : false; 

    const logout = () => {
        axios
          .post(LOGOUT_URL)
          .then(() => {
            const kakao = kakaoInit(); // kakaoInit 함수를 호출하는 위치를 변경합니다.
            localStorage.removeItem('name');
            localStorage.removeItem('accessToken');
            router.replace('/');
            kakao.API.request({
              url: '/v1/user/unlink',
              success: () => { //로그아웃 성공 시
                router.push('/');
                localStorage.removeItem('name');
              },
              fail: (error: any) => {
                console.log(error);
              }
            })
          })
          .catch((err) => {
            console.log(err);
          });
      };
      
      useEffect(() => {
        const kakao = kakaoInit(); // 로그인 페이지 로드 시 카카오 SDK 초기화
        return () => {
          if (kakao && kakao.Auth.getAccessToken()) {
            kakao.Auth.logout();
          }
        };
      }, []);
    
    return(
        <>
            <nav className="border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
            <div className="container flex flex-wrap items-center justify-between mx-auto">
                <a href="/" className="flex items-center">
                    <img src="" className="h-6 mr-3 sm:h-9" alt="Flowbite Logo" />
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">MaCo</span>
                </a>
                <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns=""><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
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
                    {!UserName ? (
                        <>
                            <button>
                                <Link href={"/login"}>로그인</Link>
                            </button>
                        </>
                    ) : (
                        <>
                            <p>안녕하세요 {UserName} 님</p>
                            <button onClick={()=>{logout();}}>
                                로그아웃
                            </button>
                        </>
                    )} 
                    </li>
                </ul>
                </div>
            </div>
            </nav>

        </>
    );
}