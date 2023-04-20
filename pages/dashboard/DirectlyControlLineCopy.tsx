import authRequest from '@/utils/request/authRequest';
import axios from 'axios';
import { useEffect, useState } from 'react';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment, { Moment } from 'moment';

// import SelectDays from '../components/SelectDays';
import MakeSchedule from './MakeSchedule';
import router from 'next/router';

// import scheduleData from '/scheduleMock.json';

// TODO: SERVER_URL 수정할 것
const SERVER_URL_MANUAL = 'http://localhost:8000/irrigation/manually';

// interface TimePickerProps {
//   onChange: (value: Moment) => void;
// }

// TODO: 아직 라인 분할은 생각 안함. 추후에 할 것
interface LineControl {
  id: number;
  line_1: boolean;
  line_2: boolean;
  line_3: boolean;
  manually_time: number;
  manually_btn: boolean;
}

interface DefaultLine {
  line_1: boolean;
  line_2: boolean;
  line_3: boolean;
  manually_time: number;
  manually_btn: boolean;
}

const defaultLineValue: DefaultLine[] = [
  {
    line_1: true,
    line_2: false,
    line_3: false,
    manually_time: 0,
    manually_btn: false,
  },
  {
    line_1: false,
    line_2: true,
    line_3: false,
    manually_time: 0,
    manually_btn: false,
  },
  {
    line_1: false,
    line_2: false,
    line_3: true,
    manually_time: 0,
    manually_btn: false,
  },
];

function DirectlyControlLineCopy({ data }: { data: LineControl[] }) {
  console.log('DirectlyControlLine 컴포넌트 렌더링');
  // const [lines, setLines] = useState<LineControl[]>([]);
  // const [onoff, setOnoff] = useState(false);
  // const [sortedData, setSortedData] = useState<LineControl[]>([]);
  // const [times, setTimes] = useState<number[]>([0, 0, 0]); // 초기값 0 설정
  // const [line_1, setLine_1] = useState<boolean>(false);
  // const [line_2, setLine_2] = useState<boolean>(false);
  // const [line_3, setLine_3] = useState<boolean>(false);
  // const [manualTime, setManualTime] = useState<string>('');
  // const [manualBtn, setManualBtn] = useState<boolean>(false);
  const [hasData, setHasData] = useState(false);
  const [isTrigger, setIsTrigger] = useState(false);
  const [lineControlData, setLineControlData] = useState<LineControl[]>([]);
  // const handleTimeChange = (index: number, value: any) => {
  //   const newTimes = [...times];
  //   newTimes[index] = value ? value.valueOf() : 0; // 선택된 시간 값이 있으면 밀리초로 변환하여 저장
  //   setTimes(newTimes);
  // };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await authRequest.get(SERVER_URL);
  //     console.log(res);
  //     // const res = await axios.get('http://localhost:8000/irrigation/schedule');
  //     const data: LineControl[] = await res.data();
  //     console.log(data);
  //     if (!data) return;
  //     const sorted = data.sort((a: LineControl, b: LineControl) => a.id - b.id);
  //     setSortedData(sorted);
  //   };
  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      console.log('fetchData 시작'); // 이 로그를 추가해 확인해봅시다.
      try {
        const result = await authRequest.get(SERVER_URL_MANUAL);
        console.log('데이터 가져옴:', result.data);

        if (!result.data || result.data.length === 0) {
          console.log(defaultLineValue);
          console.log(
            '============================================================'
          );

          try {
            const postPromises = defaultLineValue.map((line) => {
              return authRequest.post(SERVER_URL_MANUAL, line);
            });

            const postResults = await Promise.all(postPromises);

            postResults.forEach((res) => {
              console.log(res.data);
            });
          } catch (err: any) {
            if (err.response && err.response.status === 401) {
              alert('로그인을 다시 해주세요.');
            } else {
              console.log(err);
              alert('정확하게 입력해 주세요.');
            }
          }
          setIsTrigger(!isTrigger);
        } else {
          const data: LineControl[] = await result.data;
          // line_1, line_2, line_3 에 따라 정렬
          data.sort((a, b) => {
            if (a.line_1) return -1;
            if (b.line_1) return 1;
            if (a.line_2) return -1;
            if (b.line_2) return 1;
            return 0;
          });
          setLineControlData(data);
          setHasData(!hasData);
          // setIsTrigger(!isTrigger);
        }
      } catch (error) {
        window.alert('다시 로그인 해 주십시오');
        router.replace('/login');
        console.error(error);
      }
    };
    fetchData();
  }, [isTrigger]);

  const handleTimeChange = (
    lineId: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedTime = parseInt(e.target.value, 10);
    setLineControlData((prevData) =>
      prevData.map((line) => {
        if (line.id === lineId) {
          return { ...line, manually_time: updatedTime };
        }
        return line;
      })
    );
    // const newLines = lines.map((line) => {
    //   if (line.id === id) {
    //     return {
    //       ...line,
    //       setTime: Number(e.target.value),
    //     };
    //   }
    //   return line;
    // });
    // setLines(newLines);
  };

  // function toggleOnOff(
  //   id: number,
  //   onoff: boolean,
  //   setOnoff: (onoff: boolean) => void,
  //   settime: number
  // ) {
  //   const newOnoff = !onoff;
  //   console.log(id);
  //   axios
  //     // .put(`${SERVER_URL}/${id}`, {
  //     .put(`http://localhost:8000/irrigation/linecontrol/${id}`, {
  //       onoff: newOnoff,
  //       settime: settime,
  //     })
  //     .then((res) => {
  //       setOnoff(newOnoff);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }

  const toggleOnOff = async (lineId: number) => {
    // lineControlData에서 해당 lineId 가진 라인을 찾기
    const targetLine = lineControlData.find((line) => line.id === lineId);

    if (!targetLine) {
      console.error('해당 라인을 찾을 수 없습니다.');
      return;
    }

    // 변경된 manually_btn 값을 반영하는 새로운 객체 생성
    const updatedLine = {
      ...targetLine,
      manually_btn: !targetLine.manually_btn,
    };

    if (!targetLine.manually_btn) {
      // manually_btn이 false였으면, input에 적힌 시간을 manually_time으로 지정
      updatedLine.manually_time = targetLine.manually_time;
      // manually_time이 0이면 수정하라고 알림
      if (updatedLine.manually_time == 0) {
        window.alert('시간을 설정해주세요');
        return;
      }
    }

    try {
      // 서버에 변경된 값을 업데이트 하도록 요청
      console.log(updatedLine);
      console.log(`${SERVER_URL_MANUAL}/${lineId}`);
      // await authRequest.patch(`${SERVER_URL_MANUAL}/${lineId}`, updatedLine);
      await authRequest.patch(
        `http://localhost:8000/irrigation/${lineId}/manually`,
        updatedLine
      );
      // 성공적으로 업데이트 된 경우, lineControlData를 업데이트
      setLineControlData(
        lineControlData.map((line) => (line.id === lineId ? updatedLine : line))
      );
    } catch (err) {
      console.error('라인 상태 업데이트 실패', err);
    }
  };

  return (
    <div className="flex">
      {hasData &&
        lineControlData.map((line, index) => (
          <div key={index} className="w-1/3">
            <div className="flex flex-row items-center justify-between border border-4">
              <div className="w-20">{`관수 ${index + 1}번`}</div>
              <div className="flex w-20">
                <input
                  type="number"
                  defaultValue={line.manually_time}
                  onChange={(event) => handleTimeChange(line.id, event)}
                  className="w-16 items-center"
                />
                분
              </div>
              <div className="">
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={line.manually_btn}
                    onChange={() => toggleOnOff(line.id)}
                    className="peer sr-only"
                  />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                  <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    {line.manually_btn ? '정지' : '가동'}
                  </span>
                </label>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default DirectlyControlLineCopy;
