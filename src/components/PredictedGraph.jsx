import React from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import '../styles/PredictedGraph.css';

// Register the components for Chart.js
ChartJS.register(...registerables);

const PredictedGraph = () => {
  const data = {
    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
    datasets: [
      {
        label: 'Light Maintenance',
        data: [2, 10, 5, 20, 15, 8, 4],
        backgroundColor: 'rgba(255, 255, 102, 0.2)', 
        borderColor: 'rgba(255,255,102,1)',
        fill: true,
      },
      {
        label: 'Regular Maintenance',
        data: [1, 8, 4, 16, 12, 7, 3],
        backgroundColor: 'rgba(255,127,80,0.2)',
        borderColor: 'rgba(255,127,80,1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Intensive Maintenance',
        data: [0, 6, 3, 14, 10, 5, 2],
        backgroundColor: 'rgba(250, 0, 0, 0.2)',
        borderColor: 'rgba(250, 0, 0, 1)',
        tension: 0.4,
        fill: true,
      }
    ]
  };

  const options = {
    scales: {
      y: {
        stacked: true,
        beginAtZero: true,
        ticks: {
          color: '#fff', 
          font: {
            size: 14, 
          },
        },
        title: {
          display: true,
          text: 'Maintenance Priority',
          color: '#fff', 
          font: {
            size: 16, 
          },
        },
      },
      x: {
        stacked: true,
        ticks: {
          color: '#fff', // makes x-axis tick labels white
          font: {
            size: 14,
          },
        },
        title: {
          display: true,
          text: 'Time of Day',
          color: '#fff', 
          font: {
            size: 16, 
          },
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#fff', 
          font: {
            size: 16, 
          },
          usePointStyle: true,
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        titleFont: {
          size: 14, 
        },
        bodyFont: {
          size: 12, 
        },
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    },
    elements: {
      point: {
        radius: 0
      },
      line: {
        borderWidth: 2 
      }
    },
    responsive: true,
    maintainAspectRatio: false, 
  };
  

  return (

    <div className="predictedGraphContainer">
    <Line data={data} options={options} />
  </div>

  );
};

export default PredictedGraph;