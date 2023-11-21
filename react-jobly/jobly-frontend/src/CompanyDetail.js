import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "./api";

function CompanyDetail() {
  const [company, setCompany] = useState(null);
  const { handle } = useParams();

  useEffect(() => {
    async function getCompany() {
      const companyData = await JoblyApi.getCompany(handle);
      setCompany(companyData);
    }
    getCompany();
  }, [handle]);

  if (!company) return <div>Loading...</div>;

  return (
    <div>
      <h2>{company.name}</h2>
      <p>{company.description}</p>
      {/* Display more details and jobs here */}
    </div>
  );
}

export default CompanyDetail;
