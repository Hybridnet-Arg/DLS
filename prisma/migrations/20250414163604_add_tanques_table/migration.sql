BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[tanques] (
    [id] INT NOT NULL IDENTITY(1,1),
    [perforador_id] INT NOT NULL,
    [capacidad] INT,
    [nivel_critico] INT,
    [nivel_alerta] INT,
    [habilitado] BIT NOT NULL CONSTRAINT [tanques_habilitado_df] DEFAULT 1,
    [en_uso] BIT NOT NULL CONSTRAINT [tanques_en_uso_df] DEFAULT 1,
    [usuario_id] INT,
    [fecha_activacion] DATETIME,
    [fecha_desactivacion] DATETIME,
    [actualizado_el] DATETIME NOT NULL CONSTRAINT [tanques_actualizado_el_df] DEFAULT CURRENT_TIMESTAMP,
    [creado_el] DATETIME NOT NULL CONSTRAINT [tanques_creado_el_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [tanques_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[tanques] ADD CONSTRAINT [tanques_perforador_id_fkey] FOREIGN KEY ([perforador_id]) REFERENCES [dbo].[perforadores]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[tanques] ADD CONSTRAINT [tanques_usuario_id_fkey] FOREIGN KEY ([usuario_id]) REFERENCES [dbo].[usuarios]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
