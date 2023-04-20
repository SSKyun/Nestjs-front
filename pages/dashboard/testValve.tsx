import authRequest from '@/utils/request/authRequest';
import axios from 'axios';
import { useEffect, useState } from 'react';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment, { Moment } from 'moment';

import MakeSchedule from './MakeSchedule';

// import scheduleData from '/scheduleMock.json';

// const STAT_URL = 'http://172.21.3.171:8080/stat';
// const CHANGE_ON_URL = 'http://172.21.3.171:8080/valve?stat=ON&s_time';
// const CHANGE_OFF_URL = 'http://172.21.3.171:8080/valve?stat=OFF';
const VALVE_URL = 'http://172.21.4.223:8080/api/control-valve';
// http://172.21.3.171:8080/valve?stat=OFF
// http://172.21.3.171:8080/valve?stat=ON&s_time=30

interface LineControl {
  line_1: boolean;
  line_2: boolean;
  line_3: boolean;
  manually_time: number;
  manually_btn: boolean;
}

interface switchTest {
  settime: number;
  status: boolean;
}

function TestValve() {
  const [line1, setLine1] = useState(true);
  const [line2, setLine2] = useState(false);
  const [line3, setLine3] = useState(false);
  const [manually_btn, setManually_btn] = useState(false);
  const [manually_time, setManually_time] = useState(1);

  function toggleOnOff(
    line1: boolean,
    line2: boolean,
    line3: boolean,
    manually_btn: boolean,
    manually_time: number
  ) {
    const controlData: LineControl = {
      line_1: line1,
      line_2: line2,
      line_3: line3,
      manually_time,
      manually_btn: !manually_btn,
    };
    console.log(controlData);
    axios
      .post(VALVE_URL, controlData)
      .then((res) => {
        setManually_btn(!manually_btn);
        console.log(res);
        console.log('됨');
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedTime = parseInt(e.target.value, 10);
    setManually_time(updatedTime);
  };

  return (
    <div className="flex flex-row justify-center">
      <div className="w-20">관수</div>
      <div className="flex w-20">
        <input
          type="number"
          defaultValue={1}
          onChange={(event) => handleTimeChange(event)}
          className="w-16 items-center"
        />
        분
      </div>
      <div className="">
        <label className="relative inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            checked={manually_btn}
            onChange={() => {
              toggleOnOff(line1, line2, line3, manually_btn, manually_time);
            }}
            className="peer sr-only"
          />
          <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            {manually_btn ? '정지' : '가동'}
          </span>
        </label>
      </div>
    </div>
  );
}
export default TestValve;
function setManually_time(updatedTime: number) {
  throw new Error('Function not implemented.');
}
