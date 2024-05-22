import React, { useState } from "react";
import ButtonBar from "./ButtonBar";
import SelectDashboard from "./SelectDashboard";
import ReaserchDashBoard from "./ReaserchDashBoard";
import AreaChart from "./AreaChart";

function ParentOfDBS() {
  const [value, setValue] = useState("City");

  const [Data, setData] = useState("Singapore");
  
  const [result, setresult] = useState("Singapore");

  const handleClick = (value) => {
    setValue(value);
    setData(null);
  };

  const handleDataChangeParent = (value) => {
    setData(value);
  };

  const DashboardHandeler = (result) => {
    setresult(result);
  };

  return (
    <>
      <ButtonBar handleClick={handleClick}></ButtonBar>

      <SelectDashboard
        value={value}
        handleDataChangeParent={handleDataChangeParent}
      >   
      </SelectDashboard>
     
         
       
        
     
      <ReaserchDashBoard value={value} Data={Data} DashboardHandeler={DashboardHandeler}></ReaserchDashBoard>
    </>
  );
}

export default ParentOfDBS;
