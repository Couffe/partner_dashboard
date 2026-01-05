import { Card, CardHeader } from "@/components/ui/card";
import { currencyFormatter } from "@/lib/utils";
import type { PartnerPayment } from "@/types/partnerPayment";
import { useEffect, useState } from "react";
import { PARTNER, TRANSACTIONS } from "@/TestData/TestData";

interface EstimatedPayout {
  minDate: Date;
  maxDate: Date;
  total: number;
}

interface NextPaymentProps {
  payments: PartnerPayment[];
  className?: string;
}

async function getEstimatedPayout(): Promise<EstimatedPayout> {
  const lastPayment = PARTNER.lastPaymentDate;
  const now = new Date();

  const recentPayments = TRANSACTIONS.filter((transaction) => {
    const tDate = new Date(transaction.createdAtUtc);
    if (lastPayment) {
      return tDate >= lastPayment;
    }
  }).reduce((sum, transaction) => {
    return sum + transaction.cost;
  }, 0);

  if (lastPayment) {
    return {
      minDate: lastPayment,
      maxDate: now,
      total: recentPayments,
    };
  } else {
    return {
      minDate: new Date(),
      maxDate: now,
      total: recentPayments,
    };
  }
}

const NextPayment = ({ className }: NextPaymentProps) => {
  const [estimatedPayout, setEstimatedPayout] = useState<EstimatedPayout>();

  useEffect(() => {
    async function fetchEstimatedPayout() {
      const estimatedPayoutData = await getEstimatedPayout();

      setEstimatedPayout(estimatedPayoutData);
    }

    fetchEstimatedPayout();
  }, []);

  return (
    <Card className={`${className}`}>
      <CardHeader className="gap-0">
        <p className="text-muted-foreground">Current Earnings</p>
        <div className="flex flex-row gap-4">
          {estimatedPayout ? (
            <div className="flex flex-row gap-2">
              <h3 className="font-bold text-2xl">
                {` ${currencyFormatter.format(
                  Number(estimatedPayout.total / 100)
                )}`}
              </h3>
            </div>
          ) : (
            <h3>No current earnings found.</h3>
          )}
        </div>
        {estimatedPayout ? (
          <>
            <p className="text-muted-foreground">
              Since {new Date(estimatedPayout?.minDate).toLocaleDateString()}
            </p>
          </>
        ) : (
          ""
        )}
      </CardHeader>
    </Card>
  );
};

export default NextPayment;
