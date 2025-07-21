"use client";
import React, { useState } from "react";
import LivestockOrdersTable from "./table/orders.table";
import OrdersHeader from "./components/header";
import TableHeaderTabs from "./components/table.header.tabs";
import { Orders } from "@/infrastructure/orders/dto/orders.dto";

interface Props{
    ordersData:Orders[]
}
const OrdersHome:React.FC<Props> = ({ordersData = []}) => {
  const [tab, setTab] = useState("all");

  const getCount = (orders: Orders[], status: string) =>
    status === "all"
      ? orders.length
      : orders.filter((o) => o.status.toLowerCase() === status).length;

  const counts = {
    all: getCount(ordersData, "all"),
    pending: getCount(ordersData, "pending"),
    delivered: getCount(ordersData, "completed"),
    returned: getCount(ordersData, "returned"),
  };

  const filteredOrders = ordersData.filter((order) => {
    if (tab === "all") return true;
    if (tab === "returns") return order.status.toLowerCase() === "returned";
    return order.status.toLowerCase() === tab;
  });

  return (
    <div className="p-2 flex flex-col gap-3">
      <OrdersHeader
        all={counts.all}
        returned={counts.returned}
        delivered={counts.delivered}
        pending={counts.pending}
      />
      <TableHeaderTabs
        all={counts.all}
        pending={counts.pending}
        completed={counts.delivered}
        returned={counts.returned}
        tab={tab}
        setTab={setTab}
      />
      <LivestockOrdersTable livestockOrdersData={filteredOrders} />
    </div>
  );
};

export default OrdersHome;
