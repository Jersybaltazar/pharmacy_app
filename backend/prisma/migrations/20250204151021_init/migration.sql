-- CreateTable
CREATE TABLE `Product` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `presentacion` VARCHAR(191) NOT NULL,
    `laboratorio` VARCHAR(191) NOT NULL,
    `unidad` VARCHAR(191) NOT NULL,
    `categoria` DATETIME(3) NOT NULL,
    `proveedor` VARCHAR(191) NOT NULL,
    `precio_compra` DECIMAL(65, 30) NOT NULL,
    `precio_venta` DECIMAL(65, 30) NOT NULL,
    `lote` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Product_lote_key`(`lote`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
