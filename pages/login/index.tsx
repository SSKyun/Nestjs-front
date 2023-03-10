import { useRouter } from 'next/router';
import axios from 'axios';
import Image from 'next/image';
import loginImage from '/public/login.png';
import Link from 'next/link';
import mainRequest from '@/utils/request/mainReqeust';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { kakaoInit } from '@/utils/kakao/kakaoinit';
import * as Kakao from 'kakao-sdk';
import dynamic from 'next/dynamic';


const SERVER_URL_SIGN_IN = "http://localhost:8000/auth/signin";
const SERVER_URL_SIGN_UP = "http://localhost:8000/auth/signup";



export default function Login() {
    const router = useRouter();
    const [kakao, setKakao] = useState<any>(null);
    
    useEffect(() => {
      const loadKakaoSDK = async () => {
        const kakaoInstance = await kakaoInit();
        setKakao(kakaoInstance);
      };
      if (typeof window !== 'undefined') {
        loadKakaoSDK();
      }
    }, []);

    const kakaoLogin = useCallback(async () => {
      if (kakao) {
        kakao.Auth.login({
          success: () => {
            kakao.API.request({
              url: '/v2/user/me',
              success: (res: any) => {
                console.log(res.kakao_account.phone_number)
                localStorage.setItem('name', res.properties.nickname);
                axios
                  .post(SERVER_URL_SIGN_UP, {
                    username: res.kakao_account.email,
                    password: null,
                    nickname: res.properties.nickname,
                    phone_number : res.kakao_account.phone_number
                  })
                  .then(() => {
                    router.replace('/');
                  })
                  .catch(() => {
                    mainRequest
                      .post(SERVER_URL_SIGN_IN, {
                        username: res.kakao_account.email,
                      })
                      .then(() => {
                        router.replace('/');
                      })
                      .catch((err) => {
                        console.log(err)
                        router.replace('/login');
                      });
                  });
              },
              fail: (error: any) => {
                console.log(`${error} ????????? ????????? ??????`);
              },
            });
          },
          fail: (error: any) => {
            console.log(`${error} ????????? ????????? ??????`);
          },
        });
      }
    }, [kakao, router]);

  return (
    <>
    <div className=" flex h-screen items-center justify-around p-16">
        <div className='place-content-center'> 
            <button
              className=""
              onClick={kakaoLogin}>
              ??????????????????
            </button>
            <br/>
        </div>
    </div>
  </>
  );
}