import { Separator } from "@/components/ui/separator";
import { CalendarDays } from "lucide-react";
import React from "react";

interface Props {
  all: number;
  returned: number;
  delivered: number;
  pending: number;
}

const OrdersHeader: React.FC<Props> = ({
  all,
  returned,
  delivered,
  pending,
}) => {
  const today = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date());
  return (
    <div className="rounded-md">
      <h2 className="font-semibold text-lg mb-4">ORDERS</h2>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-center bg-white py-6 border rounded-md">
        <div className="flex justify-around items-center">
          <div className="flex flex-col justify-center items-center gap-1">
            <CalendarDays className="text-muted-foreground" />
            <span>{today}</span>
          </div>
          <Separator orientation="vertical" />
        </div>

        <div className="flex justify-around items-center">
          <div>
            <p className="text-muted-foreground text-sm">Total Orders</p>
            <p className="text-xl font-bold">{all}</p>
          </div>
          <Separator orientation="vertical" />
        </div>
        <div className="flex justify-around items-center">
          <div>
            <p className="text-muted-foreground text-sm">
              Delivered orders over time
            </p>
            <p className="text-xl font-bold">{delivered}</p>
          </div>
          <Separator orientation="vertical" />
        </div>

        <div className="flex justify-around items-center">
          <div>
            <p className="text-muted-foreground text-sm">
              Pending orders over time
            </p>
            <p className="text-xl font-bold">{pending}</p>
          </div>
          <Separator orientation="vertical" />
        </div>

        <div className="flex justify-around items-center">
          <div>
            <p className="text-muted-foreground text-sm">Return Orders</p>
            <p className="text-xl font-bold">{returned}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersHeader;
