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
        const kakao = kakaoInit();
        axios
          .post(LOGOUT_URL)
          .then(() => {
            localStorage.removeItem('name');
            localStorage.removeItem('accessToken');
            router.replace('/')
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
    
    return(
        <>
            {!UserName ? (
                <>
                    <button>
                        <Link href={"/login"}>로그인</Link>
                    </button>
                </>
            ) : (
                <>
                    <p>안녕하세요 {UserName}</p>
                    <button onClick={()=>{logout();}}>
                        로그아웃
                    </button>
                </>
            )} 
        </>
    );
}