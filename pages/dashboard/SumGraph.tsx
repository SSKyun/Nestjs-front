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
const SERVER_URL_MANUAL = 'http://localhost:8000/irrigation/manually';

interface IrrigationData {
  line_1: boolean;
  line_2: boolean;
  line_3: boolean;
  accumulated_t: number;
}

interface IrrigationManualData {
  line_1: boolean;
  line_2: boolean;
  line_3: boolean;
  accumulated_t: number;
}

interface SumData {
  line_1_acc: number;
  line_2_acc: number;
  line_3_acc: number;
}

function SumGraph() {
  const [irrigationData, setIrrigationData] = useState<IrrigationData[]>([]);
  const [irrigationManualData, setIrrigationManualData] = useState<
    IrrigationManualData[]
  >([]);
  const [sumData, setSumData] = useState<SumData>();
  const [line1_sum, setLine1_sum] = useState<number>(0);
  const [line2_sum, setLine2_sum] = useState<number>(0);
  const [line3_sum, setLine3_sum] = useState<number>(0);
  const [line1_m_sum, setLine1_m_sum] = useState<number>(0);
  const [line2_m_sum, setLine2_m_sum] = useState<number>(0);
  const [line3_m_sum, setLine3_m_sum] = useState<number>(0);
  // const [totalWorkingTime, setTotalWorkingTime] = useState(0);

  // const startWeekString = format(startOfWeekDate, 'M월 W주차');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await authRequest.get(SERVER_URL);
        const data = res.data;
        console.log(data);
        setIrrigationData(data);
        const result = await authRequest.get(SERVER_URL_MANUAL);
        const result_data = result.data;
        console.log(result_data);
        setIrrigationManualData(result_data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setLine1_sum(0);
    setLine2_sum(0);
    setLine3_sum(0);
    irrigationData.map((line) => {
      if (line.line_1 === true) {
        setLine1_sum(line1_sum + line.accumulated_t);
      }
      if (line.line_2 === true) {
        setLine2_sum(line2_sum + line.accumulated_t);
      }
      if (line.line_3 === true) {
        setLine3_sum(line3_sum + line.accumulated_t);
      }
    });
  }, [irrigationData]);

  useEffect(() => {
    setLine1_m_sum(0);
    setLine2_m_sum(0);
    setLine3_m_sum(0);
    irrigationManualData.map((line) => {
      if (line.line_1 === true) {
        setLine1_m_sum(line1_m_sum + line.accumulated_t);
      }
      if (line.line_2 === true) {
        setLine2_m_sum(line2_m_sum + line.accumulated_t);
      }
      if (line.line_3 === true) {
        setLine3_m_sum(line3_m_sum + line.accumulated_t);
      }
    });
  }, [irrigationManualData]);

  useEffect(() => {
    setSumData(line_1_acc);
  }, [irrigationData, irrgationManualData]);

  // const handleChange = (date: Date) => {
  //   setSelectedDate(date);
  //   // console.log(selectedDate);
  //   // const { totalWorkingTime, workingTimeByDayOfWeek } = calculateWorkingTime(
  //   //   irrigationData,
  //   //   selectedDate
  //   // );
  //   // setTotalWorkingTime(totalWorkingTime);
  //   // setWorkingTimeByDayOfWeek(workingTimeByDayOfWeek);
  // };

  return (
    <div className="flex flex-col items-center justify-center">
      {/* <h2>{startWeekString}의 데이터</h2> */}
      {/* <div className="h-12 w-12">
        <DatePicker selected={selectedDate} onChange={handleChange} />
      </div> */}
      <div className="w-full">
        <Bar
          style={{ height: '500px', width: '100%' }}
          data={{
            labels: ['관수 1', '관수 2', '관수 3'],
            datasets: [{ data: controlData, label: '이번 주 동작 시간' }],
          }}
          options={{}}
        />
      </div>
    </div>
  );
}

export default SumGraph;
