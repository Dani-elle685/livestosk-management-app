"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, EyeIcon } from "lucide-react";
import OrdersTableActions from "./orderstable.actions";
import { Orders } from "@/infrastructure/orders/dto/orders.dto";

export const ordersColumns: ColumnDef<Orders>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "orderId",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Order Id
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("orderId")}</div>
    ),
  },
  {
    accessorKey: "buyerName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Buyer Name
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("buyerName")}</div>
    ),
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("date")}</div>,
  },
  {
    accessorKey: "items",
    header: "Items",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("items")}</div>
    ),
  },
  {
    accessorKey: "total",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total Amount (KES)
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="uppercase t">{row.getValue("total")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const isCompleted = status.toLowerCase();
      return (
        <div className="inline-flex items-center px-2 py-1 rounded border text-sm w-fit gap-2">
          <span
            className={`w-2 h-2 rounded-full ${
              isCompleted === "completed"
                ? "bg-green-600"
                : isCompleted === "pending"
                ? "bg-gray-600"
                : "bg-red-500"
            }`}
          />
          <span className={` capitalize`}>{status}</span>
        </div>
      );
    },
  },

  {
    id: "actions",
    header: () => <div className="text-sta">Actions</div>,
    enableHiding: false,
    cell: ({ row }) => {
      const order = row.original;
      return <OrdersTableActions order={order} />;
    },
  },
];
