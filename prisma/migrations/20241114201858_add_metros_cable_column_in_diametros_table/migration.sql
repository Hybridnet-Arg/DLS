/*
  Warnings:

  - You are about to drop the column `largo_cable` on the `diametros` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[diametros] DROP COLUMN [largo_cable];
ALTER TABLE [dbo].[diametros] ADD [metros_cable] DECIMAL(18,1),
[metros_despliegue] DECIMAL(18,1);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
