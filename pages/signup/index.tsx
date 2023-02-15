import { useRouter } from 'next/router';
import { FieldErrors, useForm } from 'react-hook-form';
import Image from 'next/image';
import signUpImage from '/public/signup.png';
import axios from 'axios';
import { useState } from 'react';

interface SignUpForm {
  nickname: string;
  id: string;
  pw: string;
  checkPw?: string;
}
const SERVER_URL = "http://localhost:8000/auth/signup";

export default function SignUp() {
  const router = useRouter();
    const [id,setId] = useState("");
    const [password,setPassword] = useState("");
    const [nickname,setNickname] = useState("");
    
    const signup = () => {
        axios.post(SERVER_URL,{
            username : id,
            password : password,
            nickname,
        })
        .then(()=>{
            window.alert('회원가입 성공! 로그인 해주세요.');
            router.replace("/login");
        }).catch(()=>{
            window.alert('회원가입 실패! 다시 시도 해 주세요.');
        });
    }
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<SignUpForm>({
    mode: 'onChange',
  });

  const onValid = (data: SignUpForm) => {};
  const onInvalid = (errors: FieldErrors) => {
    console.log(errors);
  };

  const onSubmit = async ({ nickname, id, pw }: SignUpForm) => {
    // setLoading(true);
    console.log({ nickname, id, pw });
    // const { id, pw } = data;
    try {
      const response = await axios.post('/signup', { nickname, id, pw });
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
          src={signUpImage}
          alt="signUP Image"
          placeholder="blur"
          className="h-auto w-auto rounded-3xl"
        ></Image>
      </div>
      <div className="h-4/5 w-2/5 rounded-3xl bg-slate-300">
        <div>
              <div>회원가입</div>
              <div>
              <input placeholder="아이디 입력" value={id} onChange={(e)=>{setId(e.target.value);}}/>
              <input placeholder="비밀번호 입력" type='password' onChange={(e)=>{setPassword(e.target.value);}}/>
              {/* 비밀번호 확인 로직  */}
              <input placeholder='별명 입력' type='text' onChange={(e)=>{setNickname(e.target.value)}}/>
              </div>
              <button onClick={()=>{signup();}}>회원가입</button>
          </div>
      </div>
    </div>
  );
}