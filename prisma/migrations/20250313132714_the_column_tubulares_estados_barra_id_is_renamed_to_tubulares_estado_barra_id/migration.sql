/*
  Warnings:

  - You are about to drop the column `tubulares_estados_barra_id` on the `tubulares_adquisiciones` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[tubulares_adquisiciones] DROP CONSTRAINT [tubulares_adquisiciones_tubulares_estados_barra_id_fkey];

-- AlterTable
ALTER TABLE [dbo].[tubulares_adquisiciones] DROP COLUMN [tubulares_estados_barra_id];
ALTER TABLE [dbo].[tubulares_adquisiciones] ADD [tubulares_estado_barra_id] INT;

-- AddForeignKey
ALTER TABLE [dbo].[tubulares_adquisiciones] ADD CONSTRAINT [tubulares_adquisiciones_tubulares_estado_barra_id_fkey] FOREIGN KEY ([tubulares_estado_barra_id]) REFERENCES [dbo].[tubulares_estados_barra]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
