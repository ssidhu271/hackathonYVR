import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import "../styles/PieChart.css";

const IssueTypesPieChart = ({ issueData }) => {
  const data = {
    labels: issueData.labels, // ['Unattended Baggage', 'Waste and Clutter', 'Cleanliness']
    datasets: [{
      data: issueData.values, // [300, 150, 100]
      backgroundColor: [
        'rgba(255, 99, 132, 0.8)', 
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 206, 86, 0.8)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
      ],
      borderWidth: 1,
      cutout: '50%', 
    }]
  };

  const options = {
    responsive: true, 
    maintainAspectRatio: false, 
    plugins: {
      legend: {
        position: 'bottom', 
        labels: {
          color: '#fff', 
          font: {
            size: 14, 
          },
        },
      },
      title: {
        display: true,
        text: 'Distribution of Current Issues',
        color: '#fff',
        font: {
          size: 16,
        },
      },
      // doughnutlabel: {
      //   labels: [
      //     {
      //       text: 'total',
      //       font: {
      //         size: '20'
      //       }
      //     },
      //     {
      //       text: '$2600',
      //       font: {
      //         size: '25'
      //       }
      //     }
      //   ]
      // },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default IssueTypesPieChart;
