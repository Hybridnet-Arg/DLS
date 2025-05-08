/*
  Warnings:

  - You are about to drop the column `referencia` on the `tubulares_documentos` table. All the data in the column will be lost.
  - Added the required column `ruta` to the `tubulares_documentos` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[tubulares_documentos] DROP COLUMN [referencia];
ALTER TABLE [dbo].[tubulares_documentos] ADD [numero] NVARCHAR(1000),
[ruta] NVARCHAR(1000) NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
