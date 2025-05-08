BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[wellData] ADD [ymm] FLOAT(53);

-- CreateTable
CREATE TABLE [dbo].[cubitajes] (
    [id] INT NOT NULL IDENTITY(1,1),
    [actualizado_el] DATETIME NOT NULL CONSTRAINT [cubitajes_actualizado_el_df] DEFAULT CURRENT_TIMESTAMP,
    [creado_el] DATETIME NOT NULL CONSTRAINT [cubitajes_creado_el_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [cubitajes_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[cubitaje_items] (
    [id] INT NOT NULL IDENTITY(1,1),
    [cubitaje_id] INT NOT NULL,
    [ymm] FLOAT(53),
    [litros] FLOAT(53),
    [actualizado_el] DATETIME NOT NULL CONSTRAINT [cubitaje_items_actualizado_el_df] DEFAULT CURRENT_TIMESTAMP,
    [creado_el] DATETIME NOT NULL CONSTRAINT [cubitaje_items_creado_el_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [cubitaje_items_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[tanques_cubitajes] (
    [id] INT NOT NULL IDENTITY(1,1),
    [tanque_id] INT NOT NULL,
    [cubitaje_id] INT NOT NULL,
    [actualizado_el] DATETIME NOT NULL CONSTRAINT [tanques_cubitajes_actualizado_el_df] DEFAULT CURRENT_TIMESTAMP,
    [creado_el] DATETIME NOT NULL CONSTRAINT [tanques_cubitajes_creado_el_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [tanques_cubitajes_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [tanques_cubitajes_tanque_id_key] UNIQUE NONCLUSTERED ([tanque_id])
);

-- AddForeignKey
ALTER TABLE [dbo].[cubitaje_items] ADD CONSTRAINT [cubitaje_items_cubitaje_id_fkey] FOREIGN KEY ([cubitaje_id]) REFERENCES [dbo].[cubitajes]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[tanques_cubitajes] ADD CONSTRAINT [tanques_cubitajes_tanque_id_fkey] FOREIGN KEY ([tanque_id]) REFERENCES [dbo].[tanques]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[tanques_cubitajes] ADD CONSTRAINT [tanques_cubitajes_cubitaje_id_fkey] FOREIGN KEY ([cubitaje_id]) REFERENCES [dbo].[cubitajes]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
