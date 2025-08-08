"use client";
import { TanstackReusableDataTable } from "@/components/TanstackReusableTable.tsx/TanstackReusableTable";
import { Card } from "@/components/ui/card";
import React from "react";
import { Table } from "@tanstack/react-table";
import { ActivitiesTableHeader } from "./table.header";
import { recentActivitiesColumns } from "./columns";
import { RecentAcivity } from "@/infrastructure/dashboard/dto/recent.activities.dto";

interface Props {
  recentActivityData: RecentAcivity[];
}

const RecentActivitiesTable: React.FC<Props> = ({
  recentActivityData = [],
}) => {
  const [tableInstance, setTableInstance] =
    React.useState<Table<RecentAcivity> | null>(null);

  return (
    <Card className="p-4 rounded-md">
      {tableInstance && <ActivitiesTableHeader table={tableInstance} />}
      <TanstackReusableDataTable
        data={recentActivityData ?? []}
        columns={recentActivitiesColumns}
        onTableInit={setTableInstance}
      />
    </Card>
  );
};

export default RecentActivitiesTable;
