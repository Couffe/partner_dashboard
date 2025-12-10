export interface Partner {
  accountId: number;
  name: string;
  rate: number;
  promoRate: number | null;
  promoExpiration: Date | null;
  createdAtUtc: Date;
  nextPaymentId: number;
  lastPaymentDate: Date | null;
  stripeAccountId: string | null;
}

export interface PartnerCode {
  accountId: number;
  code: string;
  createdAtUtc: Date;
}
