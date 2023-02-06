import React, { useEffect, useState } from 'react';
// import { DummyProps } from '@/pages/control';
import dummyData from 'json/data.json';

export default function DataLine() {
  // interface Dummy {
  //   active: boolean;
  //   idx: number;
  //   setTime: number;
  //   day: string;
  //   startTime: string;
  // }

  // console.log(dummyData);

  const dummyListUI = dummyData.map((v, index) => (
    <div
      className="my-5 flex flex-row items-center border-b-4 text-center"
      key={index}
    >
      <div className="w-1/5">{v.active ? 1 : 0}</div>
      <div className="w-1/5 border-l-4">{v.idx} 번</div>
      <div className="w-1/5 border-l-4">{v.setTime} 분</div>
      <div className="w-1/5 border-l-4">{v.day}</div>
      <div className="w-1/5 border-l-4">{v.startTime}</div>
    </div>
  ));

  return <div className="mx-auto mt-12 w-1/2">{dummyListUI}</div>;
}
