import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

const DashboardOperationHistory: React.FC = () => {
  const [logData, setLogData] = useState<LogData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const logsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/json/logMockData.json');
        const responseData = response.data;
        if (Array.isArray(responseData.operation_logs)) {
          setLogData(responseData.operation_logs);
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
  }, []);

  const handlePageClick = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const indexOfLastLog = (currentPage + 1) * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = logData.slice(indexOfFirstLog, indexOfLastLog);

  const maxPagesToShow = 5;
  const totalPages = Math.min(
    Math.ceil(logData.length / logsPerPage),
    maxPagesToShow
  );

  return (
    <div className="dashboard-operation-history">
      <h2 className="mb-4 text-2xl font-bold">작동 이력</h2>
      <div className=" overflow-y-auto">
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="border px-4 py-2">시작 시간</th>
              <th className="border px-4 py-2">끝 시간</th>
              <th className="border px-4 py-2">작동 시간</th>
              <th className="border px-4 py-2">작동 유형</th>
            </tr>
          </thead>
          <tbody>
            {currentLogs.map((log) => (
              <tr key={log.l_id} className="h-10">
                <td className="border px-4 py-2">{log.start_time}</td>
                <td className="border px-4 py-2">{log.end_time}</td>
                <td className="border px-4 py-2">{log.operation_time}분</td>
                <td className="border px-4 py-2">{log.operation_type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`mx-1 px-4 py-1 ${
              currentPage === index ? 'bg-blue-600 text-white' : 'bg-white'
            }`}
            onClick={() => handlePageClick(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DashboardOperationHistory;
