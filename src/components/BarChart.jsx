import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import "../styles/BarChart.css";


const BarChart = ({ markers }) => {
  const chartData = {
    labels: markers.map(marker => marker.id),
    datasets: [{
      label: 'People Count',
      data: markers.map(marker => marker.peopleCount),
      backgroundColor: 'rgba(75, 192, 192, 0.6)', 
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 2
    }]
  };
  

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#fff',
          stepSize: 10, 
          max: 500, 
          font: {
            size: 12, 
          },
        },
        title: {
          display: true,
          text: 'Number of People',
          color: '#fff',
        font: {
          size: 14,
        },
        },
      },
      x: {
        ticks: {
          color: '#fff', 
          font: {
            size: 12, 
          },
        },
        title: {
          display: true,
          text: 'Camera ID',
          color: '#fff',
          font: {
            size: 14,
          },
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: '#fff', 
          font: {
            size: 14, 
          },
        },
      },
      title: {
        display: true,
        text: 'Population Density by CameraID',
        color: '#fff',
        font: {
          size: 16,
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div style={{ height: '300px', width: '100%' }}> 
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
