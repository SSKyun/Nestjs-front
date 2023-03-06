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
    const [showBox,setShowBox] = useState(false);
    const router = useRouter();
    const [phone_number,setPhone_Number] = useState<number | undefined>();
    const isValidPhoneNumber = phone_number !== undefined;
    const [id,setId] = useState();

    const handleCheck = () => {
        setShowBox(!showBox);
    }
    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const value = event.target.value.replace(/[^0-9]/g, ''); // 숫자 이외의 문자 제거
        const match = value.match(/^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/); // 휴대폰 번호 추출
        setPhone_Number(match ? parseInt(match[0], 10) : undefined); // 문자열을 숫자로 변환하여 저장
    }

    const firstLogin = () => {
        mainRequest.patch(`http://localhost:8000/auth/${id}`,{
            phone_number
        }).then(()=>{
            router.replace('/');
        }).catch((err)=>{
            console.log(err);
        })
    }

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
                localStorage.setItem('name', res.properties.nickname);
                axios
                  .post(SERVER_URL_SIGN_UP, {
                    username: res.kakao_account.email,
                    password: null,
                    nickname: res.properties.nickname,
                  })
                  .then((response) => {
                    setId(response.data);
                    handleCheck();
                  })
                  .catch(() => {
                    mainRequest
                      .post(SERVER_URL_SIGN_IN, {
                        username: res.kakao_account.email,
                      })
                      .then(() => {
                        router.replace('/');
                      })
                      .catch(() => {
                        router.replace('/login');
                      });
                  });
              },
              fail: (error: any) => {
                console.log(`${error} 로그인 자체가 실패`);
              },
            });
          },
          fail: (error: any) => {
            console.log(`${error} 로그인 자체가 실패`);
          },
        });
      }
    }, [kakao, setId, handleCheck, router]);

  return (
    <>
    <div>Kakaotest</div>
    <div className=" flex h-screen items-center justify-around p-16">
        <div className='place-content-center'> 
            <button
              className=""
              onClick={kakaoLogin}>
              카카오로그인
            </button>
            <br/>
            {showBox && 
            <div>
            <label htmlFor="phoneNumber">휴대폰 번호</label><br />
            <input
              id="phoneNumber"
              type="tel"
              placeholder="010-1234-5678"
              onChange={handleChange}
              //value={phoneNumber}
              required
            /><br/>
            <button onClick={firstLogin}>확인</button> 
            {/* 여기서 localStorage랑 넣어줘야 한다!! */}
            {!isValidPhoneNumber && (
              <div style={{ color: 'red' }}>유효한 휴대폰 번호를 입력해주세요.</div>
            )}
          </div>
            }
        </div>
    </div>
  </>
  );
}