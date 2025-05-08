/*
  Warnings:

  - You are about to drop the column `idModelo` on the `diametro` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[diametro] DROP CONSTRAINT [diametro_idModelo_fkey];

-- AlterTable
ALTER TABLE [dbo].[diametro] DROP COLUMN [idModelo];

-- AlterTable
ALTER TABLE [dbo].[modelo] ADD [idDiametro] INT,
[idTipoPieza] INT;

-- AddForeignKey
ALTER TABLE [dbo].[modelo] ADD CONSTRAINT [modelo_idTipoPieza_fkey] FOREIGN KEY ([idTipoPieza]) REFERENCES [dbo].[tiposPieza]([idTipoPieza]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[modelo] ADD CONSTRAINT [modelo_idDiametro_fkey] FOREIGN KEY ([idDiametro]) REFERENCES [dbo].[diametro]([idDiametro]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
