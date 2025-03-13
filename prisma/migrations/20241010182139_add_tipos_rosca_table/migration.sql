/*
  Warnings:

  - You are about to drop the column `medida_id` on the `elementos_deposito` table. All the data in the column will be lost.
  - You are about to drop the `medidas` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[elementos_deposito] DROP CONSTRAINT [elementos_deposito_medida_id_fkey];

-- DropIndex
DROP INDEX [idx_elementos_deposito_medida_id] ON [dbo].[elementos_deposito];

-- AlterTable
ALTER TABLE [dbo].[elementos_deposito] DROP COLUMN [medida_id];
ALTER TABLE [dbo].[elementos_deposito] ADD [tipo_rosca_id] INT;

-- DropTable
DROP TABLE [dbo].[medidas];

-- CreateTable
CREATE TABLE [dbo].[tipos_rosca] (
    [id] INT NOT NULL IDENTITY(1,1),
    [nombre] VARCHAR(255),
    [creado_el] DATETIME NOT NULL CONSTRAINT [tipos_rosca_creado_el_df] DEFAULT CURRENT_TIMESTAMP,
    [actualizado_el] DATETIME NOT NULL CONSTRAINT [tipos_rosca_actualizado_el_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [tipos_rosca_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[elementos_deposito] ADD CONSTRAINT [elementos_deposito_tipo_rosca_id_fkey] FOREIGN KEY ([tipo_rosca_id]) REFERENCES [dbo].[tipos_rosca]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
