/*
  Warnings:

  - You are about to drop the column `productId` on the `SaleProduct` table. All the data in the column will be lost.
  - Added the required column `price` to the `SaleProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product` to the `SaleProduct` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SaleProduct" DROP CONSTRAINT "SaleProduct_productId_fkey";

-- AlterTable
ALTER TABLE "SaleProduct" DROP COLUMN "productId",
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "product" TEXT NOT NULL;
