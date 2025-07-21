import React, { Suspense } from "react";
import OrdersHome from "./orders.home";
import { fetchAllOrdersService } from "@/infrastructure/orders/services/fetch.all.orders.services";

const OrdersPage = () => {
  return (
    <Suspense fallback={<div>Loading Orders....</div>}>
      <FetchData />
    </Suspense>
  );
};

export default OrdersPage;

const FetchData = async () => {
  const ordersData = await fetchAllOrdersService();
  return <OrdersHome ordersData={ordersData} />;
};
