import "server-only";
import { Orders } from "../dto/orders.dto";

export const fetchAllOrdersService = async ()=>{
 const sampleOrders: Orders[] = [
  {
    orderId: "ORD-001",
    buyerName: "Alice Johnson",
    date: "2025-07-18",
    items: "2 cows",
    total: "778.50",
    status: "Completed",
  },
  {
    orderId: "ORD-002",
    buyerName: "Brian Smith",
    date: "2025-07-17",
    items: "1 Goat",
    total: "745.00",
    status: "Pending",
  },
  {
    orderId: "ORD-003",
    buyerName: "Catherine Lee",
    date: "2025-07-16",
    items: "4 Cows",
    total: "764.99",
    status: "Returned",
  },
  {
    orderId: "ORD-004",
    buyerName: "David Kim",
    date: "2025-07-15",
    items: "3 sheeps",
    total: "790.00",
    status: "Completed",
  },
  {
    orderId: "ORD-005",
    buyerName: "Eva Martínez",
    date: "2025-07-14",
    items: "2 goats",
    total: "7120.00",
    status: "Pending",
  },
];

return sampleOrders;
}