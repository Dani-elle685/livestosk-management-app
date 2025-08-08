import { RecentAcivity } from "../dto/recent.activities.dto";

export const fetchRecentActivities = async (userId: string):Promise<RecentAcivity[]> => {
  return [
    {
      recordId: "REC001",
      date: "2025-08-01",
      invoiceType: "Purchase",
      invoiceNumber: "INV-1001",
      amount: 250.75,
      status: "Completed",
    },
    {
      recordId: "REC002",
      date: "2025-08-02",
      invoiceType: "Sale",
      invoiceNumber: "INV-1002",
      amount: 1200.0,
      status: "Pending",
    },
    {
      recordId: "REC003",
      date: "2025-08-03",
      invoiceType: "Refund",
      invoiceNumber: "INV-1003",
      amount: 150.5,
      status: "Cancelled",
    },
    {
      recordId: "REC004",
      date: "2025-08-04",
      invoiceType: "Purchase",
      invoiceNumber: "INV-1004",
      amount: 780.99,
      status: "Pending",
    },
    {
      recordId: "REC005",
      date: "2025-08-05",
      invoiceType: "Sale",
      invoiceNumber: "INV-1005",
      amount: 450.25,
      status: "Completed",
    },
  ];
}