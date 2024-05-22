import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import SelectBar from './Components/SelectBar'
import BarChart from './Components/BarChart';

import PaiChart from './Components/PaiChart';
import ParentOfDBS from './Components/ParentOfDBS';
import MapChart from './Components/MapChart';

function App() {
  const [Year, setSelectedYear] = useState(2022);
  const [Reason, setSelectedReason] = useState("Northern America");

   const handleYearChange = (selectedYear) => {
     
     setSelectedYear(selectedYear);

  };

  const handleReasonChange = (selectedReason) => {

   
     setSelectedReason(selectedReason);
  };


  return (
    <>
    <Navbar></Navbar>
     <div id='Aj5'>  
      
      <SelectBar  handleYearChange={handleYearChange} handleReasonChange={handleReasonChange} ></SelectBar>
      <div id="Aj4"><BarChart Year={Year} Reason={Reason}></BarChart></div>

      <MapChart Year={Year} Reason={Reason}/>
       <ParentOfDBS Year={Year} Reason={Reason}></ParentOfDBS> 
       
    </div>

       

    </>
    
  );
}


export default App
