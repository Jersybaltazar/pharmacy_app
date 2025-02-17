export interface Product {
    id: string;
    name: string;
    presentation: string;
    unit: string;
    category: string[];
    laboratory: string;
    provider: string;
    purchasePrice: number;
    salePrice: number;
    percentageGain: number;
    lot: string;
  }