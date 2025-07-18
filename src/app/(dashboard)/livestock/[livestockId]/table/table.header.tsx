"use client";
import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table } from "@tanstack/react-table";
import { Label } from "@/components/ui/label";
import { LivestockDialog } from "../../forms/LivestockDialog";
import { useDebounce } from "use-debounce"; 
import CreateVaccineForm from "../form/create.vaccine.form";

interface VaccineTableHeaderProps<TData> {
  table: Table<TData>;
}

export function VaccineTableHeader<TData>({
  table,
}: VaccineTableHeaderProps<TData>) {
  const [open, setOpen] = React.useState(false);

  // ✅ Manage input value manually
  const [searchTerm, setSearchTerm] = React.useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  // ✅ Update filter value based on debounce
  useEffect(() => {
    table.getColumn("vaccineName")?.setFilterValue(debouncedSearchTerm);
  }, [debouncedSearchTerm, table]);

  return (
    <div className="flex flex-col gap-4 items:start md:flex-row md:items-center py-4 justify-between w-full border p-2 rounded">
      <div>
        <Label className="font-bold text-base">VACCINATION HISTORY</Label>
      </div>
      <div className="flex flex-wrap md:flex-nowrap gap-6">
        <Input
          placeholder="Search by vaccine name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm text-black bg-white"
        />

        <LivestockDialog
            title="Add New Vaccine"
            description="Add a new vaccine to administer"
            className="rounded-md"
          trigger={
            <Button variant={"destructive"} className="cursor-pointer">
              Create New Vaccine
            </Button>
          }
          open={open}
          onOpenChange={setOpen}
        >
          <CreateVaccineForm onSuccess={() => setOpen(false)}/>
        </LivestockDialog>
      </div>
    </div>
  );
}
