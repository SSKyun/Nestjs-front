import { useRouter } from 'next/router';
import { FieldErrors, useForm } from 'react-hook-form';
import axios from 'axios';
import Image from 'next/image';
import loginImage from '/public/login.png';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import mainRequest from '@/utils/request/mainReqeust';
import { useState } from 'react';
import HeaderComponent from '@/components/common/Header';
import { useNavigate } from 'react-router-dom';
import { kakaoInit } from '@/utils/kakao/kakaoinit';

interface LoginForm {
  id: string;
  pw: string;
}

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
        

        // 카카오 로그인 구현
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
                            console.log(`${err} 첫번째 실패후 로그인 전`);
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
                        // console.log("씨발")
                        // Router.push('/kakao');
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
  // const [session, loading] = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginForm>({
    mode: 'onChange',
  });

  const onValid = (data: LoginForm) => {
    onSubmit;
  };
  const onInvalid = (errors: FieldErrors) => {
    console.log(errors);
  };

  const onSubmit = async (data: LoginForm) => {
    // setLoading(true);
    console.log(data);
    // const { id, pw } = data;
    try {
      const response = await axios.post('/login', data, {
        withCredentials: true,
      });
      console.log(response);
    } catch (error: any) {
      alert(error.response.data);
    }
    // setLoading(false);
  };

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


{/* <div className="h-4/5 w-2/5 rounded-3xl bg-slate-300">
        <div className="p-8 text-center text-4xl font-bold">로그인 폼</div>
        <div>
          <form
            className="flex flex-col p-20"
            // onSubmit={handleSubmit(onValid, onInvalid)}
            onSubmit={handleSubmit(onSubmit, onInvalid)}
          >
            <label className="mt-8">ID</label>
            <input
              {...register('id', {
                required: '아이디를 적으세요.',
                minLength: {
                  message: '잘못된 아이디입니다.',
                  value: 5,
                },
              })}
              type="text"
              placeholder="ID"
              className={`${
                Boolean(errors.id?.message)
                  ? 'border-4 border-red-700'
                  : 'border border-black'
              }`}
            />
            <span className="text-red-700">{errors.id?.message}</span>
            <label className="mt-8">PW</label>
            <input
              {...register('pw', {
                required: '비밀번호를 적으세요.',
                minLength: {
                  message: '잘못된 비밀번호입니다.',
                  value: 5,
                },
              })}
              type="password"
              placeholder="Password"
              className={`${
                Boolean(errors.pw?.message)
                  ? 'border-4 border-red-700'
                  : 'border border-black'
              }`}
            />
            <span className="text-red-700">{errors.pw?.message}</span>
            <button
              className="mx-auto mt-8 w-40 rounded-md bg-blue-500 font-semibold"
              type="submit"
            >
              로그인
            </button>
            <button>
              <Link href={"/signup"}>
                회원가입
              </Link>
            </button>
            <button
              className="mx-auto mt-8 w-40 rounded-md bg-yellow-500 font-semibold"
              onClick={() =>
                signIn('kakao', { callbackUrl: 'http://localhost:3000' })
              }
            >
              카카오로그인
            </button>
          </form>
        </div>
      </div> */}