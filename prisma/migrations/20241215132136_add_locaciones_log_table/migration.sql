/*
  Warnings:

  - You are about to alter the column `nombre` on the `locaciones` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(25)`.
  - You are about to alter the column `nombre_clave` on the `locaciones` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(25)`.
  - You are about to alter the column `coordenadas` on the `locaciones` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(50)`.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[locaciones] ALTER COLUMN [nombre] VARCHAR(25) NOT NULL;
ALTER TABLE [dbo].[locaciones] ALTER COLUMN [nombre_clave] VARCHAR(25) NULL;
ALTER TABLE [dbo].[locaciones] ALTER COLUMN [coordenadas] VARCHAR(50) NULL;

-- CreateTable
CREATE TABLE [dbo].[log_locaciones] (
    [id] INT NOT NULL IDENTITY(1,1),
    [locacion_id] INT NOT NULL,
    [usuario_id] INT NOT NULL,
    [alta] BIT NOT NULL CONSTRAINT [log_locaciones_alta_df] DEFAULT 0,
    [baja] BIT NOT NULL CONSTRAINT [log_locaciones_baja_df] DEFAULT 0,
    [modificacion] BIT NOT NULL CONSTRAINT [log_locaciones_modificacion_df] DEFAULT 0,
    [creado_el] DATETIME NOT NULL CONSTRAINT [log_locaciones_creado_el_df] DEFAULT CURRENT_TIMESTAMP,
    [actualizado_el] DATETIME NOT NULL CONSTRAINT [log_locaciones_actualizado_el_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [log_locaciones_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [idx_log_locaciones_locacion_id] ON [dbo].[log_locaciones]([locacion_id]);

-- AddForeignKey
ALTER TABLE [dbo].[log_locaciones] ADD CONSTRAINT [log_locaciones_locacion_id_fkey] FOREIGN KEY ([locacion_id]) REFERENCES [dbo].[locaciones]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[log_locaciones] ADD CONSTRAINT [log_locaciones_usuario_id_fkey] FOREIGN KEY ([usuario_id]) REFERENCES [dbo].[usuarios]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
