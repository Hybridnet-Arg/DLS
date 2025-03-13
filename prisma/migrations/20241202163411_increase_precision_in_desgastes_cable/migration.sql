/*
  Warnings:

  - You are about to alter the column `bit_weight` on the `desgastes_cable` table. The data in that column could be lost. The data in that column will be cast from `Decimal(18,1)` to `Decimal(18,9)`.
  - You are about to alter the column `block_height` on the `desgastes_cable` table. The data in that column could be lost. The data in that column will be cast from `Decimal(18,1)` to `Decimal(18,9)`.
  - You are about to alter the column `desgaste` on the `desgastes_cable` table. The data in that column could be lost. The data in that column will be cast from `Decimal(18,1)` to `Decimal(18,9)`.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[desgastes_cable] ALTER COLUMN [bit_weight] DECIMAL(18,9) NULL;
ALTER TABLE [dbo].[desgastes_cable] ALTER COLUMN [block_height] DECIMAL(18,9) NULL;
ALTER TABLE [dbo].[desgastes_cable] ALTER COLUMN [desgaste] DECIMAL(18,9) NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
