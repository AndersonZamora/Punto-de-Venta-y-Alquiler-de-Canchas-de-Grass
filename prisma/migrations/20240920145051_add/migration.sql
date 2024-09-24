/*
  Warnings:

  - Made the column `closingBalance` on table `CashRegister` required. This step will fail if there are existing NULL values in that column.
  - Made the column `totalSales` on table `CashRegister` required. This step will fail if there are existing NULL values in that column.
  - Made the column `totalRentals` on table `CashRegister` required. This step will fail if there are existing NULL values in that column.
  - Made the column `totalExpenses` on table `CashRegister` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "CashRegister" ALTER COLUMN "openingBalance" SET DEFAULT 0,
ALTER COLUMN "closingBalance" SET NOT NULL,
ALTER COLUMN "closingBalance" SET DEFAULT 0,
ALTER COLUMN "totalSales" SET NOT NULL,
ALTER COLUMN "totalSales" SET DEFAULT 0,
ALTER COLUMN "totalRentals" SET NOT NULL,
ALTER COLUMN "totalRentals" SET DEFAULT 0,
ALTER COLUMN "totalExpenses" SET NOT NULL,
ALTER COLUMN "totalExpenses" SET DEFAULT 0;
