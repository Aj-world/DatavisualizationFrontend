import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css'
function SelectDashboard({value ,handleDataChangeParent}) {

  const [Data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = `http://localhost:8888/values/${value}`;
      try {
        const response = await axios.get(url);
        setData(response.data);
        
      } catch (error) {
        setError(error.message);
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [value]);

  return (
    <div id="selctbar">
       
      <select className="form-select" aria-label="Default select example" id="mySelectYear" onChange={(event) => handleDataChangeParent(event.target.value)}>
      <option value="" disabled >Select {value}</option>
      {Data.map((data, index) => (
        <option key={index} value={data}>{data}</option>
      ))}
    </select>
    </div>
  )
}

export default SelectDashboard