import { useEffect, useState } from "react";
import { PAYMENTS, TRANSACTIONS } from "../../TestData/TestData";
import PartnerCode from "./SmallCards/PartnerCode";
import PartnerRate from "./SmallCards/PartnerRate";
import RevenueChart from "./RevenueChart/RevenueChart";
import type { Transaction } from "@/types/transaction";
import NextPayment from "./SmallCards/NextPayment";
import type { PartnerPayment } from "@/types/partnerPayment";
import { TransactionsTable } from "./TransactionDetails/TransactionsTable";
import { TransactionsColumns } from "./TransactionDetails/TransactionsColumns";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Spinner } from "../ui/spinner";

const MainGrid = () => {
  const [payments, setPayments] = useState<PartnerPayment[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setIsLoading(true);
        // API call here
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setPayments(PAYMENTS);
        setTransactions(TRANSACTIONS);
      } catch (error) {
        console.error("Failed to fetch transactions", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="grid gap-4 grid-cols-4 md:grid-cols-8 lg:grid-cols-12 lg:mx-25">
      <h2 className="font-semibold text-xl mb-4 col-span-full">Overview</h2>

      <div className="col-span-full grid gap-4 grid-cols-4 md:grid-cols-8 lg:grid-cols-12">
        <PartnerCode className="col-span-4 lg:col-span-3" />
        <PartnerRate className="col-span-4 lg:col-span-3" />
        <NextPayment payments={payments} className="col-span-4 lg:col-span-3" />
      </div>

      <RevenueChart
        transactions={transactions}
        isLoading={isLoading}
        className="col-span-full"
      />

      <h2 className="font-semibold text-xl my-4 col-span-full">
        Recent Transactions
      </h2>
      <Card className="col-span-full">
        <CardHeader className="gap-0">
          <p className="text-muted-foreground">Last 30 Days</p>
          <h3 className="font-bold text-2xl">Recent Activity</h3>
          <p className="text-muted-foreground">
            Recent transactions using your partner code
          </p>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Spinner />
          ) : (
            <TransactionsTable
              columns={TransactionsColumns}
              data={transactions}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MainGrid;
