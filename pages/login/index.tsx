import { useRouter } from 'next/router';
import axios from 'axios';
import Image from 'next/image';
import loginImage from '/public/login.png';
import Link from 'next/link';
import mainRequest from '@/utils/request/mainReqeust';
import { ChangeEvent, useEffect, useState } from 'react';
import { kakaoInit } from '@/utils/kakao/kakaoinit';
import * as Kakao from 'kakao-sdk';


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


    useEffect(()=>{
        
    },[])

    const kakaoLogin = async () => {
        const kakao = kakaoInit();
        console.log(kakao);
        kakao?.Auth.login({
            success: () => {
                kakao.API.request({
                    url: '/v2/user/me', // 사용자 정보 가져오기
                    success: (res: any) => {
                        localStorage.setItem("name",res.properties.nickname)
                        axios.post(SERVER_URL_SIGN_UP,{ //회원가입
                            username : res.kakao_account.email,
                            password : null,
                            nickname : res.properties.nickname,
                        }).then((response)=>{//처음 로그인이라면 
                            console.log("첫번째 로그인 시도 전")
                            setId(response.data)
                            mainRequest.post(SERVER_URL_SIGN_IN,{
                                username : res.kakao_account.email,
                            }).then((res : any)=>{//첫번째 로그인 성공
                                console.log(res.data)
                                window.alert("로그인 성공!")
                                handleCheck(); //처음 로그인 일 때 전화번호 입력창 띄움.
                            }).catch((err)=>{
                                window.alert("로그인 실패");
                                router.replace('/login')
                            })
                        }).catch((err)=>{ //실패시(db가 있다면)
                            console.log(`${err} 첫번째 실패 후 로그인 전`);
                            mainRequest.post(SERVER_URL_SIGN_IN,{
                                username : res.kakao_account.email,
                            }).then((res : any)=>{//n번째 로그인 성공
                                console.log(res)
                                window.alert("로그인 성공!")
                                router.replace('/');
                            }).catch((err)=>{//n번째 로그인 실패
                                window.alert("로그인 실패");
                                router.replace('/login')
                            })
                        })
                    },
                    fail: (error: any) => {
                        console.log(`${error} 로그인 자체가 실패`);
                    }
                })
            },
            fail: (error: any) => {
                console.log(`${error} 로그인 자체가 실패`);
            }
        })
        
    }
  return (
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
  );
}