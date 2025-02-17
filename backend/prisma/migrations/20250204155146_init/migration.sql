/*
  Warnings:

  - You are about to alter the column `precio_compra` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Int`.
  - You are about to alter the column `precio_venta` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Int`.

*/
-- AlterTable
ALTER TABLE `product` MODIFY `precio_compra` INTEGER NOT NULL,
    MODIFY `precio_venta` INTEGER NOT NULL;
