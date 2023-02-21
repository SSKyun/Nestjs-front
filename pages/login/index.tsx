import { useRouter } from 'next/router';
import axios from 'axios';
import Image from 'next/image';
import loginImage from '/public/login.png';
import Link from 'next/link';
import mainRequest from '@/utils/request/mainReqeust';
import { useState } from 'react';
import { kakaoInit } from '@/utils/kakao/kakaoinit';

const SERVER_URL_SIGN_IN = "http://localhost:8000/auth/signin";
const SERVER_URL_SIGN_UP = "http://localhost:8000/auth/signup";


export default function Login() {
    const [f_id,setF_id] = useState(""); // 비번이랑 휴대폰번호 해야댐.
    const [f_name,setF_name] = useState("");
    const router = useRouter();
    const [id,setId] = useState("");
    const [password,setPassword] = useState("");
    const [user,setUser] = useState("");

    const login = () => {
        mainRequest.post(SERVER_URL_SIGN_IN,{
            username : id,
            password : password,
        }).then((res)=>{
            setUser(res.data.username);
            window.alert('로그인 성공!');
            localStorage.setItem("name",res.data.username);
            router.replace({
              pathname:"/",
            })
        }).catch(()=>{
            window.alert('로그인 실패! 다시 시도 해 주세요.');
        });
    }
    const kakaoLogin = async () => {

        const kakao = kakaoInit();

        kakao.Auth.login({
            success: () => {
                kakao.API.request({
                    url: '/v2/user/me', // 사용자 정보 가져오기
                    success: (res: any) => {
                        // console.log(res.properties.nickname)
                        setF_id(res.kakao_account.email);
                        setF_name(res.properties.nickname);
                        axios.post(SERVER_URL_SIGN_UP,{ //회원가입
                            username : f_id,
                            password : "qwer123!", //보류
                            nickname : f_name,
                            phone_number : "01083147735", //보류
                        }).then((res)=>{//처음 로그인이라면 
                            console.log("첫번째 로그인 시도 전")
                            mainRequest.post(SERVER_URL_SIGN_IN,{
                                username : f_id,
                                password : "qwer123!",
                            }).then((res)=>{                
                                console.log(`${res} 첫번째 로그인 성공`);
                                router.replace('/');
                            }).catch((err)=>{
                                console.log(`${err} 첫번째 로그인 실패`);
                            })
                        }).catch((err)=>{ //실패시(db가 있다면)
                            console.log(`${err} 첫번째 실패 후 로그인 전`);
                            mainRequest.post(SERVER_URL_SIGN_IN,{
                                username : f_id,
                                password : "qwer123!"
                            }).then((res)=>{
                                localStorage.setItem("name",res.data.username)
                                console.log(`${res} n번째 로그인 성공`)
                                router.replace('/');
                            }).catch((err)=>{
                                console.log(`${err} n번째 로그인 실패`);
                                
                            })
                        })
                    },
                    fail: (error: any) => {
                        console.log(error);
                    }
                })
            },
            fail: (error: any) => {
                console.log(error);
            }
        })
        
    }

  return (
    <div className=" flex h-screen items-center justify-around p-16">
      <div className="h-4/5 w-2/5">
        <Image
          src={loginImage}
          alt="login Image"
          placeholder="blur"
          className="rounded-3xl"
        ></Image>
      </div>
      <div>
                <h1>로그인</h1>
                <div>
                <input placeholder="아이디 입력" value={id} onChange={(e)=>{setId(e.target.value);}}/>
                <input placeholder="비밀번호 입력" type='password' onChange={(e)=>{setPassword(e.target.value);}}/>
                </div>
                <button onClick={()=>{login();}}>로그인</button><br/>
                <button><Link href="./signup">회원가입</Link></button>
            </div>
            <button
              className="mx-auto mt-8 w-40 rounded-md bg-yellow-500 font-semibold"
              onClick={kakaoLogin}>
              카카오로그인
            </button>
      
    </div>
  );
}