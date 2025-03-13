/*
  Warnings:

  - You are about to drop the column `encamisa` on the `etapas_pozo` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[etapas_pozo] DROP COLUMN [encamisa];
ALTER TABLE [dbo].[etapas_pozo] ADD [encamisado] BIT NOT NULL CONSTRAINT [etapas_pozo_encamisado_df] DEFAULT 0;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
