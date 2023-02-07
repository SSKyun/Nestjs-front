import Header from '@/components/common/Header';
import DataLine from '@/components/DataLine';
import ControlLine from '@/components/ControlLine';
// import { Fragment } from 'react';
import Image from 'next/image';
import profileImage from '/public/login.png';

export interface DummyProps {
  active: boolean;
  idx: number;
  setTime: number;
  day: string;
  startTime: string;
}

// const dummyList: DummyProps[] = [
//   {
//     active: true,
//     idx: 1,
//     setTime: 45,
//     day: '2023-02-02',
//     startTime: '16:03:25',
//   },
//   {
//     active: true,
//     idx: 2,
//     setTime: 45,
//     day: '2023-01-03',
//     startTime: '16:03:25',
//   },
//   {
//     active: false,
//     idx: 3,
//     setTime: 45,
//     day: '2023-02-02',
//     startTime: '16:03:25',
//   },
//   {
//     active: true,
//     idx: 4,
//     setTime: 45,
//     day: '2023-02-02',
//     startTime: '16:03:25',
//   },
//   {
//     active: true,
//     idx: 5,
//     setTime: 45,
//     day: '2023-02-02',
//     startTime: '16:03:25',
//   },
//   {
//     active: false,
//     idx: 6,
//     setTime: 20,
//     day: '2023-02-02',
//     startTime: '16:03:25',
//   },
// ];

export default function Control() {
  return (
    <div>
      <DataLine />
      <div
        style={{
          borderTop: '2px solid #000 ',
          marginLeft: 20,
          marginRight: 20,
        }}
      ></div>
      <ControlLine />
      <div
        style={{
          borderTop: '2px solid #000 ',
          marginLeft: 20,
          marginRight: 20,
        }}
      ></div>
    </div>
  );
}
