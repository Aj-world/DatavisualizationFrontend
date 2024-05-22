import React, { useState, useEffect } from "react";
import '../App.css'
function ReaserchDashBoard({ value, Data ,DashboardHandeler}) {
  const buttonValues = [
    "Intensity",
    "Likelihood",
    "Relevance",
    "Year",
    "Country",
    "Topic",
    "Region",
    "City",
  ];

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      
      try {
        let response;
       
        switch (value) {
          case "Intensity":
            response = await fetch(`http://localhost:8888/data/by-intensity/${Data}`);
            break;
          case "Likelihood":
            response = await fetch(`http://localhost:8888/data/by-likelihood/${Data}`);
            break;
          case "Relevance":
            response = await fetch(`http://localhost:8888/data/by-relevance/${Data}`);
            break;
          case "Year":
            response = await fetch(`http://localhost:8888/data/by-year/${Data}`);
            break;
          case "Country":
            response = await fetch(`http://localhost:8888/data/by-country/${Data}`);
            break;
          case "Topic":
            response = await fetch(`http://localhost:8888/data/by-topic/${Data}`);
            break;
          case "Region":
            response = await fetch(`http://localhost:8888/data/by-region/${Data}`);
            break;
          case "City":
            response = await fetch(`http://localhost:8888/data/by-city/${Data}`);
            break;
          default:
            // Handle default case
            break;
        }
        const result = await response.json();
        setData(result);
        DashboardHandeler(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [value, Data]);

  return (
    <div id="ReaserchDashBoard" >
      <div id="Selected"><h1>Selected items : {value}//{Data}</h1></div>
      <div className="heading-bar " >
        {buttonValues.map((value, index) => (
          <div key={index} className="heading-item">
            {value}
          </div>
        ))}
      </div>

      {isLoading ? (
        <p>Loading data...</p>
      ) : (
        <div className="data-list">
          {data.map((item, index) => (
            <div key={index} className="data-item">
              <li>{item.intensity}</li>
              <li>{item.likelihood}</li>
              <li>{item.relevance}</li>
              <li>{item.year}</li>
              <li>{item.country}</li>
              <li>{item.topic}</li>
              <li>{item.region}</li>
              <li>{item.city}</li>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ReaserchDashBoard;
