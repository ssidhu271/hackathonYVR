import React from 'react';
import { Bar } from 'react-chartjs-2';

const ActivityTypeChart = () => {
  const data = {
    labels: ['Near Bathroom', 'Security Checkpoint', 'Food Court', 'Lounge'],
    datasets: [
      {
        label: 'Restroom Visits',
        data: [90, 30, 10, 20],
        backgroundColor: 'blue',
      },
      {
        label: 'Security Screening',
        data: [40, 200, 20, 30],
        backgroundColor: 'red',
      },
      {
        label: 'Food Purchases',
        data: [20, 30, 150, 100],
        backgroundColor: 'green',
      },
      {
        label: 'Lounge Stays',
        data: [10, 5, 20, 150],
        backgroundColor: 'purple',
      }
    ],
  };

  const options = {
    scales: {
      y: {
        stacked: true,
        beginAtZero: true,
      },
      x: {
        stacked: true,
      }
    }
  };

  return (
    <Bar data={data} options={options} />
  );
};

export default ActivityTypeChart;
