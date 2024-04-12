import React from 'react';
import { Line } from 'react-chartjs-2';
import '../styles/PredictedGraph.css';

const PredictedGraph = () => {
  const data = {
    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
    datasets: [
      {
        label: 'Predicted Maintenance Needs',
        data: [2, 10, 5, 20, 15, 8, 4],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Intensity of Maintenance Needs'
        },
        ticks: {
          callback: function(value, index, values) {
            return value + ' units'; 
          }
        }
      },
      x: {
        title: {
          display: true,
          text: 'Time of Day'
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          usePointStyle: true, 
        }
      }
    }
  };

  return (
    <div className="predictedGraphContainer">
      <h2>Predicted Maintenance Hotspots</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default PredictedGraph;
