import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5600/api';

export const productService = {
  async getAll() {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data;
  },

  async create(product: ProductCreate) {
    const response = await axios.post(`${API_BASE_URL}/products`, product);
    return response.data;
  },

  async update(id: string, product: ProductUpdate) {
    const response = await axios.put(`${API_BASE_URL}/products/${id}`, product);
    return response.data;
  },

  async delete(id: string) {
    const response = await axios.delete(`${API_BASE_URL}/products/${id}`);
    return response.data;
  }
};

export type ProductCreate = {
  name: string;
  description: string;
  price: number;
  // ... otros campos
};

export type ProductUpdate = Partial<ProductCreate>;