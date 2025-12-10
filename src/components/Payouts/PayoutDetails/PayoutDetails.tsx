import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { PartnerPayment } from "@/types/partnerPayment";
import type { Transaction } from "@/types/transaction";
import { useEffect, useState } from "react";
import { TRANSACTIONS } from "@/TestData/TestData";
import { currencyFormatter } from "@/lib/utils";
import { TransactionsTable } from "@/components/Dashboard/TransactionDetails/TransactionsTable";
import { TransactionsColumns } from "@/components/Dashboard/TransactionDetails/TransactionsColumns";
import { Spinner } from "@/components/ui/spinner";

interface PayoutDetailsProps {
  className?: string;
  selectedPayout: PartnerPayment | undefined;
}

const PayoutDetails = ({ className, selectedPayout }: PayoutDetailsProps) => {
  const [payoutTransactions, setPayoutTransactions] = useState<Transaction[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchPayoutDetails() {
      if (selectedPayout === undefined) {
        return;
      }

      try {
        setIsLoading(true);
        // API call here
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setPayoutTransactions(
          TRANSACTIONS.filter((transaction) => {
            if (
              transaction.createdAtUtc > selectedPayout.minDate &&
              transaction.createdAtUtc < selectedPayout.maxDate
            ) {
              return transaction;
            }
          })
        );
      } catch (err) {
        console.error(
          "An error occurred fetching transactions for payout",
          err
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchPayoutDetails();
  }, [selectedPayout]);

  if (selectedPayout === undefined) {
    return (
      <Card className={`${className}`}>
        <CardContent className="text-muted-foreground text-center">
          No payout selected
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`${className}`}>
      <CardHeader className="gap-0">
        <p className="text-muted-foreground">
          Selected Payout: {selectedPayout.minDate.toLocaleDateString("en-us")}{" "}
          - {selectedPayout.maxDate.toLocaleDateString("en-us")}
        </p>
        <h3 className="font-bold text-2xl">
          Total Revenue: {currencyFormatter.format(selectedPayout.total / 100)}
        </h3>
        <p className="text-muted-foreground">View all transactions</p>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Spinner />
        ) : (
          <TransactionsTable
            columns={TransactionsColumns}
            data={payoutTransactions}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default PayoutDetails;
