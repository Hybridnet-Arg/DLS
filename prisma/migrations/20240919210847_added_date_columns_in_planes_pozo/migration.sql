BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[etapas_pozo] DROP CONSTRAINT [etapas_pozo_pozo_id_fkey];

-- AlterTable
ALTER TABLE [dbo].[etapas_pozo] ALTER COLUMN [profundidad_desde] DECIMAL(10,2) NULL;
ALTER TABLE [dbo].[etapas_pozo] ALTER COLUMN [profundidad_hasta] DECIMAL(10,2) NULL;
ALTER TABLE [dbo].[etapas_pozo] ALTER COLUMN [casing] VARCHAR(255) NULL;
ALTER TABLE [dbo].[etapas_pozo] ALTER COLUMN [pozo_id] INT NULL;

-- AlterTable
ALTER TABLE [dbo].[planes_pozo] ADD [fecha_fin] DATE,
[fecha_inicio] DATE;

-- AlterTable
ALTER TABLE [dbo].[pozos] ALTER COLUMN [nombre] VARCHAR(255) NULL;
ALTER TABLE [dbo].[pozos] ALTER COLUMN [nombre_clave] VARCHAR(100) NULL;
ALTER TABLE [dbo].[pozos] ALTER COLUMN [profundidad] DECIMAL(10,2) NULL;

-- AddForeignKey
ALTER TABLE [dbo].[etapas_pozo] ADD CONSTRAINT [etapas_pozo_pozo_id_fkey] FOREIGN KEY ([pozo_id]) REFERENCES [dbo].[pozos]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
