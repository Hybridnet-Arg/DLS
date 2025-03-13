/*
  Warnings:

  - You are about to drop the column `componente_id` on the `desgastes_cable` table. All the data in the column will be lost.
  - You are about to drop the column `elemento_id` on the `desgastes_cable` table. All the data in the column will be lost.
  - Added the required column `componente_perforador_id` to the `desgastes_cable` table without a default value. This is not possible if the table is not empty.
  - Added the required column `elemento_componente_id` to the `desgastes_cable` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[desgastes_cable] DROP CONSTRAINT [desgastes_cable_componente_id_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[desgastes_cable] DROP CONSTRAINT [desgastes_cable_elemento_deposito_id_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[desgastes_cable] DROP CONSTRAINT [desgastes_cable_elemento_id_fkey];

-- AlterTable
ALTER TABLE [dbo].[desgastes_cable] DROP COLUMN [componente_id],
[elemento_id];
ALTER TABLE [dbo].[desgastes_cable] ADD [componente_perforador_id] INT NOT NULL,
[elemento_componente_id] INT NOT NULL;

-- CreateIndex
CREATE NONCLUSTERED INDEX [idx_desgastes_cable_perforador_id] ON [dbo].[desgastes_cable]([perforador_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [idx_desgastes_cable_elemento_deposito_id] ON [dbo].[desgastes_cable]([elemento_deposito_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [idx_desgastes_cable_elementos_componente_id] ON [dbo].[desgastes_cable]([elemento_componente_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [idx_desgastes_cable_componente_perforador_id] ON [dbo].[desgastes_cable]([componente_perforador_id]);

-- AddForeignKey
ALTER TABLE [dbo].[desgastes_cable] ADD CONSTRAINT [desgastes_cable_elemento_componente_id_fkey] FOREIGN KEY ([elemento_componente_id]) REFERENCES [dbo].[elementos_componente]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[desgastes_cable] ADD CONSTRAINT [desgastes_cable_componente_perforador_id_fkey] FOREIGN KEY ([componente_perforador_id]) REFERENCES [dbo].[componentes_perforador]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[desgastes_cable] ADD CONSTRAINT [desgastes_cable_elemento_deposito_id_fkey] FOREIGN KEY ([elemento_deposito_id]) REFERENCES [dbo].[elementos_deposito]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
