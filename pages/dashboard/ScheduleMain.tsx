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

// TODO: schedule Update, Delete 아직 안됨. 해결할 것

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
  // manually_btn: boolean;
  // on_time: string;
  // onoff_manually: boolean;
  line_1: boolean;
  line_2: boolean;
  line_3: boolean;
  onoff: boolean;
  set_time: number;
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
  const [isTrigger, setIsTrigger] = useState(false);
  // const [trueDays, setTrueDays] = useState<string[]>([]);
  // const [trueLines, setTrueLines] = useState<string[]>([]);

  // TODO: onoff는 동작하는지 안하는지 체크, schedule_btn true, false로 변경
  // const [onoff, setOnoff] = useState(false);
  const [scheduleOnOff, setScheduleOnOff] = useState(false);
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
  }, [isTrigger]);

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
          scheduleOnOff: schedule.schedule_btn,
        };
      })
    );
  }, [sortedData]);

  function toggleOnOff(
    id: number,
    scheduleOnOff: boolean,
    setScheduleOnOff: (scheduleOnOff: boolean) => void
  ) {
    const newScheduleOnOff = !scheduleOnOff;
    console.log(id);
    // console.log(newScheduleOnOff);
    authRequest
      // .put(`${SERVER_URL}/${id}`, {
      .patch(`http://localhost:8000/irrigation/${id}`, {
        schedule_btn: newScheduleOnOff,
      })
      .then((res) => {
        setScheduleOnOff(newScheduleOnOff);
        console.log(scheduleOnOff);
        setIsTrigger(!isTrigger);
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
    setIsTrigger(!isTrigger);
  };

  const handleSubmit = (data: String, processed: boolean) => {
    console.log(data);
    authRequest
      .post(SERVER_URL, data)
      .then((res) => {
        console.log(res.data);
        setIsVisible(!processed);
        setIsTrigger(!isTrigger);
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
      <div>Test</div>
      <div className="flex justify-center">
        <button
          onClick={() => setIsVisible(!isVisible)}
          className=" w-12  rounded-lg bg-blue-500"
        >
          {isVisible ? 'Hide' : '+'}
        </button>
      </div>
      {isVisible && (
        <MakeSchedule onSubmit={handleSubmit} handleCancle={handleCancle} />
      )}
      {schedules.map((schedule) => (
        <div
          key={schedule.id}
          className="flex flex-row justify-around border-4"
        >
          <div>
            <div>
              {schedule.s_hour} : {schedule.s_min} ~{' '}
              {Math.floor(
                (Number(schedule.s_hour) * 60 +
                  Number(schedule.s_min) +
                  Number(schedule.set_time)) /
                  60
              ).toString()}{' '}
              :{' '}
              {Math.floor(
                (Number(schedule.s_hour) * 60 +
                  Number(schedule.s_min) +
                  Number(schedule.set_time)) %
                  60
              ).toString()}
            </div>
            <div>
              {'요일 : ' +
                Object.entries(schedule)
                  .filter(([key, value]) => key.endsWith('_day') && value)
                  .map(([key, _]) => koreanDayMap[key.replace('_day', '')])
                  .join(', ')}
            </div>
            <div>
              {'관수 라인 : ' +
                Object.entries(schedule)
                  .filter(([key, value]) => key.startsWith('line_') && value)
                  .map(([key, _]) => lineName[key])
                  .join(', ')}
            </div>
          </div>
          <div className="">
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                checked={schedule.schedule_btn}
                // TODO: 바로 체크 안되는 버그 발생. 추후 수정
                onChange={() =>
                  toggleOnOff(schedule.id, scheduleOnOff, setScheduleOnOff)
                }
                className="peer sr-only"
              />
              <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
              <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                {schedule.schedule_btn ? '끄기' : '켜기'}
              </span>
            </label>
          </div>
        </div>
      ))}
    </div>
  );
}

// export const getStaticProps: GetStaticProps = async () => {
//   const res = await fetch('http://localhost:3000/scheduleMock.json');
//   const data = await res.json();

//   return { props: { data } };
// };

export default ScheduleMain;
