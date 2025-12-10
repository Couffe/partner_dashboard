export const StoreType = {
  steam: 0,
  googlePlay: 1,
  appStore: 2,
} as const;

export type StoreType = (typeof StoreType)[keyof typeof StoreType];

export const STORE_LABELS: Record<StoreType, string> = {
  [StoreType.steam]: "Steam",
  [StoreType.googlePlay]: "Google Play Store",
  [StoreType.appStore]: "Apple App Store",
};

export const getStoreLabel = (store: StoreType) => {
  return STORE_LABELS[store] || "Unknown Store";
};

export interface Transaction {
  id: string;
  store: StoreType;
  productId: string;
  cost: number;
  quantity: number;
  refunded: boolean;
  reward: number | null;
  createdAtUtc: Date;
  partnerAccountId: number | null;
  partnerCode: string | null;
  partnerRate: number | null;
}

export const PRODUCT_NAMES: Record<string, string> = {
  "co.unnamedstudios.bornagain.500medallions": "500 medallions",
  "co.unnamedstudios.bornagain.1000medallions": "1100 medallions",
  "co.unnamedstudios.bornagain.2000medallions": "2300 medallions",
  "co.unnamedstudios.bornagain.5000medallions": "6000 medallions",
};

export const getProductName = (productId: string) => {
  return PRODUCT_NAMES[productId] || "Unknown Product";
};
