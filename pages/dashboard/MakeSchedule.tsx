import authRequest from '@/utils/request/authRequest';
import axios from 'axios';
import { MouseEventHandler, useEffect, useState } from 'react';
// import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
// import '@/styles/TimePicker.css';
// import TimePicker from 'react-time-picker';
// import ko from 'date-fns/locale/ko';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';

// import SelectDays from '../components/SelectDays';

// import 'react-datepicker/dist/react-datepicker.css';
// import 'react-time-picker/dist/TimePicker.css';
// import 'react-time-picker/dist/Clock.css';

const SERVER_URL = 'http://localhost:8000/irrigation';

interface FormValues {
  // scheduleName: string;
  // selectedDays: string[];
  sun_day: boolean;
  mon_day: boolean;
  tue_day: boolean;
  wed_day: boolean;
  thu_day: boolean;
  fri_day: boolean;
  sat_day: boolean;
  // 라인들을 배열로 받을때
  // checkLines: Record<Line, boolean>;
  line_1: boolean;
  line_2: boolean;
  line_3: boolean;
  // on_time: string;
  schedule_btn: boolean;
  s_hour: string;
  s_min: string;
  onoff: boolean;
  set_time: number;
  // start_date: Date;
}
// 라인들을 배열로 받을때
// type Line = 'line_1' | 'line_2' | 'line_3';

// type MakeScheduleProps = {
//   onSubmit: (data: String, processed: boolean) => void;
// };

export default function MakeSchedule(props: {
  onSubmit: any;
  handleCancle: any;
}) {
  const { onSubmit, handleCancle } = props;

  const [scheduleName, setScheduleName] = useState<string>('');
  // const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedSun_day, setSelectedSun_day] = useState(false);
  const [selectedMon_day, setSelectedMon_day] = useState(false);
  const [selectedTue_day, setSelectedTue_day] = useState(false);
  const [selectedWed_day, setSelectedWed_day] = useState(false);
  const [selectedThu_day, setSelectedThu_day] = useState(false);
  const [selectedFri_day, setSelectedFri_day] = useState(false);
  const [selectedSat_day, setSelectedSat_day] = useState(false);

  // 라인들을 배열로 받을때
  // const [checkLines, setCheckLines] = useState<Record<Line, boolean>>({
  //   line_1: false,
  //   line_2: false,
  //   line_3: false,
  // });

  const [line_1, setLine_1] = useState(false);
  const [line_2, setLine_2] = useState(false);
  const [line_3, setLine_3] = useState(false);

  // const [s_hour, setS_hour] = useState('0');
  const [s_hour, setS_hour] = useState(new Date().getHours().toString());
  const [s_min, setS_min] = useState(new Date().getMinutes().toString());
  const [endHour, setEndHour] = useState(new Date().getHours().toString());
  const [endMinute, setEndMinute] = useState(
    new Date().getMinutes().toString()
  );
  // const [on_time, setOn_time] = useState('0');
  const [set_time, setSet_time] = useState<number>(0);

  const [isProcessed, setIsProcessed] = useState(false);

  useEffect(() => {
    setSet_time(
      Number(endHour) * 60 +
        Number(endMinute) -
        (Number(s_hour) * 60 + Number(s_min))
    );
    if (Number(set_time) < 0) {
      alert('시작시간이 종료시간보다 늦습니다!');
      setS_hour(endHour);
      setS_min(endMinute);
    }
  }, [s_hour, s_min, endHour, endMinute, set_time]);

  const handleStartTimeChange = (value: moment.Moment) => {
    setS_hour(
      value ? value.hour().toString() : new Date().getHours().toString()
    );
    setS_min(
      value ? value.minute().toString() : new Date().getMinutes().toString()
    );
  };

  const handleEndTimeChange = (value: moment.Moment) => {
    setEndHour(
      value ? value.hour().toString() : new Date().getHours().toString()
    );
    setEndMinute(
      value ? value.minute().toString() : new Date().getMinutes().toString()
    );
    // setOn_time(
    //   (
    //     Number(endHour) * 60 +
    //     Number(endMinute) -
    //     (Number(s_hour) * 60 + Number(s_min))
    //   ).toString()
    // );
  };

  const handleScheduleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScheduleName(e.target.value);
  };

  // 라인들을 배열로 받을때
  // const handleLineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, checked } = e.target;
  //   setCheckLines((prevCheckLines) => ({
  //     ...prevCheckLines,
  //     [name as Line]: checked,
  //   }));
  // }

  const handleLine1Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLine_1(event.target.checked);
  };

  const handleLine2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLine_2(event.target.checked);
  };

  const handleLine3Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLine_3(event.target.checked);
  };

  // const handleDaysSelected = (days: any) => {
  // setSelectedDays(days);
  // };

  const handleSaveClick = () => {
    // console.log(selectedDays);
    console.log(scheduleName);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // console.log('Submitted values: ', formValues);
    // console.log(endHour);
    const formValues: FormValues = {
      // scheduleName,
      sun_day: selectedSun_day,
      mon_day: selectedMon_day,
      tue_day: selectedTue_day,
      wed_day: selectedWed_day,
      thu_day: selectedThu_day,
      fri_day: selectedFri_day,
      sat_day: selectedSat_day,
      // 라인들을 배열로 받을때
      // checkLines,
      line_1,
      line_2,
      line_3,
      s_hour,
      s_min,
      // endHour,
      // endMinute,
      // on_time,
      set_time,
      // TODO: onoff는 schedule만들때 일단은 false로 처리함, if) schedule 동작시간이 현재 시간안에 포함될 경우도 생각해야함.
      onoff: false,
      schedule_btn: true,
    };

    // const formValuesJson = JSON.stringify(formValues);
    setIsProcessed(true);
    onSubmit(formValues, true);
    // 부모쪽에서 출력
    // console.log(formValuesJson);
  };

  return (
    <div className="my-8">
      <form onSubmit={handleSubmit}>
        {/* <SelectDays onDaysSelected={handleDaysSelected} /> */}
        <div className="flex flex-row justify-between">
          <label>
            <input
              type="checkbox"
              name="sun_day"
              checked={selectedSun_day}
              onChange={() => setSelectedSun_day((prevChecked) => !prevChecked)}
            />
            Sunday
          </label>
          <label>
            <input
              type="checkbox"
              name="mon_day"
              checked={selectedMon_day}
              onChange={() => setSelectedMon_day((prevChecked) => !prevChecked)}
            />
            Monday
          </label>
          <label>
            <input
              type="checkbox"
              name="tue_day"
              checked={selectedTue_day}
              onChange={() => setSelectedTue_day((prevChecked) => !prevChecked)}
            />
            Tuesday
          </label>
          <label>
            <input
              type="checkbox"
              name="wed_day"
              checked={selectedWed_day}
              onChange={() => setSelectedWed_day((prevChecked) => !prevChecked)}
            />
            Wednesday
          </label>
          <label>
            <input
              type="checkbox"
              name="thu_day"
              checked={selectedThu_day}
              onChange={() => setSelectedThu_day((prevChecked) => !prevChecked)}
            />
            Thursday
          </label>
          <label>
            <input
              type="checkbox"
              name="fri_day"
              checked={selectedFri_day}
              onChange={() => setSelectedFri_day((prevChecked) => !prevChecked)}
            />
            Friday
          </label>
          <label>
            <input
              type="checkbox"
              name="sat_day"
              checked={selectedSat_day}
              onChange={() => setSelectedSat_day((prevChecked) => !prevChecked)}
            />
            Saturday
          </label>
        </div>
        {/* <div className="flex flex-row justify-center">
          <label>
            스케쥴 이름 :
            <input
              type="text"
              value={scheduleName}
              onChange={handleScheduleNameChange}
              className="border border-blue-900"
            />
          </label>
        </div> */}
        <div className="flex flex-row justify-around">
          <label>시작 시간 : </label>
          <TimePicker
            showSecond={false}
            defaultValue={moment()}
            onChange={handleStartTimeChange}
            // value={formValues.startTime && moment(formValues.startTime, 'HH:mm')}
          />
          <label>종료 시간 : </label>
          <TimePicker
            showSecond={false}
            onChange={handleEndTimeChange}
            defaultValue={moment()}
            // value={formValues.endTime && moment(formValues.endTime, 'HH:mm')}
          />
        </div>
        <div className="flex flex-row justify-around">
          <label>
            <input
              type="checkbox"
              name="line_1"
              checked={line_1}
              onChange={handleLine1Change}
            />
            관수 1
          </label>
          <label>
            <input
              type="checkbox"
              name="line_2"
              checked={line_2}
              onChange={handleLine2Change}
            />
            관수 2
          </label>
          <label>
            <input
              type="checkbox"
              name="line_3"
              checked={line_3}
              onChange={handleLine3Change}
            />
            관수 3
          </label>
        </div>
        {/* <button onClick={handleTimeSelect}>저장</button> */}
        <div className="flex flex-row justify-center">
          <button
            onClick={handleCancle}
            className="mx-4 w-20 rounded-lg bg-red-500"
          >
            Cancle
          </button>
          <button type="submit" className="mx-4 w-20 rounded-lg bg-blue-500">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
