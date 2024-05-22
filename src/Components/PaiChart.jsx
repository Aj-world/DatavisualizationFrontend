import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import '../App.css';

ChartJS.register(ChartDataLabels);

function PaiChart({ Year, Reason }) {
 
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `http://localhost:8888/your-url/${Year}/${Reason}`;
        const response = await axios.get(url);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [Year, Reason]);

  const data = {
    labels: userData.map((data) => data.topic === "" ? "Unknown-Research" : data.topic) || [],
    datasets: [
      {
        backgroundColor: [
          '#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A1FF33', '#FF8C33', '#33FFD1', '#8C33FF',
          '#FFD133', '#33FF8C', '#FF3333', '#33FF57', '#5733FF', '#FF33D1', '#33D1FF', '#D1FF33',
          '#FF5733', '#57FF33', '#3357FF', '#D133FF', '#FFD133', '#33FF57', '#FF3333', '#33D1FF',
          '#FF8C33'
        ],
        label: 'Users Gained',
        data: userData.map((data) => data.intensity) || [],
        borderColor: 'transparent',
        borderWidth: 0,
      },
    ],
    hoverOffset: 40,
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          title: function () {
            return `Year: ${Year}`;
          },
          beforeLabel: function () {
            return `Reason: ${Reason}`;
          },
          label: function (tooltipItem) {
            const dataValue = tooltipItem.raw;
            const total = tooltipItem.dataset.data.reduce((acc, val) => acc + val, 0);
            const percentage = ((dataValue / total) * 100).toFixed(2);
            return `${tooltipItem.label}: ${dataValue} (${percentage}%)`;
          },
          bodyFont: {
            size: 40,
          },
        },
      },
      datalabels: {
        display: (context) => {
          return context.chart.tooltip._active && context.chart.tooltip._active.length ? context.chart.tooltip._active[0].index === context.dataIndex : false;
        },
        formatter: (value, context) => {
          const total = context.dataset.data.reduce((acc, val) => acc + val, 0);
          const percentage = ((value / total) * 100).toFixed(2);
          return `${percentage}%`;
        },
        color: '#fff',
        font: {
          size: 20,
        },
      },
    },
  };

  return (
    <>
      <div className='chart'>
        <Pie id='chart2' data={data} options={options} />
        <Doughnut id='chart1' data={data} options={options} />
      </div>
    </>
  );
}

export default PaiChart;