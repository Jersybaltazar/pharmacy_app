import { PrismaClient } from "@prisma/client";
import { CreateProductDTO, UpdateProductDTO, ProductResponse } from "../models/product";

const prisma = new PrismaClient();

export class ProductService {
  static async createProduct(dto: CreateProductDTO): Promise<ProductResponse> {
    const product = await prisma.product.create({
      data: {
        nombre: dto.nombre,
        presentacion: dto.presentacion,
        laboratorio: dto.laboratorio,
        unidad: dto.unidad,
        categorias: {
          create: dto.categoria.map((cat) => ({ categoria: cat })),
        },
        proveedor: dto.proveedor,
        precio_compra: dto.precio_compra,
        precio_venta: dto.precio_venta,
        lote: dto.lote,
        stock:dto.stock
      },
      include: { categorias: true },
    });
    return {
      ...product,
      categoria: product.categorias.map((cat) => cat.categoria),
    };
  }

  static async getProducts(): Promise<ProductResponse[]> {
    const products = await prisma.product.findMany({
      include: { categorias: true },
      orderBy: { createdAt: "desc" },
    });
    return products.map(ProductService.formatProduct);
  }

  static async getProductById(id: string): Promise<ProductResponse | null> {
    const product = await prisma.product.findUnique({
      where: { id },
      include: { categorias: true }, // ✅ Obtener categorías
    });

    if (!product) return null;

    return {
      ...product,
      categoria: product.categorias.map((cat) => cat.categoria),
    };
  }

  static async updateProduct(id: string, dto: UpdateProductDTO): Promise<ProductResponse> {
    const updateData: any = {
      nombre: dto.nombre,
      presentacion: dto.presentacion,
      laboratorio: dto.laboratorio,
      unidad: dto.unidad,
      proveedor: dto.proveedor,
      precio_compra: dto.precio_compra,
      precio_venta: dto.precio_venta,
      lote: dto.lote,
      stock: dto.stock,
    };
  
    if (dto.categoria) {
      updateData.categorias = {
        deleteMany: {}, // Eliminar categorías existentes
        create: dto.categoria.map((cat) => ({ categoria: cat })), // Crear nuevas categorías
      };
    }
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: updateData,
      include: { categorias: true },
    });
    return ProductService.formatProduct(updatedProduct);
  }

  static async deleteProduct(id: string): Promise<void> {
    await prisma.product.delete({ where: { id } });
  }

  // 🔹 Función para convertir Decimal a number
  private static formatProduct(product: any): ProductResponse {
    return {
      ...product,
      precio_compra: Number(product.precio_compra),
      precio_venta: Number(product.precio_venta),
      categoria: product.categorias.map((cat: any) => cat.categoria), 
    };
  }
  
}
  