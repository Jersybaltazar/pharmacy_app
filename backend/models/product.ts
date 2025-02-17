export type CreateProductDTO = {
  nombre: string;
  presentacion: string;
  laboratorio: string;
  unidad: string;
  categoria: string[];
  proveedor: string;
  precio_compra: number;
  precio_venta: number;
  lote: string;
  stock:number
};

export type UpdateProductDTO = Partial<CreateProductDTO>;

export type ProductResponse = {
  id: string;
  nombre: string;
  presentacion: string;
  laboratorio: string;
  unidad: string;
  categoria: string[];
  proveedor: string;
  precio_compra: number;
  precio_venta: number;
  lote: string;
  stock:number
  createdAt: Date;
  updatedAt: Date;
};
