import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import axios from 'axios';
import { useRouter } from 'next/router';


const LOGOUT_URL = "http://localhost:8000/auth/logout";

const HeaderComponent = (props : any) => {
  const { data, status } = useSession();
  const router = useRouter();
  const [user2,setUser] = useState("");
  let localLogin:any;
  let kakaoLogin:any = data?.user?.name;
  if (typeof window !== 'undefined') {
    // Perform localStorage action
    localLogin = localStorage.getItem('name');
    localStorage.setItem("kakao-Name",kakaoLogin);
  }
  const user = router.query.name;

  const logout = () => {
    signOut({ callbackUrl: '/' });
    axios.post(LOGOUT_URL,null)
    .then(()=>{
        localStorage.removeItem('name');
        localStorage.removeItem('accessToken');
      }).then(()=>{localStorage.removeItem('kakao-Name');}).catch((err)=>{
        console.log(err);
      });
  }

  return (
    <header className="">
      <div className=" mx-auto flex h-32 w-full  items-center space-x-12 bg-[#f5f9fd] px-2 sm:px-6">
        <div className="flex h-full w-1/6 justify-evenly bg-green-500">
          <Link href="/" className="flex h-full items-center">
            Maco 로고
          </Link>
        </div>
        {/* 사이 간격 줄 방법 생각하기 */}
        <div className="ml-96 flex h-full items-center space-x-12">
          <Link
            href="/"
            className=" flex h-full w-52 items-center justify-evenly text-4xl hover:bg-gray-100  hover:underline hover:underline-offset-4"
          >
            Home
          </Link>
          <Link
            href="/dashboard"
            className=" flex h-full w-52 items-center justify-evenly text-4xl hover:bg-gray-100 hover:underline hover:underline-offset-4"
          >
            Dashboard
          </Link>
          <Link
            href="/control"
            className="flex h-full w-52 items-center justify-evenly text-4xl hover:bg-gray-100 hover:underline hover:underline-offset-4"
          >
            Control
          </Link>
          <button
            onClick={()=>{router.replace('/boards/main')}}
            className="flex h-full w-52 items-center justify-evenly text-4xl hover:bg-gray-100 hover:underline hover:underline-offset-4"
          >
            FAQ
          </button>
            {status != "unauthenticated" || localLogin != null ? <div>안녕하세요 {localLogin}{kakaoLogin}<button onClick={()=>{logout();}}>로그아웃</button></div> : <button><Link href={"/login"}>로그인</Link></button>}
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;
