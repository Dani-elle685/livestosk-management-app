import React from "react";
import { EyeIcon } from "lucide-react";
import { LivestockDialog } from "../../livestock/forms/LivestockDialog";
import ViewOrdersTable from "./view.orders.table";
import { Orders } from "@/infrastructure/orders/dto/orders.dto";

interface Props {
  order: Orders;
}

const OrdersTableActions: React.FC<Props> = ({ order }) => {
  const [openConfirm, setOpenConfirm] = React.useState(false);
  return (
    <div className="flex items-center gap-2 mb-3">
      <LivestockDialog
        title="View Order Details"
        description="Your order details"
        trigger={
          <EyeIcon
            className={`text-gray-700 cursor-pointer`}
            height={16}
            width={16}
          />
        }
        open={openConfirm}
        onOpenChange={setOpenConfirm}
        className="max-w-md"
      >
        <ViewOrdersTable order={order} onClose={() => setOpenConfirm(false)} />
      </LivestockDialog>
    </div>
  );
};

export default OrdersTableActions;
