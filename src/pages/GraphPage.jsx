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
import moment from 'moment';

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
  const [peopleData, setPeopleData] = useState([]);
  const [luggageData, setLuggageData] = useState([]);

  const graphContainerStyle = {
    marginLeft: '250px',
    padding: '20px',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    borderRadius: '20px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    maxWidth: 'calc(100% - 250px)', 
    boxSizing: 'border-box',
    width: '80%',
    margin: '0 auto', 
  };

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
    
    backgroundColor: 'rgba(0, 0, 0, 0.9)', 
    maintainAspectRatio: false,
  };

  

  const fetchData = async () => {
    try {
      const [peopleResponse, luggageResponse] = await Promise.all([
        axios.get('http://localhost:3001/people-counts'),
        axios.get('http://localhost:3001/luggage-counts')
      ]);
      setPeopleData(peopleResponse.data);
      setLuggageData(luggageResponse.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 1000); 

    return () => clearInterval(intervalId); 
  }, []);

  const chartData = {
    labels: peopleData.map(item => moment(item.rounded_timestamp).format('YYYY-MM-DD HH:mm')),
    datasets: [
      {
        label: 'People Count',
        data: peopleData.map(item => item.avgPeopleCount),
        borderColor: '#4BC0C0',
        backgroundColor: '#4BC0C0',
        fill: false,
        borderWidth: 2,
      },
      {
        label: 'Luggage Count',
        data: luggageData.map(item => item.avgLuggageCount),
        borderColor: '#ff0000',
        backgroundColor: '#ff0000',
        fill: false,
        borderWidth: 2,
      }
    ],
  };
  

  return (
    <div style={graphContainerStyle}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default GraphPage;
