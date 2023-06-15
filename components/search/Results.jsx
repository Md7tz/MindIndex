// Results.js
import React from "react";
import Card from "./Card"
const Results = ({ data }) => {
  return (
    <div className="row row-cols-1 row-cols-md-3 g-4">
      {data.map((result, index) => (
        <div className="col" key={index}>
          <Card result={result}/>
        </div>
      ))}
    </div>
  );
};

export default Results;
