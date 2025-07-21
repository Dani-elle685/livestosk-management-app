import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

interface Props {
  all: number;
  pending: number;
  completed: number;
  returned: number;
  tab: string;
  setTab: (value: string) => void;
}

const TableHeaderTabs: React.FC<Props> = ({
  all,
  pending,
  completed,
  returned,
  tab,
  setTab,
}) => {
  return (
    <Tabs
      defaultValue="all"
      value={tab}
      onValueChange={setTab}
      className="p-3 bg-white border rounded-md overflow-x-auto "
    >
      <TabsList className="flex gap-2">
        <TabsTrigger value="all" className="w-full sm:w-auto cursor-pointer">
          All ({all})
        </TabsTrigger>
        <TabsTrigger
          value="pending"
          className="w-full sm:w-auto cursor-pointer"
        >
          Pending ({pending})
        </TabsTrigger>
        <TabsTrigger
          value="completed"
          className="w-full sm:w-auto cursor-pointer"
        >
          Completed ({completed})
        </TabsTrigger>
        <TabsTrigger
          value="returns"
          className="w-full sm:w-auto cursor-pointer"
        >
          Returns ({returned})
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default TableHeaderTabs;
