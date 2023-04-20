import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import authRequest from '@/utils/request/authRequest';
import { MachineData } from '@/pages/dashboard/interfaces/machineData';

const ManualControl = () => {
  const router = useRouter();
  const { device } = router.query;
  const [machineData, setMachineData] = useState<MachineData | null>(null);
  const [isOperating, setIsOperating] = useState<boolean>(false);

  useEffect(() => {
    const fetchMachineData = async () => {
      try {
        const response = await authRequest.get<MachineData[]>(
          `http://localhost:8000/manual`
        );
        const deviceData = response.data.find((data) => data.device === device);
        if (deviceData) {
          setMachineData(deviceData);
          setIsOperating(
            deviceData.rwtime1 > 0 ||
              deviceData.rwtime2 > 0 ||
              deviceData.rctime > 0
          );
        } else {
          console.error('기기를 찾을 수 없습니다.');
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (device) {
      fetchMachineData();
      const intervalId = setInterval(fetchMachineData, 10000); // 10초마다 데이터 갱신

      // cleanup 함수에서 setInterval을 clear합니다.
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [device]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: keyof MachineData
  ) => {
    if (machineData && !isOperating) {
      setMachineData({
        ...machineData,
        [key]: key.startsWith('rcval')
          ? event.target.checked
            ? 1
            : 0
          : parseInt(event.target.value),
      });
    }
  };

  const handleToggleButton = async () => {
    if (machineData) {
      try {
        const data = isOperating
          ? {
              device: machineData.device,
              rwtime1: 0,
              rwtime2: 0,
              rcval1: 0,
              rcval2: 0,
              rctime: 0,
            }
          : {
              device: machineData.device,
              rwtime1: machineData.rwtime1,
              rwtime2: machineData.rwtime2,
              rcval1: machineData.rcval1,
              rcval2: machineData.rcval2,
              rctime: machineData.rctime,
            };
        await authRequest.patch(
          `http://localhost:8000/manual/${machineData.id}`,
          data
        );
        setIsOperating(!isOperating);
        console.log(
          isOperating
            ? '기기 가동이 정지되었습니다.'
            : '기기 조작이 성공적으로 완료되었습니다.',
          data
        );
        alert(
          isOperating
            ? '기기 가동이 정지되었습니다.'
            : '기기 조작이 성공적으로 완료되었습니다.'
        );
      } catch (error) {
        console.error('기기 조작에 실패했습니다.', error);
        alert('기기 조작에 실패했습니다.');
      }
    }
  };

  if (!machineData) {
    return <div>데이터를 불러오는 중입니다...</div>;
  }

  return (
    <div>
      <h1>수동 조작</h1>
      <div className="mb-4">
        관수 1 시간:{' '}
        <input
          type="number"
          value={machineData.rwtime1}
          onChange={(event) => handleInputChange(event, 'rwtime1')}
          min="0"
          disabled={isOperating}
        />{' '}
        분
      </div>
      <div className="mb-4">
        관수 2 시간:{' '}
        <input
          type="number"
          value={machineData.rwtime2}
          onChange={(event) => handleInputChange(event, 'rwtime2')}
          min="0"
          disabled={isOperating}
        />{' '}
        분
      </div>
      <div className="mb-4">
        액비 1:{' '}
        <input
          type="checkbox"
          checked={machineData.rcval1 === 1}
          onChange={(event) => handleInputChange(event, 'rcval1')}
          disabled={isOperating}
        />
      </div>
      <div className="mb-4">
        액비 2:{' '}
        <input
          type="checkbox"
          checked={machineData.rcval2 === 1}
          onChange={(event) => handleInputChange(event, 'rcval2')}
          disabled={isOperating}
        />
      </div>
      <div className="mb-4">
        액비 작동 시간:{' '}
        <input
          type="number"
          value={machineData.rctime}
          onChange={(event) => handleInputChange(event, 'rctime')}
          min="0"
          disabled={isOperating}
        />{' '}
        분
      </div>
      <button
        onClick={handleToggleButton}
        className={isOperating ? 'bg-red-600' : 'bg-green-600'}
      >
        {isOperating ? '가동 정지' : '가동 시작'}
      </button>
    </div>
  );
};

export default ManualControl;
