BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[locaciones] ADD [ubicacion_id] INT CONSTRAINT [locaciones_ubicacion_id_df] DEFAULT 1;

-- CreateTable
CREATE TABLE [dbo].[ubicaciones] (
    [id] INT NOT NULL IDENTITY(1,1),
    [nombre] VARCHAR(255),
    [creado_el] DATETIME NOT NULL CONSTRAINT [ubicaciones_creado_el_df] DEFAULT CURRENT_TIMESTAMP,
    [actualizado_el] DATETIME NOT NULL CONSTRAINT [ubicaciones_actualizado_el_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [ubicaciones_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[locaciones] ADD CONSTRAINT [locaciones_ubicacion_id_fkey] FOREIGN KEY ([ubicacion_id]) REFERENCES [dbo].[ubicaciones]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
