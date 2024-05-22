import React from 'react';

function ButtonBar({handleClick}) {
  const buttonValues = ["Intensity", "Likelihood", "Relevance", "Year", "Country", "Topic", "Region", "City"];

 

  return (
    <div className="button-container">
      {buttonValues.map((value, index) => (
        <button
          key={index}
          type="button"
          className="btn btn-primary custom-buttonAj"
          value={value}
          onClick={() => handleClick(value)} 
        >
          {value}
        </button>
      ))}
    </div>
  );
}

export default ButtonBar;
