import React from "react";
import AllActivitiesTable from "./AllActivitiesTable";
import UserCountriesData from "./UserCountries";
import GraphChart from "./GraphChart";
import RevenueSummaryCard from "./RevenueSummaryCard";

const DashboardHome = () => {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <RevenueSummaryCard />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
        <div className="lg:col-span-2">
          <GraphChart />
        </div>
        <div>
          <UserCountriesData />
        </div>
      </div>
      <div>
        <AllActivitiesTable />
      </div>
    </div>
  );
};

export default DashboardHome;
