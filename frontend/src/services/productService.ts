import { ProductFormData } from "../types/product";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getProducts(): Promise<ProductFormData[]> {
  const res = await fetch(`${API_URL}/products`);
  if (!res.ok) throw new Error("Error al obtener productos");
  return res.json();
}

export async function createProduct(product: ProductFormData) {
  const res = await fetch(`${API_URL}/products`, {
    method: "POST",
    body: JSON.stringify(product),
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Error al crear producto");
  return res.json();
}
