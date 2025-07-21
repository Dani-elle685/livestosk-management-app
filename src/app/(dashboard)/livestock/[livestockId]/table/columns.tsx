"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import VaccineTableActions from "./table.actions";
import { LivestockVaccine } from "@/infrastructure/vaccine/dto/vaccine.dto";

export const vaccineColumns: ColumnDef<LivestockVaccine>[] = [
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
    accessorKey: "vaccineName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Vaccine Name
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("vaccineName")}</div>
    ),
  },
  {
    accessorKey: "administeredDate",
    header: "Date Administered",
    cell: ({ row }) => <div>{row.getValue("administeredDate")}</div>,
  },
  {
    accessorKey: "administeredBy",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Administered By
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("administeredBy")}</div>,
  },
  {
    accessorKey: "vaccineNotes",
    header: "Notes",
    cell: ({ row }) => <div>{row.getValue("vaccineNotes")}</div>,
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
    const isCompleted = status.toLowerCase() === "completed";
    return (
      <div className="inline-flex items-center px-2 py-1 rounded border text-sm w-fit gap-2">
        <span
          className={`w-2 h-2 rounded-full ${
            isCompleted ? "bg-green-600" : "bg-red-500"
          }`}
        />
        <span
          className={` capitalize`}
        >
          {status}
        </span>
      </div>
    );
  },
},

  {
    id: "actions",
    header: () => <div className="text-sta">Actions</div>,
    enableHiding: false,
    cell: ({ row }) => {
      const vaccine = row.original;
      return <VaccineTableActions vaccine={vaccine}  />;
    },
  },
];
