// import { Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import profileImage from '/public/login.png';

export default function Control() {
const router = useRouter();

useEffect(()=>{
  if(localStorage.getItem("kakao-Name") !== "undefined" || localStorage.getItem("name")){
    console.log("사용자 있음.")
  }else{
      router.replace("/");
  }
},[])

const goPesticide = () => {
  
}

  return (
    <div>
        <button><Link href={"/dashboard/Irrigation"}>관수</Link></button>
        <button><Link href={"/dashboard/Pesticide"}>농약</Link></button>
        <button><Link href={"/dashboard/Fertilizer"}>비료</Link></button>
    </div>
  );
}
