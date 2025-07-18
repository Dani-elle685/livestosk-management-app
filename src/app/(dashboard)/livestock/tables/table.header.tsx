"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LivestockDialog } from "../forms/LivestockDialog";
import AddLivestockForm from "../forms/add-livestock-form";
import { Table } from "@tanstack/react-table";
import { Label } from "@/components/ui/label";
import Link from "next/link";

interface LivestockTableHeaderProps<TData> {
  table: Table<TData>;
}

export function LivestockTableHeader<TData>({
  table,
}: LivestockTableHeaderProps<TData>) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-4 items:start md:flex-row md:items-center py-4 justify-between w-full border p-2 rounded">
      <div className="">
        <Label className="font-bold text-base">ALL ANIMALS</Label>
      </div>
      <div className="flex flex-wrap md:flex-nowrap gap-6">
        <Input
          placeholder="Search by name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Link className="cursor-pointer" href={"/livestock/bulk"}>
          <Button variant={"destructive"} className="cursor-pointer">Add Bulk Animal</Button>
        </Link>
        <LivestockDialog
          trigger={<Button variant={"destructive"} className="cursor-pointer">Add New Animal</Button>}
          open={open}
          onOpenChange={setOpen}
          className="md:max-w-2xl ronded"
        >
          <AddLivestockForm onSuccess={() => setOpen(false)} />
        </LivestockDialog>
      </div>
    </div>
  );
}
