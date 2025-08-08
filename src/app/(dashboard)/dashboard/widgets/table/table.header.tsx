"use client";
import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";
import { Label } from "@/components/ui/label";
import { useDebounce } from "use-debounce";

interface ActivitiesTableHeaderProps<TData> {
  table: Table<TData>;
}

export function ActivitiesTableHeader<TData>({
  table,
}: ActivitiesTableHeaderProps<TData>) {
  // ✅ Manage input value manually
  const [searchTerm, setSearchTerm] = React.useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  // ✅ Update filter value based on debounce
  useEffect(() => {
    table.getColumn("invoiceType")?.setFilterValue(debouncedSearchTerm);
  }, [debouncedSearchTerm, table]);

  return (
    <div className="flex flex-col gap-4 items:start md:flex-row md:items-center py-4 justify-between w-full border p-2 rounded">
      <div>
        <Label className="font-bold text-base">Recent Activities</Label>
      </div>
      <div className="flex flex-wrap md:flex-nowrap gap-6">
        <Input
          placeholder="Search by Invoice type..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm text-black bg-white"
        />
      </div>
    </div>
  );
}
