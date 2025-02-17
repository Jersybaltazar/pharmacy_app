import { useState } from "react";
import useSWR, { mutate } from "swr";
import { CreateProductDTO, ProductResponse ,UpdateProductDTO} from "../types/product";
import { fetcher } from "../utils/fetcher";

export const useProductMutation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createProduct = async (product: CreateProductDTO) => {
    setLoading(true);
    setError(null);
    const payload = {
      ...product,
      category: product.categoria.join(", "), // Convertimos array a string
    };
    console.log("Enviando payload:", payload);
    try {
      await fetcher("/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // Actualiza la lista de productos en cache
      mutate("/products");
    } catch (err) {
      setError("Error al crear el producto");
    } finally {
      setLoading(false);
    }
  };
  const { data: products, error: fetchError, isLoading } = useSWR<ProductResponse[]>("/products", fetcher);

  const updateProduct = async (id: string, product: UpdateProductDTO) => {
    setLoading(true);
    setError(null);

    try {
      await fetcher(`/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      mutate("/products"); // 🔄 Actualiza la lista de productos
    } catch (err) {
      setError("Error al actualizar el producto");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      await fetcher(`/products/${id}`, { method: "DELETE" });
      mutate("/products"); // 🔄 Actualiza la lista de productos
    } catch (err) {
      setError("Error al eliminar el producto");
    } finally {
      setLoading(false);
    }
  };
  return {
    products: products || [],
    isLoading,
    isError: !!fetchError,
    createProduct,
    updateProduct,
    deleteProduct,
    loading,
    error,
  };
};
