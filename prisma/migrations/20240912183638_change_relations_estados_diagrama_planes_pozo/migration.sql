/*
  Warnings:

  - A unique constraint covering the columns `[plan_pozo_id]` on the table `estados_diagrama` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- CreateIndex
ALTER TABLE [dbo].[estados_diagrama] ADD CONSTRAINT [estados_diagrama_plan_pozo_id_key] UNIQUE NONCLUSTERED ([plan_pozo_id]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
