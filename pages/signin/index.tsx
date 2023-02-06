import { useRouter } from 'next/router';
import { FieldErrors, useForm } from 'react-hook-form';
import axios from 'axios';
import Image from 'next/image';
import loginImage from '/public/login.png';
import { signIn, signOut, useSession } from 'next-auth/react';

interface LoginForm {
  id: string;
  pw: string;
}

export default function Sign() {
  // const [session, loading] = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginForm>({
    mode: 'onChange',
  });

  const router = useRouter();

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
      <div className="h-4/5 w-2/5 rounded-3xl bg-slate-300">
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
            <button
              className="mx-auto mt-8 w-40 rounded-md bg-yellow-500 font-semibold"
              onClick={(e) => {
                e.stopPropagation();
                signIn();
              }}
            >
              카카오톡 로그인
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
