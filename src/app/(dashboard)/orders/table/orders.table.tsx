"use client";
import { TanstackReusableDataTable } from "@/components/TanstackReusableTable.tsx/TanstackReusableTable";
import { Card } from "@/components/ui/card";
import React from "react";
import { Table } from "@tanstack/react-table";
import {  ordersColumns } from "./columns";
import { OrdersTableHeader } from "./table.header";
import { Orders } from "@/infrastructure/orders/dto/orders.dto";

interface Props {
  livestockOrdersData: Orders[];
}

const LivestockOrdersTable: React.FC<Props> = ({
  livestockOrdersData = [],
}) => {
  const [tableInstance, setTableInstance] =
    React.useState<Table<Orders> | null>(null);

  return (
    <Card className="p-4 rounded-md">
      {tableInstance && <OrdersTableHeader table={tableInstance} />}
      <TanstackReusableDataTable
        data={livestockOrdersData ?? []}
        columns={ordersColumns}
        onTableInit={setTableInstance}
      />
    </Card>
  );
};

export default LivestockOrdersTable;
