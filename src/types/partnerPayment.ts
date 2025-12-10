export const PartnerPaymentState = {
  pending: 0,
  paid: 1,
} as const;

export type PartnerPaymentState =
  (typeof PartnerPaymentState)[keyof typeof PartnerPaymentState];

export interface PartnerPayment {
  accountId: number;
  paymentId: number;
  minDate: Date;
  maxDate: Date;
  createdAtUtc: Date;
  total: number;
  state: PartnerPaymentState;
  stripeAccountId: string;
  stringTransferId: string | null;
}
