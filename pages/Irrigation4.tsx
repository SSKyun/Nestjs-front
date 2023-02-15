import IrrigationLine4 from '@/components/IrrigationLine4';
import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';

const SERVER_URL = 'http://localhost:8000/irrigation';

export default function Irrigation() {
  const [lines, setLines] = useState<any[]>([]);
  const [settime, setSettime] = useState('0');
  const [linename, setLinename] = useState('관수라인 0');
  const [onoff, setOnoff] = useState(false);

  useEffect(() => {
    axios
      // .get(SERVER_URL)
      .get('/irrigationMock.json')
      .then((res) => {
        console.log(res.data);
        setLines(res.data);
      })
      .catch((err) => {
        console.log('연결안됨');
        console.log(err);
      });
  }, []);

  const addLine = (e: any) => {
    e.preventDefault();
    setLines([...lines, { linename, settime, onoff }]);
    console.log(lines);
    setLinename(`관수라인 ${lines.length}`);
    setSettime('');
    setOnoff(false);
  };

  // useEffect(() => {}, [min]);
  const removeLine = useCallback(
    (linename: any) => {
      console.log(linename);
      setLines(lines.filter((line) => line.linename !== linename));
    },
    [lines]
  );

  const onChangeTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const onlyNumber = value.replace(/[^0-9]/g, '');
    setSettime(onlyNumber);
    console.log(settime);
  };

  const onChangeLinename = (e: any) => {
    setLinename(e.target.value);
    console.log(linename);
  };

  // const PlayButton = () => {
  //   axios
  //     .post(SERVER_URL, {
  //       user:
  //         localStorage.getItem('name') || localStorage.getItem('kakao-Name'),
  //       time: min,
  //       linename: linename,
  //       onoff: true,
  //     })
  //     .then((res) => {
  //       //on 버튼 작동
  //       setOnoff(true);
  //       console.log(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const StopButton = () => {
    // off 버튼 작동
    setOnoff(false);
  };

  // const SaveButton = (i: number) => {
  //   console.log(i);
  // };

  return (
    <div className="mt-8 grid place-items-center">
      <div>전체 제어</div>
      <div className="mt-2 flex">
        <button onClick={addLine} className="flex-1.5 ">
          만들기
        </button>
        <button className="flex-1.5 ml-24 mr-24">가동</button>
        <button className="flex-1.5">정지</button>
        {/* 정지는 누르면 몇 분 동안 동작했다. */}
      </div>
      <div className="mt-12">관수제어</div>
      {lines.map((line, i) => (
        <IrrigationLine4
          key={i}
          id={i}
          linename={lines[i].linename}
          settime={lines[i].settime}
          onoff={lines[i].onoff}
          onChangeTime={onChangeTime}
          onChangeLinename={onChangeLinename}
          PlayButton={""} 
          StopButton={StopButton}
          // SaveButton={SaveButton}
          removeLine={removeLine}
        />
      ))}
    </div>
  );
}
