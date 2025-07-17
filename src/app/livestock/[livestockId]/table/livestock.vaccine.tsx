"use client";
import { TanstackReusableDataTable } from "@/components/TanstackReusableTable.tsx/TanstackReusableTable";
import { Card } from "@/components/ui/card";
import React from "react";
import { vaccineColumns } from "./columns";
import { LivestockVaccine } from "@/infrastructure/vaccine/dto/vaccine.dto";
import { VaccineTableHeader } from "./table.header";
import { Table } from "@tanstack/react-table";

interface Props {
  livestockVaccineData: LivestockVaccine[];
}

const LivestockVaccineTable: React.FC<Props> = ({ livestockVaccineData }) => {
  const [tableInstance, setTableInstance] =
    React.useState<Table<LivestockVaccine> | null>(null);

  return (
    <Card className="p-4 rounded-md">
      {tableInstance && <VaccineTableHeader table={tableInstance} />}
      <TanstackReusableDataTable
        data={livestockVaccineData ?? []}
        columns={vaccineColumns}
        onTableInit={setTableInstance}
      />
    </Card>
  );
};

export default LivestockVaccineTable;
