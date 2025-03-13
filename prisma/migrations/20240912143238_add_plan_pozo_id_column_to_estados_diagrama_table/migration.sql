/*
  Warnings:

  - Added the required column `plan_pozo_id` to the `estados_diagrama` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[estados_diagrama] ADD [plan_pozo_id] INT NOT NULL;

-- CreateIndex
CREATE NONCLUSTERED INDEX [idx_pozos_plan_pozo_id] ON [dbo].[estados_diagrama]([plan_pozo_id]);

-- AddForeignKey
ALTER TABLE [dbo].[estados_diagrama] ADD CONSTRAINT [estados_diagrama_plan_pozo_id_fkey] FOREIGN KEY ([plan_pozo_id]) REFERENCES [dbo].[planes_pozo]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
