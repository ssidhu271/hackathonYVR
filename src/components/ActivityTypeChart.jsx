import React from 'react';
import { Bar } from 'react-chartjs-2';
import "../styles/ActivityChart.css";

const ActivityTypeChart = () => {
  const data = {
    labels: ['A-Wing', 'B-Wing', 'C-Wing', 'D-Wing', 'E-Wing'],
    datasets: [
      {
        label: 'Security Screening',
        data: [90, 30, 10, 20, 30],
        backgroundColor: 'rgba(75, 192, 192, 0.8)', 
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.4, 
        fill: true,
      },
      {
        label: 'Misc.',
        data: [40, 200, 20, 30, 80],
        backgroundColor: 'rgba(1, 77, 78, 0.8)', 
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Food Purchases',
        data: [20, 30, 150, 100, 10],
        backgroundColor: 'rgba(192, 192, 75, 0.8)',
        borderColor: 'rgb(192, 192, 75)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Restroom Visits',
        data: [10, 5, 20, 150, 20],
        backgroundColor: 'rgba(147, 112, 219, 0.8)', 
        borderColor: 'rgb(75, 192, 75)', 
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Idling',
        data: [20, 40, 10, 5, 80],
        backgroundColor: 'rgba(198, 97, 24, 0.8)', 
        borderColor: 'rgb(75, 192, 75)', 
        tension: 0.4,
        fill: true,
      }
    ],
  };
  const options = {
    scales: {
      y: {
        stacked: true,
        beginAtZero: true,
        ticks: {
          color: '#fff', 
          font: {
            size: 16, 
          },
        },
        title: {
          display: true,
          text: 'Number of Passengers',
          color: '#fff', 
          font: {
            size: 18, 
          },
        }
      },
      x: {
        stacked: true,
        ticks: {
          color: '#fff', 
          font: {
            size: 16, 
          },
        },
        title: {
          display: true,
          position: 'top',
          text: 'Locations',
          color: '#fff', 
          font: {
            size: 18, 
          },
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: '#fff', 
          position: 'top',
          font: {
            size: 16,
          }
        }
      }
    },
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2, 
  };

  return (
    <div className="activityChartContainer">
      <Bar data={data} options={options} />
    </div>
  );
};

export default ActivityTypeChart;