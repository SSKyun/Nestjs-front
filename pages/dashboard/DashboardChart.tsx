import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { groupBy } from 'lodash';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'chart.js/auto';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface LogData {
  l_id: number;
  mc_id: string;
  sc_id: string;
  umachine_id: string;
  operation_type: '관수1' | '관수2';
  operation_time: number;
  start_time: string;
  end_time: string;
}

interface ChartData {
  [machineId: string]: {
    [date: string]: {
      관수1: number;
      관수2: number;
    };
  };
}

function processChartData(data: LogData[], selectedDate: Date): ChartData {
  const now = new Date();
  const lastWeek = new Date(selectedDate);
  lastWeek.setDate(lastWeek.getDate() - 8);

  const yesterday = new Date(selectedDate);
  yesterday.setDate(yesterday.getDate() - 1);

  const filteredData = data.filter(
    (log) =>
      new Date(log.start_time) >= lastWeek &&
      new Date(log.start_time) <= yesterday
  );
  const groupedData = groupBy(filteredData, 'umachine_id');

  const chartData: ChartData = {};

  for (const machineId in groupedData) {
    const dailyData: Record<string, { 관수1: number; 관수2: number }> = {};
    // 초기화
    for (
      let d = new Date(lastWeek);
      d <= yesterday;
      d.setDate(d.getDate() + 1)
    ) {
      const date = d.toISOString().split('T')[0];
      dailyData[date] = { 관수1: 0, 관수2: 0 };
    }

    groupedData[machineId].forEach((log) => {
      const date = new Date(log.start_time).toISOString().split('T')[0];

      if (!dailyData[date]) {
        dailyData[date] = { 관수1: 0, 관수2: 0 };
      }

      dailyData[date][log.operation_type] += log.operation_time;
    });

    chartData[machineId] = dailyData;
  }

  return chartData;
}

const backgroundColors = ['rgba(75, 192, 192, 0.2)', 'rgba(255, 206, 86, 0.2)'];

const borderColors = ['rgba(75, 192, 192, 1)', 'rgba(255, 206, 86, 1)'];

const createChartData = (
  dailyData: { [date: string]: { 관수1: number; 관수2: number } } | undefined,
  index: number
) => {
  if (!dailyData) {
    return {
      labels: [],
      datasets: [],
    };
  }

  const labels = Object.keys(dailyData);
  const 관수1Data = labels.map((date) => dailyData[date].관수1);
  const 관수2Data = labels.map((date) => dailyData[date].관수2);

  return {
    labels,
    datasets: [
      {
        label: '관수1',
        data: 관수1Data,
        backgroundColor: backgroundColors[index % backgroundColors.length],
        borderColor: borderColors[index % borderColors.length],
        borderWidth: 1,
        fill: false,
      },
      {
        label: '관수2',
        data: 관수2Data,
        backgroundColor:
          backgroundColors[(index + 1) % backgroundColors.length],
        borderColor: borderColors[(index + 1) % borderColors.length],
        borderWidth: 1,
        fill: false,
      },
    ],
  };
};

const DashboardChart: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [chartData, setChartData] = useState<ChartData>({});
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    const today = new Date();
    return today;
  });

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/json/logMockData.json');
        const responseData = response.data;
        if (Array.isArray(responseData.operation_logs)) {
          const chartData = processChartData(
            responseData.operation_logs,
            selectedDate
          );
          setChartData(chartData);
        } else {
          console.error(
            '응답 데이터의 operation_logs가 배열이 아닙니다:',
            responseData
          );
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [selectedDate]);

  const filteredKeys = Object.keys(chartData).sort();

  return (
    <div className="flex w-full flex-col items-center">
      <div className="mb-4 flex items-center">
        <h2 className="text-2xl font-bold">최근 7일 분사량</h2>
      </div>
      <div className="mb-4 flex items-center">
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="yyyy-MM-dd"
          maxDate={new Date()}
          className="ml-4 rounded border py-1 px-2 text-black"
        />
      </div>
      <div className="w-full max-w-lg">
        <div className="relative h-96 w-full max-w-lg">
          <h2 className="mb-4 text-2xl font-bold">{`제어기 ${filteredKeys[currentIndex]}`}</h2>
          <Line
            data={createChartData(
              chartData[filteredKeys[currentIndex]],
              currentIndex
            )}
            options={{
              layout: {
                padding: {
                  top: 20,
                  bottom: 20,
                },
              },
              plugins: {
                title: {
                  display: true,
                  font: {
                    size: 20,
                  },
                  padding: {
                    top: 10,
                    bottom: 30,
                  },
                },
                legend: {
                  labels: {
                    font: {
                      size: 14,
                    },
                  },
                },
              },
              scales: {
                x: {
                  grid: {
                    display: false,
                  },
                  ticks: {
                    font: {
                      size: 12,
                    },
                  },
                },
                y: {
                  beginAtZero: true,
                  grid: {
                    color: 'rgba(0, 0, 0, 0.1)',
                  },
                  ticks: {
                    font: {
                      size: 12,
                    },
                  },
                },
              },
            }}
          />
          <button
            onClick={() =>
              setCurrentIndex((prevIndex) =>
                prevIndex === 0 ? filteredKeys.length - 1 : prevIndex - 1
              )
            }
            className="absolute left-0 top-1/2 -translate-y-1/2 transform cursor-pointer border-none bg-transparent focus:outline-none"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={() =>
              setCurrentIndex((prevIndex) =>
                prevIndex === filteredKeys.length - 1 ? 0 : prevIndex + 1
              )
            }
            className="absolute right-0 top-1/2 -translate-y-1/2 transform cursor-pointer border-none bg-transparent focus:outline-none"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardChart;
