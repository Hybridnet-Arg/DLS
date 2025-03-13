/*
  Warnings:

  - You are about to drop the column `factu` on the `perforador` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[perforador] DROP COLUMN [factu];
ALTER TABLE [dbo].[perforador] ADD [cantBombas] INT CONSTRAINT [perforador_cantBombas_df] DEFAULT 3,
[distributionType] NCHAR(10),
[unidadNegocio] NCHAR(10);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
