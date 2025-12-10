import { currencyFormatter } from "@/lib/utils";
import {
  getProductName,
  getStoreLabel,
  StoreType,
  type Transaction,
} from "@/types/transaction";
import type { ColumnDef } from "@tanstack/react-table";

export const TransactionsColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "productId",
    header: () => <div className="font-bold">Product</div>,
    cell: ({ row }) => {
      const id = row.getValue("productId") as string;
      return <span>{getProductName(id)}</span>;
    },
  },
  {
    accessorKey: "store",
    header: () => <div className="font-bold">Platform</div>,
    cell: ({ row }) => {
      const storeId = row.getValue("store") as StoreType;
      return <span>{getStoreLabel(storeId)}</span>;
    },
  },
  {
    accessorKey: "createdAtUtc",
    header: () => <div className="font-bold">Date</div>,
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAtUtc"));
      return date.toLocaleDateString();
    },
  },
  {
    accessorKey: "cost",
    header: () => <div className="font-bold text-center">Price</div>,
    cell: ({ row }) => {
      const price = Number(row.getValue("cost")) / 100;
      return (
        <div className="text-center">{currencyFormatter.format(price)}</div>
      );
    },
  },
  {
    accessorKey: "partnerRate",
    header: () => <div className="font-bold text-center">Rate</div>,
    cell: ({ row }) => {
      const partnerRate = Number(row.getValue("partnerRate"));
      return <div className="text-center">{partnerRate}%</div>;
    },
  },
  {
    id: "revenue",
    accessorFn: (row) => {
      const price = Number(row.cost);
      const partnerRate = Number(row.partnerRate) / 100;
      return Math.floor(price * partnerRate) / 100;
    },
    header: () => <div className="font-bold text-right">Revenue</div>,
    cell: ({ row }) => {
      const price = Number(row.getValue("cost"));
      const partnerRate = Number(row.getValue("partnerRate")) / 100;
      return (
        <div className="text-right">
          {currencyFormatter.format(Math.floor(price * partnerRate) / 100)}
        </div>
      );
    },
  },
];
