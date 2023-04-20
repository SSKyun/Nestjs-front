import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface MachineData {
  device: string;
  umachine_add: string;
  wval1: number;
  wval2: number;
  [key: string]: string | number;
}

const fetchMachineData = async (): Promise<MachineData[]> => {
  const response = await axios.get<MachineData[]>('/json/machineMockData.json');
  return response.data;
};

const DashboardDirectControl = () => {
  const [machineData, setMachineData] = useState<MachineData[]>([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchMachineData();
      setMachineData(data);
    };
    getData();
  }, []);

  return (
    <div>
      {/* <h3 className="mb-4 text-lg font-semibold">수동 조작</h3> */}
      <div className="grid grid-cols-2 gap-4">
        {machineData.map((machine, index) => (
          <React.Fragment key={index}>
            <div
              className={`rounded border p-4 ${
                machine.wval1 ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <p className="text-center text-white">
                Device: {machine.device} 관수 1
              </p>
            </div>
            <div
              className={`rounded border p-4 ${
                machine.wval2 ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <p className="text-center text-white">
                Device: {machine.device} 관수 2
              </p>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default DashboardDirectControl;
