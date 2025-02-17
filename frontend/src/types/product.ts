export type ProductFormData = {
    nombre: string;
    presentacion: string;
    unidad: string;
    categoria: string[]; 
    laboratorio: string;
    proveedor: string;
    precio_compra: number;
    precio_venta: number;
    lote: string;
    stock: number;
  };
  
  export type CreateProductDTO = Omit<ProductFormData, "category"> & {
    categoria: string[]; // Enviar como string concatenado
  };
  
  export type ProductResponse = ProductFormData & {
    id: string;
    createdAt: Date;
    updatedAt: Date;
  };
  
  export type UpdateProductDTO = Partial<ProductFormData> & {
  id: string; // Necesario para identificar el producto a actualizar
};