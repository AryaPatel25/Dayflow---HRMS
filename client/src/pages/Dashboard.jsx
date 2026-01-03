import React, { useState } from "react";
import Search from "../components/Search.jsx";
import EmployeeCard from "../components/EmployeeCard.jsx";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <EmployeeCard searchQuery={searchQuery} />
    </>
  );
};

export default Dashboard;
