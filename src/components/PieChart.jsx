import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import "../styles/PieChart.css";
import APIService from '../services/APIservice.js'

const apiServiceInstance = new APIService();

const IssueTypesPieChart = () => {
  const [issueData, setIssueData] = useState({
    labels: ['Unattended Baggage', 'Waste and Clutter', 'Cleanliness'],
    values: [0, 0, 0], // Initialize with zero until data is fetched
  });

  useEffect(() => {
    const fetchIssueData = async () => {
      try {
        // Use the instance of APIService to fetch data
        const data = await apiServiceInstance.fetchIssueCounts();
        setIssueData({
          labels: Object.keys(data),
          values: Object.values(data),
        });
      } catch (error) {
        console.error('Error fetching issue data:', error);
      }
    };

    fetchIssueData();
}, []);

  const chartData = {
    labels: issueData.labels,
    datasets: [{
      data: issueData.values,
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
    },
  };

  return <Pie data={chartData} options={options} />;
};

export default IssueTypesPieChart;
