/*
  Warnings:

  - You are about to alter the column `nivel_trepano` on the `avances_pozo` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(10,2)`.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[avances_pozo] DROP CONSTRAINT [avances_pozo_nivel_trepano_df];
ALTER TABLE [dbo].[avances_pozo] ALTER COLUMN [nivel_trepano] DECIMAL(10,2) NULL;
ALTER TABLE [dbo].[avances_pozo] ADD CONSTRAINT [avances_pozo_nivel_trepano_df] DEFAULT 0 FOR [nivel_trepano];
ALTER TABLE [dbo].[avances_pozo] ADD [profundidad] DECIMAL(10,2) CONSTRAINT [avances_pozo_profundidad_df] DEFAULT 0;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
