import React from "react";

function JobCard({ job }) {
  return (
    <div>
      <h4>{job.title}</h4>
      <p>Salary: {job.salary}</p>
      <p>Equity: {job.equity}</p>
      {/* Add more job details here */}
    </div>
  );
}

export default JobCard;
