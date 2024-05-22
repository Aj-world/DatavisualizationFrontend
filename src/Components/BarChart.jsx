import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import '../App.css';

function BarChart({ Year, Reason }) {
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
    labels: userData.map((data) => data.topic === "" ? "Unknown-Research" : data.topic),
    datasets: [
      {
        backgroundColor: "rgb(50, 180, 0)",
        barPercentage: 0.9,
        barThickness: 50,
        maxBarThickness: 55,
        minBarThickness: 2,
        minBarLength: 2,
        label: `${Year} || ${Reason} ||   Fastest Growing Sectors by Intensity`,
        data: userData.map((data) => data.intensity),
        hoverOffset: 90,
        hoverBackgroundColor: "rgb(195, 0, 255)",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          title: () => `Year: ${Year}`,
          beforeLabel: () => `Reason: ${Reason}`,
          label: (tooltipItem) => `Intensity: ${tooltipItem.raw}`,
        },
        bodyFont: {
          size: 20,
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <Bar data={data} options={options} />
    </div>
  );
}

export default BarChart;
