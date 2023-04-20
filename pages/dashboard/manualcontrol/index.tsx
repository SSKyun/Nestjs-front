import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { UMachine } from '@/pages/dashboard/interfaces/umachine';
import authRequest from '@/utils/request/authRequest';
import { MachineData } from '@/pages/dashboard/interfaces/machineData';
import Link from 'next/link';

const DashboardManualControl = () => {
  const [umachines, setUMachines] = useState<UMachine[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchUMachines = async () => {
      try {
        const response = await authRequest.get<UMachine[]>(
          'http://localhost:8000/machine'
        );
        setUMachines(response.data);
        let machineNumber = response.data.length;
        if (response.data) {
          const res = await authRequest
            .get('http://localhost:8000/auth')
            .then((res) => {
              authRequest.patch(`http://localhost:8000/auth/${res.data.id}`, {
                umachine_num: machineNumber,
              });
            });
        }

        console.log(response.data.length);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUMachines();
  }, []);

  const handleClick = async (umachine: UMachine) => {
    try {
      const userMachines = await authRequest.get<MachineData[]>(
        'http://localhost:8000/manual'
      );

      const existingMachine = userMachines.data.find(
        (machine) => machine.device === umachine.device
      );

      if (!existingMachine) {
        await authRequest.post('http://localhost:8000/manual', {
          device: umachine.device,
        });
        console.log('새로운 기기 데이터 생성');
      }

      setTimeout(() => {
        router.push(
          `/dashboard/manualcontrol/${umachine.id}?device=${umachine.device}`
        );
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="mb-4 text-2xl">기기 목록</h1>
      <div className="w-full max-w-2xl">
        {umachines.map((umachine) => (
          <div
            key={umachine.id}
            className="mb-4 cursor-pointer rounded border border-gray-200 bg-white p-4"
            onClick={() => handleClick(umachine)}
          >
            <div className="font-bold">{umachine.device}</div>
            <div>{umachine.m_address}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardManualControl;
