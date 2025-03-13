/*
  Warnings:

  - You are about to drop the column `horas` on the `elementos_deposito` table. All the data in the column will be lost.
  - You are about to drop the column `horas_fin` on the `elementos_deposito` table. All the data in the column will be lost.
  - You are about to drop the column `horas_inicio` on the `elementos_deposito` table. All the data in the column will be lost.
  - You are about to drop the column `horas` on the `log_elementos` table. All the data in the column will be lost.
  - You are about to drop the column `horas_fin` on the `log_elementos` table. All the data in the column will be lost.
  - You are about to drop the column `horas_inicio` on the `log_elementos` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[elementos_deposito] DROP COLUMN [horas],
[horas_fin],
[horas_inicio];
ALTER TABLE [dbo].[elementos_deposito] ADD [horas_de_uso] BIGINT,
[horas_en_uso] BIGINT,
[horas_iniciales] BIGINT;

-- AlterTable
ALTER TABLE [dbo].[log_elementos] DROP COLUMN [horas],
[horas_fin],
[horas_inicio];
ALTER TABLE [dbo].[log_elementos] ADD [horas_de_uso] BIGINT,
[horas_en_uso] BIGINT,
[horas_iniciales] BIGINT;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
