"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Trash2, Edit, Package, Plus } from "lucide-react";
import { useProductMutation } from "../../hooks/useProductMutation";
import { ProductFormModal } from "./productFormModa";
import useSWR from "swr";
import { fetcher } from "../../utils/fetcher";
import { ProductResponse } from "../../types/product";
import * as XLSX from "xlsx";

const ProductList = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState("25");
  const [selectedProduct, setSelectedProduct] =
    useState<ProductResponse | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    data: products,
    error: swrError,
    isLoading,
    mutate,
  } = useSWR<ProductResponse[]>("/products", fetcher);

  const {
    updateProduct,
    deleteProduct,
    loading,
    error: mutationError,
  } = useProductMutation();
  if (isLoading) return <div>Cargando...</div>;
  if (swrError) return <div>Error al cargar productos</div>;
  // Handle search filter
  const filteredProducts = products
    ? products.filter((product) => {
        return (
          product.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.laboratorio
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          product.proveedor.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.lote.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.categoria.some((cat) =>
            cat.toLowerCase().includes(searchQuery.toLowerCase())
          )
        );
      })
    : [];
  // Manejo de actualización
  const handleOpenModal = (product: ProductResponse | null = null) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };
  const handleEdit = (product: ProductResponse) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };
  // Manejo de eliminación
  const handleDelete = async (id: string) => {
    if (confirm("¿Estás seguro de eliminar este producto?")) {
      await deleteProduct(id);
      mutate(); // Recargar lista de productos después de eliminar
    }
  };
  // Función para calcular el % de ganancia
  const calculateProfitMargin = (precioCompra: number, precioVenta: number) => {
    if (precioCompra === 0) return "0%";
    return `${(((precioVenta - precioCompra) / precioCompra) * 100).toFixed(
      2
    )}%`;
  };
  const startIndex = (currentPage - 1) * parseInt(itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + parseInt(itemsPerPage)
  );
  const totalPages = Math.ceil(
    filteredProducts.length / parseInt(itemsPerPage)
  );
  const downloadExcel = () => {
    if (!filteredProducts || filteredProducts.length === 0) {
      alert("No hay productos para exportar.");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(
      filteredProducts.map((product) => ({
        Nombre: product.nombre,
        Presentación: product.presentacion,
        Unidad: product.unidad,
        Categorías: product.categoria.join(", "),
        Laboratorio: product.laboratorio,
        Proveedor: product.proveedor,
        "Precio Compra": product.precio_compra.toFixed(2),
        "Precio Venta": product.precio_venta.toFixed(2),
        Lote: product.lote,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Productos");

    XLSX.writeFile(workbook, "productos.xlsx");
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Lista de Productos</h1>
        <div className="flex gap-2 items-center">
          <div className="flex flex-col overflow-hidden rounded">
            <div className="bg-red-400 px-4 text-sm text-center text-black">
              Muy Poco Stock
            </div>
            <div className="h-px bg-white"></div>
            <div className="bg-yellow-200 px-4 text-black text-sm text-center">
              Poco Stock
            </div>
          </div>
          <Button variant="outline" onClick={downloadExcel}>
            Descargar Excel
          </Button>{" "}
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <div className="flex-1">
          <Input
            placeholder="Buscar Producto por Nombre, Lote, Categoría, Proveedor, Laboratorio o por Código de Barras"
            value={searchQuery}
            onChange={(e: any) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        <Button variant="default" className="bg-blue-500">
          <Search className="mr-2 h-4 w-4" /> Buscar
        </Button>
        <Button variant="default" className="bg-orange-500">
          Borrar
        </Button>
        <Button
          variant="default"
          className="bg-cyan-500 hover:bg-cyan-600"
          onClick={() => handleOpenModal(null)}
        >
          <Plus className="mr-2 h-4 w-4" /> Nuevo Producto
        </Button>
        <ProductFormModal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          product={selectedProduct}
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Opciones</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Presentación</TableHead>
              <TableHead>Unidad</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Laboratorio</TableHead>
              <TableHead>Proveedor</TableHead>
              <TableHead>P. Compra</TableHead>
              <TableHead>P. Venta</TableHead>
              <TableHead>% G.</TableHead>
              <TableHead>Lote</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedProducts?.map((product) => {
              const stockClass =
                product.stock < 5
                  ? "bg-red-300"
                  : product.stock < 12
                  ? "bg-yellow-200"
                  : "";
              return (
                <TableRow key={product.id} className={stockClass}>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon">
                        <Package className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-green-500"
                      >
                        <Package className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-orange-500"
                        onClick={() => handleEdit(product)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500"
                        onClick={() => handleDelete(product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>{product.nombre}</TableCell>
                  <TableCell>{product.presentacion}</TableCell>
                  <TableCell>{product.unidad}</TableCell>
                  <TableCell>{product.categoria.join(", ")}</TableCell>
                  <TableCell>{product.laboratorio}</TableCell>
                  <TableCell>{product.proveedor}</TableCell>
                  <TableCell>{product.precio_compra.toFixed(2)}</TableCell>
                  <TableCell>{product.precio_venta.toFixed(2)}</TableCell>
                  <TableCell>
                    {calculateProfitMargin(
                      product.precio_compra,
                      product.precio_venta
                    )}
                  </TableCell>
                  <TableCell>{product.lote}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span>Limite</span>
          <Select value={itemsPerPage} onValueChange={setItemsPerPage}>
            <SelectTrigger className="w-20">
              <SelectValue>{itemsPerPage}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-1">
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i + 1}
              variant={currentPage === i + 1 ? "default" : "outline"}
              className="w-8 h-8 p-0"
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
