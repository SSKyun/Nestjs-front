import authRequest from '@/utils/request/authRequest';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { GetStaticProps } from 'next';
// import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
// import '@/styles/TimePicker.css';
// import TimePicker from 'react-time-picker';
// import ko from 'date-fns/locale/ko';
// import TimePicker from 'rc-time-picker';
// import 'rc-time-picker/assets/index.css';
// import moment from 'moment';

// import SelectDays from '../components/SelectDays';
import MakeSchedule from './MakeSchedule';
import { useRouter } from 'next/router';

// import scheduleData from '/scheduleMock.json';

const SERVER_URL = 'http://localhost:8000/irrigation';

interface Schedule {
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
  schedule_btn: boolean;
  manually_btn: boolean;
  // on_time: string;
  onoff_manually: boolean;
  line_1: boolean;
  line_2: boolean;
  line_3: boolean;
  onoff: boolean;
  set_time: number;
  trueDays: string[];
  trueLines: string[];
}

// interface Days {
//   [key: string]: boolean;
// }

const koreanDayMap: { [key: string]: string } = {
  sun: '일',
  mon: '월',
  tue: '화',
  wed: '수',
  thu: '목',
  fri: '금',
  sat: '토',
};

const lineName: { [key: string]: string } = {
  line_1: '1',
  line_2: '2',
  line_3: '3',
};

function ScheduleMain({ data }: { data: Schedule[] }) {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [trigger, setTrigger] = useState(false);
  // const [trueDays, setTrueDays] = useState<string[]>([]);
  // const [trueLines, setTrueLines] = useState<string[]>([]);
  const [onoff, setOnoff] = useState(false);
  const [sortedData, setSortedData] = useState<Schedule[]>([]);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      console.log('테스트중임.. 제발');
      try {
        const res = await authRequest.get(SERVER_URL);
        const data: Schedule[] = await res.data;
        // if (!data) return;
        const sorted = data.sort((a: Schedule, b: Schedule) => a.id - b.id);
        setSortedData(sorted);
        console.log(sortedData);
      } catch (error) {
        window.alert('다시 로그인 해 주십시오');
        router.replace('/login');
        console.error(error);
      }
    };
    fetchData();
  }, [trigger]);

  useEffect(() => {
    setSchedules(
      sortedData.map((schedule: Schedule) => {
        const trueDays = Object.entries(schedule)
          .filter(([key, value]) => key.endsWith('_day') && value)
          .map(([key, _]) => koreanDayMap[key.replace('_day', '')]);

        const trueLines = Object.entries(schedule)
          .filter(([key, value]) => key.startsWith('line_') && value)
          .map(([key, _]) => lineName[key]);

        return {
          ...schedule,
          trueDays,
          trueLines,
          onoff: schedule.onoff,
        };
      })
    );
  }, [sortedData]);

  function toggleOnOff(
    id: number,
    onoff: boolean,
    setOnoff: (onoff: boolean) => void
  ) {
    const newOnoff = !onoff;
    console.log(id);
    authRequest
      // .put(`${SERVER_URL}/${id}`, {
      .patch(`http://localhost:8000/irrigation/${id}`, {
        onoff: newOnoff,
      })
      .then((res) => {
        setOnoff(newOnoff);
        setTrigger(!trigger);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // const handleOnoffChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setOnoff(event.target.checked);
  // };

  const handleCancle = (processed: boolean) => {
    setIsVisible(!processed);
    setTrigger(!trigger);
  };

  const handleSubmit = (data: String, processed: boolean) => {
    authRequest
      .post(SERVER_URL, data)
      .then((res) => {
        console.log(res.data);
        setIsVisible(!processed);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          alert('로그인을 다시 해주세요.');
        } else {
          console.log(error);
          alert('정확하게 입력해 주세요.');
        }
      });
  };

  return (
    <div className="">
      <div>Hello</div>
    </div>
  );
}

// export const getStaticProps: GetStaticProps = async () => {
//   const res = await fetch('http://localhost:3000/scheduleMock.json');
//   const data = await res.json();

//   return { props: { data } };
// };

export default ScheduleMain;
