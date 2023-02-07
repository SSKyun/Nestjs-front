import Header from '@/components/common/Header';
// import { Fragment } from 'react';
import Image from 'next/image';
import profileImage from '/public/login.png';

export default function Control() {
  return (
    <div>
      
      <div className="flex h-screen flex-row bg-slate-500">
        <div className="h-full w-1/5 bg-orange-500"></div>
        <div className="h-full w-4/5 bg-green-500">
          <div className="m-8 grid h-1/6 grid-cols-3 justify-items-center bg-blue-500">
            <div className="flex w-2/3 flex-row rounded-3xl bg-slate-100">
              <div className="m-4 w-3/4 bg-blue-700">
                <div className="w-auto text-slate-500">관수</div>
                <div className="text-bold w-auto text-3xl text-black">
                  관수량 숫자로
                </div>
                <div></div>
              </div>
              <div className="m-4 w-1/4">
                <Image
                  src={profileImage}
                  alt="profile"
                  placeholder="blur"
                  className="h-16 w-16 rounded-full"
                ></Image>
              </div>
            </div>
            <div className="w-2/3 rounded-3xl bg-zinc-50">농약</div>
            <div className="w-2/3 rounded-3xl bg-orange-800">비료</div>
          </div>
        </div>
      </div>
    </div>
  );
}
