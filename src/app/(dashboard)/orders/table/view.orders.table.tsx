"use client";
import { ConfirmTable } from "@/components/reusable-components/deleteTableComponent";
import React from "react";
import { Button } from "@/components/ui/button";
import { Orders } from "@/infrastructure/orders/dto/orders.dto";

interface Props {
  order: Orders;
  onClose?: () => void;
}

const ViewOrdersTable: React.FC<Props> = ({ order, onClose }) => {
  return (
    <div className="border flex flex-col gap-3 rounded-md p-2 mb-4">
      <ConfirmTable data={order} />
      <Button
        variant={"outline"}
        onClick={onClose}
        className="hover:bg-transparent cursor-pointer"
      >
        Cancel
      </Button>
    </div>
  );
};

export default ViewOrdersTable;
