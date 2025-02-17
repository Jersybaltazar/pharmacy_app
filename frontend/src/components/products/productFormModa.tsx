import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useProductMutation } from "@/hooks/useProductMutation";
import { ProductFormData } from "@/types/product";
import { Checkbox } from "@/components/ui/checkbox"; // Para seleccionar múltiples categorías

const CATEGORIES = ["ANALGESICO", "ANTISEPTICO", "BEBE", "USO TOPICO"];
const LABORATORIES = ["MEDIFARMA", "LABOT", "COPPON", "TUINIES"];
const PROVIDERS = [
  "FarmaPerú",
  "Droguería San Jorge",
  "Biofarma",
  "No Registrado",
];

interface ProductFormModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  product?: (ProductFormData & { id?: string }) | null;
}

export const ProductFormModal = ({
  isOpen,
  setIsOpen,
  product = null,
}: ProductFormModalProps) => {
  const [open, setOpen] = useState(false);
  const { createProduct, updateProduct, loading } = useProductMutation();
  const form = useForm<ProductFormData>({
    defaultValues: product || {
      nombre: "",
      presentacion: "",
      unidad: "",
      categoria: [],
      laboratorio: "",
      proveedor: "",
      precio_compra: 0,
      precio_venta: 0,
      lote: "",
      stock: 0,
    },
  });
  // Al cambiar el producto (o al abrir el modal), se reinician los valores del formulario.
  useEffect(() => {
    if (isOpen) {
      if (product) {
        form.reset({
          ...product,
          categoria: product.categoria || [],
        });
      } else {
        form.reset({
          nombre: "",
          presentacion: "",
          unidad: "",
          categoria: [],
          laboratorio: "",
          proveedor: "",
          precio_compra: 0,
          precio_venta: 0,
          lote: "",
          stock: 0,
        });
      }
    }
  }, [isOpen, product, form]);

  const onSubmit = async (formData: ProductFormData) => {
    try {
      if (product && product.id) {
        // Modo edición: se actualiza el producto usando su id.
        await updateProduct(product.id, { id: product.id, ...formData });
      } else {
        // Modo creación: se crea un producto nuevo.
        await createProduct(formData);
      }
      setIsOpen(false);
      form.reset();
    } catch (error) {
      console.error("Error al guardar el producto:", error);
      // Aquí puedes agregar manejo de errores o notificaciones
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/*
        Si no se pasó un producto (modo creación), se renderiza el trigger para abrir el modal.
        En modo edición se asume que el modal se abre desde otro componente (por ejemplo, al hacer clic en "editar").
      */}
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {product ? "Editar Producto" : "Crear Nuevo Producto"}
          </DialogTitle>{" "}
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Nombre del Producto */}
              <FormField
                control={form.control}
                name="nombre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre del Producto</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Ingrese nombre del producto"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Presentación */}
              <FormField
                control={form.control}
                name="presentacion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Presentación</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Ingrese presentación" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Unidad */}
              <FormField
                control={form.control}
                name="unidad"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unidad</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione unidad" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="X1">X1</SelectItem>
                        <SelectItem value="CAJA">CAJA</SelectItem>
                        <SelectItem value="UNIDAD">UNIDAD</SelectItem>
                        <SelectItem value="SOBRE">SOBRE</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Categoría */}
              <FormField
                control={form.control}
                name="categoria"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categorías</FormLabel>
                    <div className="grid grid-cols-2 gap-2">
                      {CATEGORIES.map((cat) => (
                        <label
                          key={cat}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            checked={field.value.includes(cat)}
                            onCheckedChange={(checked) => {
                              if (checked && field.value.length < 6) {
                                field.onChange([...field.value, cat]);
                              } else if (!checked) {
                                field.onChange(
                                  field.value.filter((c) => c !== cat)
                                );
                              }
                            }}
                          />
                          <span>{cat}</span>
                        </label>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Laboratorio */}
              <FormField
                control={form.control}
                name="laboratorio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Laboratorio</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione laboratorio" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="MEDIFARMA">MEDIFARMA</SelectItem>
                        <SelectItem value="LABOT">LABOT</SelectItem>
                        <SelectItem value="COPPON">COPPON</SelectItem>
                        <SelectItem value="TUINIES">TUINIES</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Proveedor */}
              <FormField
                control={form.control}
                name="proveedor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Proveedor</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione proveedor" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {PROVIDERS.map((prov) => (
                          <SelectItem key={prov} value={prov}>
                            {prov}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Precio de Compra */}
              <FormField
                control={form.control}
                name="precio_compra"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Precio de Compra</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                        placeholder="0.00"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Precio de Venta */}
              <FormField
                control={form.control}
                name="precio_venta"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Precio de Venta</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                        placeholder="0.00"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Lote */}
              <FormField
                control={form.control}
                name="lote"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lote</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Ingrese número de lote" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Stock */}
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                        placeholder="0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Código de Barras 
              <FormField
                control={form.control}
                name="barcode"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Código de Barras</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Ingrese código de barras" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              */}
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                Cancelar
              </Button>
              <Button type="submit" className="bg-cyan-500 hover:bg-cyan-600">
                {product ? "Actualizar" : "Guardar"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
