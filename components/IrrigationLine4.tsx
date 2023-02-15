import axios from 'axios';
import { useState } from 'react';

const SERVER_URL = 'http://localhost:8000/irrigation';

export default function IrrigationLine(props: any) {
  const [line, setLine] = useState({
    linename: '',
    active: false,
    setTime: 0,
  });

  const onChangeLine = (e: { target: { name: any; value: any } }) => {
    setLine({
      ...line,
      [e.target.name]: e.target.value,
    });
  };

  const SaveButton = () => {
    console.log(
      // `active: ${props.onoff}, setTime: ${props.min}, linename: ${props.linename}`
      line
    );
  };

  return (
    <>
      <div>
        <input
          name="active"
          onChange={onChangeLine}
          placeholder={props.onoff ? 1 : 0}
        />
        <input
          name="linename"
          className="ml-6"
          onChange={onChangeLine}
          placeholder={props.linename}
        />
        <input
          name="setTime"
          onChange={onChangeLine}
          placeholder={props.settime}
        />
        <>분</>
        <button
          onClick={() => {
            props.PlayButton();
          }}
          className="ml-6 mr-6"
        >
          가동
        </button>
        <button
          onClick={() => {
            props.StopButton(props.i);
          }}
          className="mr-6"
        >
          정지
        </button>
        <button onClick={SaveButton} className="mr-6">
          저장
        </button>
        <button
          id={props.i}
          onClick={(event) => {
            props.removeLine(event?.target.id);
            // props.onDelete(props.counter);
            // props.onDelete({it.id});
          }}
        >
          삭제
        </button>
      </div>
    </>
  );
}
