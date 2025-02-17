import { Request, Response } from "express";
import { ProductService } from "../services/product.services";

export const ProductController = {
  createProduct: async (req: Request, res: Response) => {
    console.log("Datos recibidos:", req.body);
    try {
      const product = await ProductService.createProduct(req.body);
      res.status(201).json(product);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  getProducts: async (_req: Request, res: Response) => {
    try {
      const products = await ProductService.getProducts();
      res.json(products);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  getProduct: async (req: Request, res: Response) => {
    try {
      const product = await ProductService.getProductById(req.params.id);
      product
        ? res.json(product)
        : res.status(404).json({ error: "Product not found" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  updateProduct: async (req: Request, res: Response) => {
    try {
      const product = await ProductService.updateProduct(req.params.id, req.body);
      res.json(product);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteProduct: async (req: Request, res: Response) => {
    try {
      await ProductService.deleteProduct(req.params.id);
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
};
