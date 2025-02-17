import { create } from "zustand";
import { Product } from "../types/product";
import { getProducts } from "@/services/productService";

type ProductState = {
  products: Product[];
  fetchProducts: () => Promise<void>;
};

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  fetchProducts: async () => {
    const products = await getProducts();
    set({ products });
  },
}));
