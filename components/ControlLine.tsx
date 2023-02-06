import React, { useEffect, useState } from 'react';
// import { DummyProps } from '@/pages/control';
import dummyData from 'json/data.json';
import axios from 'axios';

interface ControlLineProps {
  [k: string]: any;
  active: boolean;
  idx: number;
  setTime: number;
  day: string;
  startTime: string;
}

function controlValue(data: ControlLineProps) {
  console.log(data);
  axios
    .post(`/control + ${data.idx}`, {
      data,
    })
    .then((res) => {
      console.log('성공');
      console.log(res.data);
    });
}

function ControlLine(props: ControlLineProps) {
  const [data, setData] = useState<ControlLineProps>({
    ...props,
  });

  const filterBoolean = (v: any) => {
    if (typeof v === 'boolean') {
      return v ? 1 : 0;
    }
    return v;
  };

  return (
    <div className="border-b-5 my-5 flex flex-row items-center">
      {Object.keys(data).map((v) => {
        return (
          <input
            readOnly={v != 'setTime'}
            key={v}
            className="w-1/6 text-center"
            value={filterBoolean(data[v])}
            onChange={(e) =>
              setData((prev) => {
                const newObj: { [key: string]: string | number } = {};
                if (!isNaN(Number(e.target.value)))
                  newObj[v] = Number(e.target.value);
                else return { ...prev };
                return { ...prev, ...newObj };
              })
            }
          />
        );
      })}
      <button className="w-1/6 bg-blue-500" onClick={() => controlValue(data)}>
        Change
      </button>
    </div>
  );
}

export default function ControlLines() {
  return (
    <div className="mx-auto mt-12 w-1/2">
      {dummyData.map((v, index) => (
        <ControlLine key={v.startTime + index} {...v} />
      ))}
    </div>
  );
}
