import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PAYMENTS } from "@/TestData/TestData";
import { AllPayoutsColumns } from "./AllPayoutsColumns";
import { AllPayoutsTable } from "./AllPayoutsTable";
import type { PartnerPayment } from "@/types/partnerPayment";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import type { OnChangeFn, RowSelectionState } from "@tanstack/react-table";

async function getTableData(): Promise<PartnerPayment[]> {
  // API Call here
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return PAYMENTS.sort((a, b) => b.maxDate.getTime() - a.maxDate.getTime());
}

interface PaymentDetailsProps {
  className?: string;
  setRowSelection: OnChangeFn<RowSelectionState>;
  rowSelection: RowSelectionState;
}

const AllPayouts = ({
  className,
  setRowSelection,
  rowSelection,
}: PaymentDetailsProps) => {
  const [tableData, setTableData] = useState<PartnerPayment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTableData();
        setTableData(data);
      } catch (error) {
        console.error("Failed to fetch payments", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Card className={`${className}`}>
      <CardHeader className="gap-0">
        <p className="text-muted-foreground">Payouts</p>
        <h3 className="font-bold text-2xl">Select a payout</h3>
        <p className="text-muted-foreground">
          Choose a payout from to below to view all transactions
        </p>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Spinner />
        ) : (
          <AllPayoutsTable
            columns={AllPayoutsColumns}
            data={tableData}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default AllPayouts;
