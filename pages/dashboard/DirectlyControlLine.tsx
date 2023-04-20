import axios from 'axios';
import { useState, useEffect } from 'react';

interface MachineData {
  device: string;
  umachine_add: string;
  wval1: number;
  wtime1: number;
  wval2: number;
  wtime2: number;
  [key: string]: string | number;
}

const fetchMachineData = async (): Promise<MachineData[]> => {
  const response = await axios.get<MachineData[]>('/json/machineMockData.json');
  return response.data;
};

const MyComponent = () => {
  const [machineData, setMachineData] = useState<MachineData[]>([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchMachineData();
      setMachineData(data);
    };
    getData();
  }, []);

  const toggleOnOff = (index: number, type: 'wval1' | 'wval2') => {
    setMachineData((prevMachineData) => {
      const updatedMachineData = [...prevMachineData];
      const selectedMachine = updatedMachineData[index];

      // 해당 부분의 값이 0일 때 에러를 보내기
      if (selectedMachine[type] === 0) {
        const time =
          updatedMachineData[index][type === 'wval1' ? 'wtime1' : 'wtime2'];
        if (time <= 0) {
          alert('시간을 설정해주세요!');
          return prevMachineData;
        }
      }

      // switch 상태를 바꾸는 부분
      updatedMachineData[index][type] =
        updatedMachineData[index][type] === 0 ? 1 : 0;

      // TODO: axios 요청 구현
      // axios.post('/api/updateMachineData', selectedMachine)
      //   .then((response) => {
      //     console.log(response.data);
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });
      console.log(updatedMachineData[index]);
      return updatedMachineData;
    });
  };

  const handleTimeChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    const type = event.target.name as keyof MachineData;
    // 음수거나, 값을 입력하지 않은 경우 0으로 변경
    const updatedValue = Number(value) < 0 || value === '' ? 0 : Number(value);

    setMachineData((prevMachineData) => {
      const updatedMachineData = [...prevMachineData];
      updatedMachineData[index][type] = updatedValue;
      console.log(updatedMachineData[index][type]);
      console.log('++++++++++++++++++++++');
      console.log(updatedMachineData);
      return updatedMachineData;
    });
  };

  return (
    <div className="grid grid-cols-2 gap-4 bg-gray-100 py-8">
      {machineData.map((machine, index) => (
        <div key={index} className="rounded-lg bg-white p-6 shadow-md">
          <div className="mb-2 text-lg font-bold">Device: {machine.device}</div>
          <div className="mb-2 text-gray-700">위치: {machine.umachine_add}</div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-orange-400 p-4">
              <div className="mb-2 text-lg font-bold">관수 1번</div>
              <div className="mb-2 flex items-center">
                <input
                  type="number"
                  defaultValue={machine.wtime1}
                  onChange={(event) => handleTimeChange(index, event)}
                  className="w-16 items-center"
                  min="0"
                  name="wtime1"
                />
                <div className="ml-2">분</div>
              </div>
              <div className="flex items-center">
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={machine.wval1 == 1 ? true : false}
                    onChange={() => toggleOnOff(index, 'wval1')}
                    className="peer sr-only"
                  />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                  <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    {machine.wval1 ? '가동중' : '정지중'}
                  </span>
                </label>
              </div>
            </div>
            <div className="rounded-lg bg-green-400 p-4">
              <div className="mb-2 text-lg font-bold">관수 2번</div>
              <div className="mb-2 flex items-center">
                <input
                  type="number"
                  defaultValue={machine.wtime2}
                  onChange={(event) => handleTimeChange(index, event)}
                  className="w-16 items-center"
                  min="0"
                  name="wtime2"
                />
                <div className="ml-2">분</div>
              </div>
              <div className="flex items-center">
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={machine.wval2 == 1 ? true : false}
                    onChange={() => toggleOnOff(index, 'wval2')}
                    className="peer sr-only"
                  />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                  <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    {machine.wval2 ? '가동중' : '정지중'}
                  </span>
                </label>
              </div>
            </div>
          </div>
          <div className="mt-4 text-gray-700">
            <div>관수 1번: {machine.wval1 ? '가동' : '정지'}</div>
            <div>관수 1번 작동시간: {machine.wtime1}분</div>
            <div>관수 2번: {machine.wval2 ? '가동' : '정지'}</div>
            <div>관수 2번 작동시간: {machine.wtime2}분</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyComponent;
