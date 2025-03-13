/*
  Warnings:

  - You are about to drop the column `nombre` on the `etapas_pozo` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[etapas_pozo] DROP COLUMN [nombre];
ALTER TABLE [dbo].[etapas_pozo] ADD [tipo_etapa_pozo_id] INT;

-- CreateTable
CREATE TABLE [dbo].[tipos_etapa_pozo] (
    [id] INT NOT NULL IDENTITY(1,1),
    [nombre] VARCHAR(255) NOT NULL,
    [creado_el] DATETIME NOT NULL CONSTRAINT [tipos_etapa_pozo_creado_el_df] DEFAULT CURRENT_TIMESTAMP,
    [actualizado_el] DATETIME NOT NULL CONSTRAINT [tipos_etapa_pozo_actualizado_el_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [tipos_etapa_pozo_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [idx_etapas_pozo_tipo_etapa_pozo_id] ON [dbo].[etapas_pozo]([tipo_etapa_pozo_id]);

-- AddForeignKey
ALTER TABLE [dbo].[etapas_pozo] ADD CONSTRAINT [etapas_pozo_tipo_etapa_pozo_id_fkey] FOREIGN KEY ([tipo_etapa_pozo_id]) REFERENCES [dbo].[tipos_etapa_pozo]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
