-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 06-02-2025 a las 00:01:02
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `farmacia`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product`
--

CREATE TABLE `product` (
  `id` varchar(191) NOT NULL,
  `nombre` varchar(191) NOT NULL,
  `presentacion` varchar(191) NOT NULL,
  `laboratorio` varchar(191) NOT NULL,
  `unidad` varchar(191) NOT NULL,
  `proveedor` varchar(191) NOT NULL,
  `precio_compra` int(11) NOT NULL,
  `precio_venta` int(11) NOT NULL,
  `lote` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `stock` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `product`
--

INSERT INTO `product` (`id`, `nombre`, `presentacion`, `laboratorio`, `unidad`, `proveedor`, `precio_compra`, `precio_venta`, `lote`, `createdAt`, `updatedAt`, `stock`) VALUES
('06ec105b-2f20-4cdc-a7cd-fa0c1e1c179d', 'test41', 'caja 1', 'LABOT', 'SOBRE', 'FarmaPerú', 156, 609, '2501', '2025-02-05 17:04:14.106', '2025-02-05 21:38:26.850', 25001),
('11f61096-a207-417d-9f5b-9e99ff98cacc', 'Ninguna', 'caja ', 'MEDIFARMA', 'CAJA', 'Droguería San Jorge', 123, 123, '123', '2025-02-05 17:34:58.873', '2025-02-05 17:34:58.873', 123),
('178b273e-ec04-4675-80db-fe5287ce74b2', 'Jersy', 'caja', 'MEDIFARMA', 'CAJA', '', 123, 1, '123123123123', '2025-02-05 17:19:01.406', '2025-02-05 17:19:01.406', 11),
('2dd78a0c-46ae-4062-8e8a-2988cb3c1bdc', 'Ibuprogeno', 'caja', 'MEDIFARMA', 'SOBRE', 'Droguería San Jorge', 12, 124, '5', '2025-02-05 11:13:26.805', '2025-02-05 11:13:26.805', 0),
('3394bf48-6c62-459e-9ee6-65061f0d33dc', 'JARABEssss', 'LIQUIDOssss', 'LABOT', 'UNIDAD', 'Droguería San Jorge', 1231, 12411, '1CAGDa', '2025-02-05 21:05:50.511', '2025-02-05 21:39:09.327', 2147483647),
('52209c98-d65f-456c-9026-d6ffdab3c554', 'test3', 'caja', 'MEDIFARMA', 'CAJA', 'Droguería San Jorge', 123, 23, 'adasdasdasdasd', '2025-02-05 16:46:11.274', '2025-02-05 16:46:11.274', 1000000),
('546701a6-4980-4f19-8d62-143361d05fed', 'Ninguna', 'caja', 'MEDIFARMA', 'SOBRE', 'Droguería San Jorge', 12, 14, '123213123', '2025-02-05 22:42:48.998', '2025-02-05 22:42:48.998', 14444),
('6570e143-5e5b-43b1-a955-6e2fa0ba9aae', 'Paracetamol', 'caja', 'MEDIFARMA', 'CAJA', 'FarmaPerú', 123, 12, '12', '2025-02-05 00:42:13.108', '2025-02-05 00:42:13.108', 0),
('8af9fcda-9dbf-4ddd-9971-5cd9ca6a5eca', 'panadol', 'caja', 'LABOT', 'CAJA', 'Droguería San Jorge', 12, 123, 'fghf311', '2025-02-05 20:28:46.817', '2025-02-05 20:28:46.817', 12311),
('b408af5d-e0e3-4978-a769-7d9a3883aef4', 'ampicilina', 'caja', 'LABOT', 'CAJA', 'Droguería San Jorge', 1, 12, 'dxcsdf', '2025-02-05 16:27:10.602', '2025-02-05 16:27:10.602', 0),
('cd154f9f-9864-482a-ba48-13c25b0f1e99', 'JERSY', 'caja', 'MEDIFARMA', 'CAJA', 'FarmaPerú', 10, 100, '4528724', '2025-02-05 21:10:45.124', '2025-02-05 21:10:45.124', 4),
('d42d3ffe-bb1d-4eb9-8666-c4cd4c8979f7', 'Paracetamol1', 'caja', 'LABOT', 'X1', 'FarmaPerú', 23, 23, '123131231', '2025-02-05 16:40:51.910', '2025-02-05 16:40:51.910', 0),
('dc94f212-257d-4abe-a4f1-2c763ab545eb', 'ParacetamolasASDASDdaes', 'as 500AAAAmg', 'GenfaAAAras', 'CaAAAAjaaa', 'FarmaPerú', 3, 4, 'L12345a6aaa', '2025-02-05 16:43:16.039', '2025-02-05 21:09:57.053', 123123213);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productcategory`
--

CREATE TABLE `productcategory` (
  `id` varchar(191) NOT NULL,
  `productId` varchar(191) NOT NULL,
  `categoria` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `productcategory`
--

INSERT INTO `productcategory` (`id`, `productId`, `categoria`) VALUES
('05ce909c-70b2-438e-bae9-54bba4e9655d', 'dc94f212-257d-4abe-a4f1-2c763ab545eb', 'BEBE'),
('192881a6-9136-41ed-bc14-4f0aa7cea54d', '6570e143-5e5b-43b1-a955-6e2fa0ba9aae', 'ANALGESICO'),
('22104576-a1fa-4823-ab90-f7d4c2d0d1fd', 'cd154f9f-9864-482a-ba48-13c25b0f1e99', 'BEBE'),
('27a340cf-bf92-4538-b3c6-03ef6c060f0b', '8af9fcda-9dbf-4ddd-9971-5cd9ca6a5eca', 'ANALGESICO'),
('5be6d963-6368-45aa-a13f-709c54c57217', 'cd154f9f-9864-482a-ba48-13c25b0f1e99', 'ANTISEPTICO'),
('5c1218c1-3beb-4d7f-b5d3-eed4d2f74255', 'cd154f9f-9864-482a-ba48-13c25b0f1e99', 'ANALGESICO'),
('5c7f5cb1-2787-4d35-80f5-3ab73c1726b8', '8af9fcda-9dbf-4ddd-9971-5cd9ca6a5eca', 'USO TOPICO'),
('6302508b-38d4-4c94-9eec-7fcf3e4ede79', 'cd154f9f-9864-482a-ba48-13c25b0f1e99', 'USO TOPICO'),
('6b506089-3bb2-4de6-b0f4-345b1c2314a2', '2dd78a0c-46ae-4062-8e8a-2988cb3c1bdc', 'USO TOPICO'),
('724c11a2-c210-4b0e-bae2-b864550ce42d', '178b273e-ec04-4675-80db-fe5287ce74b2', 'ANALGESICO'),
('77b95f1b-80d3-40a7-aa53-427d45235322', '2dd78a0c-46ae-4062-8e8a-2988cb3c1bdc', 'ANALGESICO'),
('7a401993-fcc4-45bb-8999-86634b5024aa', 'b408af5d-e0e3-4978-a769-7d9a3883aef4', 'BEBE'),
('8692fd4a-0ccd-4f54-9fd2-0c6358d2efe9', '52209c98-d65f-456c-9026-d6ffdab3c554', 'ANALGESICO'),
('885f40ac-c4dd-40fe-9ab9-64b7a7bf65f8', '11f61096-a207-417d-9f5b-9e99ff98cacc', 'BEBE'),
('aa6099ad-04fa-4308-ae88-92c71601dc3f', '06ec105b-2f20-4cdc-a7cd-fa0c1e1c179d', 'ANALGESICO'),
('afa8656b-1f83-4c35-b877-7f7cd069e377', 'dc94f212-257d-4abe-a4f1-2c763ab545eb', 'USO TOPICO'),
('afc98dcd-a8b9-41df-85b0-10008eda1496', '52209c98-d65f-456c-9026-d6ffdab3c554', 'BEBE'),
('bd7dca70-0b01-49f8-9862-a016afe482a1', 'dc94f212-257d-4abe-a4f1-2c763ab545eb', 'ANALGESICO'),
('c120f67f-4a91-4db4-a64b-93d9292a36fd', '8af9fcda-9dbf-4ddd-9971-5cd9ca6a5eca', 'BEBE'),
('c210e482-950e-450b-b51b-0bbe394d6d63', '6570e143-5e5b-43b1-a955-6e2fa0ba9aae', 'BEBE'),
('cc99c1d8-b7ac-4225-8873-e1250035db98', '11f61096-a207-417d-9f5b-9e99ff98cacc', 'ANALGESICO'),
('ceb94f71-ef1a-4d40-a0c4-e2ba2ea39092', 'd42d3ffe-bb1d-4eb9-8666-c4cd4c8979f7', 'BEBE'),
('cf0e5b02-014d-4996-b175-0fd41ebc4692', '3394bf48-6c62-459e-9ee6-65061f0d33dc', 'USO TOPICO'),
('d0431e6f-7557-495a-9fdc-1db36712f8c8', 'b408af5d-e0e3-4978-a769-7d9a3883aef4', 'ANALGESICO'),
('d2519cf3-8511-4798-8cdb-2dcce7e79684', '8af9fcda-9dbf-4ddd-9971-5cd9ca6a5eca', 'ANTISEPTICO'),
('d45bec3b-8c57-4131-a417-4b05b2c29d9d', '2dd78a0c-46ae-4062-8e8a-2988cb3c1bdc', 'ANTISEPTICO'),
('e1b9efad-c386-47e2-bc83-45624eb70434', '06ec105b-2f20-4cdc-a7cd-fa0c1e1c179d', 'ANTISEPTICO'),
('e46432ad-383d-4594-a3e7-2e753b205f0f', '546701a6-4980-4f19-8d62-143361d05fed', 'ANALGESICO'),
('ec307812-92fd-4269-a23e-ab55e68e7fa4', '178b273e-ec04-4675-80db-fe5287ce74b2', 'BEBE'),
('ecb85798-faab-4e7c-9f30-13a50b533294', 'd42d3ffe-bb1d-4eb9-8666-c4cd4c8979f7', 'ANALGESICO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('31e4d8c3-4d6c-42be-9063-ccf7f0212e09', '81fd33a00d526722882148b017833630347f97dfe7af1e348f6cd72b8c601449', '2025-02-05 16:37:22.048', '20250205163722_add_stock_column', NULL, NULL, '2025-02-05 16:37:22.031', 1),
('383185a6-9baa-413a-8b57-7bbd46e4f6fb', 'b9d3d1ca915ae063c9a7d0bea776862fda799ea5743a4259b49ba4bcabc7e716', '2025-02-04 15:10:21.091', '20250204151021_init', NULL, NULL, '2025-02-04 15:10:21.064', 1),
('a2d6f28a-b990-4f91-9735-b16fc8655256', '802c294e6d16cbb4a44d0cd6c4350b3451b8dc096d0716bab919737f6bc3c93f', '2025-02-05 00:29:30.066', '20250205002929_update_categoria_type', NULL, NULL, '2025-02-05 00:29:29.990', 1),
('adba900e-6051-49d1-83cc-f1f86be69e58', '34c592968afa5e1c6a5c8df1f2938caa100c1e923cfc5a0d15335ea7c85c9125', '2025-02-05 00:34:25.730', '20250205003425_add_categoria_table', NULL, NULL, '2025-02-05 00:34:25.645', 1),
('b6bc125b-bb71-4ca1-a147-fd4196a03924', 'af959e0fb7d2bb78ff72d23d98074e8efd21f4f5e6c2a1bd7f4a144cf485d40b', '2025-02-04 15:51:47.145', '20250204155146_init', NULL, NULL, '2025-02-04 15:51:46.866', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Product_lote_key` (`lote`);

--
-- Indices de la tabla `productcategory`
--
ALTER TABLE `productcategory`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ProductCategory_productId_fkey` (`productId`);

--
-- Indices de la tabla `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `productcategory`
--
ALTER TABLE `productcategory`
  ADD CONSTRAINT `ProductCategory_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
