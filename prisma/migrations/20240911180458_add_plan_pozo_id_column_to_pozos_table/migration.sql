/*
  Warnings:

  - You are about to drop the column `pozo_id` on the `planes_pozo` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[planes_pozo] DROP CONSTRAINT [planes_pozo_pozo_id_fkey];

-- DropIndex
DROP INDEX [idx_planes_pozo_pozo_id] ON [dbo].[planes_pozo];

-- AlterTable
ALTER TABLE [dbo].[planes_pozo] DROP COLUMN [pozo_id];

-- AlterTable
ALTER TABLE [dbo].[pozos] ADD [plan_pozo_id] INT;

-- CreateIndex
CREATE NONCLUSTERED INDEX [idx_pozos_plan_pozo_id] ON [dbo].[pozos]([plan_pozo_id]);

-- AddForeignKey
ALTER TABLE [dbo].[pozos] ADD CONSTRAINT [pozos_plan_pozo_id_fkey] FOREIGN KEY ([plan_pozo_id]) REFERENCES [dbo].[planes_pozo]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
