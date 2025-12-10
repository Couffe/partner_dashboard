import type { ColumnDef } from "@tanstack/react-table";
import type { PartnerPayment } from "@/types/partnerPayment";
import { currencyFormatter } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

export const AllPayoutsColumns: ColumnDef<PartnerPayment>[] = [
  {
    id: "select",
    size: 25,
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="rounded-full"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "minDate",
    header: () => <div className="font-bold">From</div>,
    cell: ({ row }) => {
      const date = new Date(row.getValue("minDate"));
      return date.toLocaleDateString();
    },
  },
  {
    accessorKey: "maxDate",
    header: () => <div className="font-bold text-left">To</div>,
    cell: ({ row }) => {
      const date = new Date(row.getValue("maxDate"));
      return date.toLocaleDateString();
    },
  },

  {
    accessorKey: "total",
    header: () => <div className="font-bold text-center">Total</div>,
    cell: ({ row }) => {
      const total = currencyFormatter.format(
        Number(row.getValue("total")) / 100
      );

      return <div className="text-center">{total}</div>;
    },
  },
  {
    accessorKey: "state",
    header: () => <div className="font-bold text-right">Status</div>,
    cell: ({ row }) => {
      const state = row.getValue("state");

      if (state === 0) {
        return (
          <div className="text-right">
            <Badge variant="pending">Pending</Badge>
          </div>
        );
      } else if (state === 1) {
        return (
          <div className="text-right">
            <Badge variant="complete">Complete</Badge>
          </div>
        );
      }
    },
  },
];
