import authRequest from "@/utils/request/authRequest";
import axios from "axios";
import { useState } from "react";

const SERVER_URL = "http://localhost:8000/irrigation";

export default function Irrigation(){
  const [min,setMin] = useState("");
  const [line,setLine] = useState("");
  const [onoff,setOnoff] = useState(false);

  const SetTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const onlyNumber = value.replace(/[^0-9]/g, '');
    setMin(onlyNumber)
    console.log(min)
  }

  const SetLineName = (e : any) => {
    setLine(e.target.value);
    console.log(line);
  }

  const PlayButton = () => {
    authRequest.post(SERVER_URL,{
      time : min,
      linename : line,
      onoff : true
    }).then((res)=>{
      //on 버튼 작동
      setOnoff(true);
      console.log(res.data);
    }).catch((err)=>{
      console.log(err);
    })
  }

  const StopButton = () => {
    // off 버튼 작동
    setOnoff(false);

  }

    return (
      <div className="grid place-items-center mt-8">
        <div>전체 제어</div>
        <div className="flex mt-2">
          <button onClick={()=>{}} className="flex-1.5 ">
            만들기
          </button>
          <button className="flex-1.5 ml-24 mr-24">
            가동
          </button>
          <button className="flex-1.5">
            정지
          </button>
          {/* 정지는 누르면 몇 분 동안 동작했다. */}
          
      </div>
      <div className="mt-12">관수제어</div>
        <div>
          <>on/off</>
          <input className="ml-6" onChange={(e)=>{SetLineName(e);}} placeholder="관수라인1"/>
          <input type="number" onChange={(e)=>{SetTime(e);}} placeholder="00"/><>분</>
          <button onClick={()=>{PlayButton();}} className="ml-6 mr-6">가동</button>
          <button className="mr-6" >정지</button>
          <button className="mr-6">저장</button>
          <button>삭제</button>
        </div>

      </div>
    );  
  }