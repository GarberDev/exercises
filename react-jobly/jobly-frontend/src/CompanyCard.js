import React from "react";

function CompanyCard({ company }) {
  return (
    <div>
      <h4>{company.name}</h4>
      <p>{company.description}</p>
      {/* Add more company details here */}
    </div>
  );
}

export default CompanyCard;
