import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart } from 'react-google-charts';
import '../App.css';

function MyPieChart({ Year, Reason }) {
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

  const data = [
    ['Topic', 'Intensity'],
    ...userData.map((data) => [
      data.topic === "" ? "Unknown-Research" : data.topic,
      data.intensity,
    ]),
  ];

  const options = {
    title:  `${Year} || ${Reason} ||   Fastest Growing Sectors by % `,
    pieHole: 0.4,
    is3D: false,
  };

  const options1 = {
    title:  `${Year} || ${Reason} ||   Fastest Growing Sectors by % `,
    
    is3D: true,
  };

  return (
    <div className="MyPieChart">
      
      <div className="MyPieChart-e">
        <Chart 
          chartType="PieChart"
          data={data}
          options={options1}
          height={496}
        />
      </div>

      <div className="MyPieChart-e">
        <Chart 
          chartType="PieChart"
          data={data}
          options={options}
          height={496}
        />
      </div>
    </div>
  );
}

export default MyPieChart;
