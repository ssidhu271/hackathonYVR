import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const GraphPage = () => {
  const [data, setData] = useState([]);

  const options = {
    scales: {
      x: {
        ticks: {
          color: '#ffffff', 
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)', 
        },
      },
      y: {
        ticks: {
          color: '#ffffff', 
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)', 
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: '#ffffff', 
        },
      },
      tooltip: {
        titleColor: '#ffffff', 
        bodyColor: '#ffffff',
        backgroundColor: 'rgba(0, 0, 0, 0.7)', 
      },
    },
  };
  

  const fetchData = async () => {
    const response = await axios.get('http://localhost:3001/counts');
    setData(response.data);
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 15 * 60 * 1000); 

    return () => clearInterval(intervalId); 
  }, []);

  const chartData = {
    labels: data.map((item) => new Date(item.timestamp).toLocaleString()),
    datasets: [
      {
        label: 'People Count',
        data: data.map((item) => item.peopleCount),
        fill: false,
        backgroundColor: '#ffffff', 
        borderColor: '#4BC0C0', 
        pointBackgroundColor: '#ffffff', 
        pointBorderColor: '#4BC0C0', 
        borderWidth: 2, 
      },
    ],
  };
  

  return <Line data={chartData} options={options} />;

};

export default GraphPage;
