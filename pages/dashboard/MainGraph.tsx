import authRequest from '@/utils/request/authRequest';
import axios from 'axios';
import { useRef, useEffect, useState } from 'react';
import TimePicker from 'rc-time-picker';
import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
import 'rc-time-picker/assets/index.css';
import moment, { Moment } from 'moment';
import {
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
  parseISO,
  startOfDay,
  endOfDay,
  addDays,
  differenceInMilliseconds,
  isWithinInterval,
  format,
  add,
  set,
  differenceInDays,
} from 'date-fns';
import MakeSchedule from './MakeSchedule';
import { Bar, Line } from 'react-chartjs-2';
import Chart, { ChartData } from 'chart.js';
import 'chart.js/auto';
// import { getWeekNumber } from '';
// import scheduleData from '/scheduleMock.json';

const SERVER_URL = 'http://localhost:8000/irrigation';

interface IrrigationData {
  id: number;
  sun_day: boolean;
  mon_day: boolean;
  tue_day: boolean;
  wed_day: boolean;
  thu_day: boolean;
  fri_day: boolean;
  sat_day: boolean;
  s_hour: string;
  s_min: string;
  on_time: string;
  line_1: boolean;
  line_2: boolean;
  line_3: boolean;
  onoff: boolean;
  start_date: string; // string 타입으로 추정
  // string 타입의 인덱스 시그니처 선언 => 객체 속성 이름과 데이터 타입을 동적으로 할당할 수 있음. 따라서, 인터페이스 내부에 객체 속성을 정의할 때, 객체가 가질 수 있는 모든 속성을 선언하지 않고도 타입 검사를 할 수 있음.
  [key: string]: boolean | number | string | Date; // 인덱스 시그니처 추가
}

function calculateWorkingTime(data: IrrigationData[], selectedDate: Date) {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const startOfWeekDate = startOfWeek(selectedDate, { weekStartsOn: 0 });
  const endOfWeekDate = endOfWeek(selectedDate, { weekStartsOn: 0 });
  // const endOfWeekDate = now;
  // const daysOfWeek = eachDayOfInterval({
  //   start: startOfWeekDate,
  //   end: endOfWeekDate,
  // }).map((date) => format(date, 'eee').toLocaleLowerCase());

  // const startWeekString = format(startOfWeekDate, 'M월 W주차');

  const daysOfWeek = eachDayOfInterval({
    start: startOfWeekDate,
    // end: now,
    end: now,
  }).map((date) => format(date, 'eee').toLocaleLowerCase());

  // console.log(daysOfWeek);

  const workingTimeByDayOfWeek = new Array(7).fill(0);
  let totalWorkingTime = 0;

  for (let i = 0; i < data.length; i++) {
    const startDate = new Date(data[i].start_date);
    const sHour = Number(data[i].s_hour);
    const sMin = Number(data[i].s_min);
    const onTime = Number(data[i].on_time);
    // const timeDiff = startDate.getTime() - now.getTime();
    const timeDiff = startDate.getTime() - selectedDate.getTime();
    // startDate.getDay() => startDate의 요일을 계산
    // const dayOfWeek = daysOfWeek[startDate.getDay()];
    if (!data[i].onoff) {
      continue;
    }

    let lineCount = 0;
    for (let j = 1; j <= 3; j++) {
      const lineKey = `line_${j}`;
      const isLineActive = data[i][lineKey];

      if (isLineActive) {
        lineCount++;
      }
    }

    if (startDate > startOfWeekDate && timeDiff < 0) {
      console.log('if');
      console.log('계산');
      console.log(differenceInDays(startDate, startOfWeekDate));
      for (
        let j = differenceInDays(startDate, startOfWeekDate);
        j < daysOfWeek.length;
        j++
      ) {
        const dayOfWeek = daysOfWeek[j].slice(0, 3);
        const isScheduleActiveOnDayOfWeek = data[i][`${dayOfWeek}_day`];

        if (isScheduleActiveOnDayOfWeek) {
          workingTimeByDayOfWeek[j] += onTime * lineCount;
          totalWorkingTime += onTime * lineCount;
        }
      }
    } else if (timeDiff === 0) {
      console.log('elif');
      if (currentHour >= sHour && currentMinute >= sMin) {
        const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
        if (data[i][`${days[now.getDay()]}_day`]) {
          workingTimeByDayOfWeek[now.getDay()] += onTime * lineCount;
          totalWorkingTime += onTime * lineCount;
        }
      }
    } else {
      console.log('else');
      for (let j = 0; j < daysOfWeek.length; j++) {
        const dayOfWeek = daysOfWeek[j].slice(0, 3);
        // console.log(dayOfWeek);
        const isScheduleActiveOnDayOfWeek = data[i][`${dayOfWeek}_day`];

        if (isScheduleActiveOnDayOfWeek) {
          workingTimeByDayOfWeek[j] += onTime * lineCount;
          totalWorkingTime += onTime * lineCount;
        }
      }
    }
  }

  return {
    totalWorkingTime,
    workingTimeByDayOfWeek,
  };
}

function MainGraph() {
  const [irrigationData, setIrrigationData] = useState<IrrigationData[]>([]);
  const [totalWorkingTime, setTotalWorkingTime] = useState(0);
  const [workingTimeByDayOfWeek, setWorkingTimeByDayOfWeek] = useState<
    number[]
  >([]);
  const [chartData, setChartData] = useState<number[]>([]);

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedWeek, setSelectedWeek] = useState<string>('');

  // const startWeekString = format(startOfWeekDate, 'M월 W주차');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await authRequest.get(SERVER_URL);
        console.log(res.data);
        const sorted = res.data.sort(
          (a: IrrigationData, b: IrrigationData) => a.id - b.id
        );
        setIrrigationData(sorted);
        // console.log(irrigationData);
        // console.log('irrigationData 출력');
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log(irrigationData);
    const { totalWorkingTime, workingTimeByDayOfWeek } = calculateWorkingTime(
      irrigationData,
      selectedDate
    );
    setTotalWorkingTime(totalWorkingTime);
    setWorkingTimeByDayOfWeek(workingTimeByDayOfWeek);
    // console.log(workingTimeByDayOfWeek);
  }, [irrigationData, selectedDate]);

  useEffect(() => {
    setChartData(workingTimeByDayOfWeek);
  }, [workingTimeByDayOfWeek]);

  useEffect(() => {
    // const weekNumber = getWeekNumber(selectedDate);
    const month = selectedDate.toLocaleString('default', { month: 'long' });
    // setSelectedWeek(`${month} ${weekNumber}주차`);
  }, [selectedDate]);

  const handleChange = (date: Date) => {
    setSelectedDate(date);
    // console.log(selectedDate);
    // const { totalWorkingTime, workingTimeByDayOfWeek } = calculateWorkingTime(
    //   irrigationData,
    //   selectedDate
    // );
    // setTotalWorkingTime(totalWorkingTime);
    // setWorkingTimeByDayOfWeek(workingTimeByDayOfWeek);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {/* <h2>{startWeekString}의 데이터</h2> */}
      <div className="h-12 w-12">
        <DatePicker selected={selectedDate} onChange={handleChange} />
      </div>
      <div className="w-full">
        <Bar
          style={{ height: '500px', width: '100%' }}
          data={{
            labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            datasets: [{ data: chartData, label: '이번 주 동작 시간' }],
          }}
          options={{}}
        />
      </div>
    </div>
  );
}

export default MainGraph;
