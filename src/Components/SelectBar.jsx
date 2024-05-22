import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

function SelectBar({ handleYearChange, handleReasonChange }) {
  const [years, setYears] = useState([]);
  const [reasons, setReasons] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);

  useEffect(() => {
    const fetchYears = async () => {
      try {
        const yearResponse = await axios.get('http://localhost:8888/getAllYear');
        setYears(yearResponse.data);
      } catch (error) {
        console.error("Error fetching years", error);
      }
    };

    fetchYears();
  }, []);

  useEffect(() => {
    const fetchReasons = async () => {
      if (selectedYear) {
        try {
          const response = await axios.get(`http://localhost:8888/findAllByYear/${selectedYear}`);
        
          const filteredData = response.data
           .map((d) => d)
           .filter((d) => d !== "");
           setReasons(filteredData);
        } catch (error) {
          console.error("Error fetching reasons", error);
        }
      }
    };

    fetchReasons();
  }, [selectedYear]);

  const handleYearChangeInternal = (year) => {
    setSelectedYear(year);
    handleYearChange(year);
  };

  return (
    <div className="container" id="SelectBar" >
       
    <select className="form-select SelectBar1" aria-label="Default select example"  onChange={(event) => handleYearChangeInternal(event.target.value)}>
      <option value="" disabled >Select Year</option>
      {years.map((year, index) => (
        <option key={index} value={year}>{year}</option>
      ))}
    </select>

    <select className="form-select SelectBar1" aria-label="Default select example" onChange={(event) => handleReasonChange(event.target.value)}>
      <option value="" disabled>Select Reason</option>
      {reasons.map((reason, index) => (
        <option key={index} value={reason}>{reason}</option>
      ))}
    </select>
 
</div>
  );
}

export default SelectBar;
 