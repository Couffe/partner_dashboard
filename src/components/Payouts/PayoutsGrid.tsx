import { useEffect, useState } from "react";
import AllPayouts from "./AllPayoutsTable/AllPayouts";
import { PAYMENTS } from "@/TestData/TestData";
import type { PartnerPayment } from "@/types/partnerPayment";
import { type RowSelectionState } from "@tanstack/react-table";
import PayoutDetails from "./PayoutDetails/PayoutDetails";

const PayoutsGrid = () => {
  const [payouts, setPayouts] = useState<PartnerPayment[]>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const selectedPayoutId = Number(Object.keys(rowSelection)[0]);
  const selectedPayout = payouts.find(
    (payout) => payout.paymentId === selectedPayoutId
  );

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setPayouts(PAYMENTS);
      } catch (err) {
        console.error("An error occurred fetching payments", err);
      }
    };

    fetchPayments();
  }, []);
  return (
    <div className="grid gap-4 grid-cols-4 md:grid-cols-8 lg:grid-cols-12 lg:mx-25">
      <h2 className="font-semibold text-xl mb-4 col-span-full">Payouts</h2>
      <AllPayouts
        className="col-span-full"
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
      />
      <PayoutDetails
        className="col-span-full"
        selectedPayout={selectedPayout}
      />
    </div>
  );
};

export default PayoutsGrid;
