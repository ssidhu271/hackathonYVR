import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import "../styles/PieChart.css";


const IssueTypesPieChart = ({ issueData }) => {
  const data = {
    labels: ['Unattended Baggage', 'Waste and Clutter', 'Cleanliness'],
    datasets: [{
      data: [300, 150, 100],
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)', 
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
      ],
      borderWidth: 1
    }]
  };
  

  const options = {
    
    responsive: true, 
    maintainAspectRatio: false, 

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
        text: 'Distribution of Current Issues',
        color: '#fff',
        font: {
          size: 16,
        },
      },
    },
  };

  return <Pie data={data} options={options} />;
};

export default IssueTypesPieChart;
