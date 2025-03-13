BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[componentes] (
    [id] INT NOT NULL IDENTITY(1,1),
    [nombre] VARCHAR(255),
    [creado_el] DATETIME NOT NULL CONSTRAINT [componentes_creado_el_df] DEFAULT CURRENT_TIMESTAMP,
    [actualizado_el] DATETIME NOT NULL CONSTRAINT [componentes_actualizado_el_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [componentes_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[componentes_perforador] (
    [id] INT NOT NULL IDENTITY(1,1),
    [nombre] VARCHAR(255),
    [componente_id] INT NOT NULL,
    [perforador_id] INT NOT NULL,
    [estado] VARCHAR(255),
    [creado_el] DATETIME NOT NULL CONSTRAINT [componentes_perforador_creado_el_df] DEFAULT CURRENT_TIMESTAMP,
    [actualizado_el] DATETIME NOT NULL CONSTRAINT [componentes_perforador_actualizado_el_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [componentes_perforador_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[tipos_elemento] (
    [id] INT NOT NULL IDENTITY(1,1),
    [nombre] VARCHAR(255),
    [creado_el] DATETIME NOT NULL CONSTRAINT [tipos_elemento_creado_el_df] DEFAULT CURRENT_TIMESTAMP,
    [actualizado_el] DATETIME NOT NULL CONSTRAINT [tipos_elemento_actualizado_el_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [tipos_elemento_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[elementos] (
    [id] INT NOT NULL IDENTITY(1,1),
    [nombre] VARCHAR(255),
    [tipo_elemento_id] INT NOT NULL,
    [creado_el] DATETIME NOT NULL CONSTRAINT [elementos_creado_el_df] DEFAULT CURRENT_TIMESTAMP,
    [actualizado_el] DATETIME NOT NULL CONSTRAINT [elementos_actualizado_el_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [elementos_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[elementos_componente] (
    [id] INT NOT NULL IDENTITY(1,1),
    [componente_perforador_id] INT NOT NULL,
    [elemento_id] INT NOT NULL,
    [estado] VARCHAR(255),
    [stock] INT NOT NULL,
    [creado_el] DATETIME NOT NULL CONSTRAINT [elementos_componente_creado_el_df] DEFAULT CURRENT_TIMESTAMP,
    [actualizado_el] DATETIME NOT NULL CONSTRAINT [elementos_componente_actualizado_el_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [elementos_componente_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[depositos] (
    [id] INT NOT NULL IDENTITY(1,1),
    [nombre] VARCHAR(255),
    [perforador_id] INT NOT NULL,
    [creado_el] DATETIME NOT NULL CONSTRAINT [depositos_creado_el_df] DEFAULT CURRENT_TIMESTAMP,
    [actualizado_el] DATETIME NOT NULL CONSTRAINT [depositos_actualizado_el_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [depositos_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [depositos_perforador_id_key] UNIQUE NONCLUSTERED ([perforador_id])
);

-- CreateTable
CREATE TABLE [dbo].[medidas] (
    [id] INT NOT NULL IDENTITY(1,1),
    [nombre] VARCHAR(255),
    [creado_el] DATETIME NOT NULL CONSTRAINT [medidas_creado_el_df] DEFAULT CURRENT_TIMESTAMP,
    [actualizado_el] DATETIME NOT NULL CONSTRAINT [medidas_actualizado_el_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [medidas_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[marcas] (
    [id] INT NOT NULL IDENTITY(1,1),
    [nombre] VARCHAR(255),
    [creado_el] DATETIME NOT NULL CONSTRAINT [marcas_creado_el_df] DEFAULT CURRENT_TIMESTAMP,
    [actualizado_el] DATETIME NOT NULL CONSTRAINT [marcas_actualizado_el_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [marcas_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[modelos] (
    [id] INT NOT NULL IDENTITY(1,1),
    [nombre] VARCHAR(255),
    [marca_id] INT,
    [creado_el] DATETIME NOT NULL CONSTRAINT [modelos_creado_el_df] DEFAULT CURRENT_TIMESTAMP,
    [actualizado_el] DATETIME NOT NULL CONSTRAINT [modelos_actualizado_el_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [modelos_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[elementos_deposito] (
    [id] INT NOT NULL IDENTITY(1,1),
    [codigo] VARCHAR(255),
    [serie] VARCHAR(255),
    [horas] BIGINT NOT NULL,
    [horas_inicio] BIGINT,
    [horas_fin] BIGINT,
    [recambio] BIT NOT NULL CONSTRAINT [elementos_deposito_recambio_df] DEFAULT 0,
    [en_uso] BIT NOT NULL CONSTRAINT [elementos_deposito_en_uso_df] DEFAULT 0,
    [baja] BIT NOT NULL CONSTRAINT [elementos_deposito_baja_df] DEFAULT 0,
    [motivo_baja] VARCHAR(255),
    [modelo_id] INT,
    [deposito_id] INT,
    [medida_id] INT,
    [elemento_componente_id] INT,
    [creado_el] DATETIME NOT NULL CONSTRAINT [elementos_deposito_creado_el_df] DEFAULT CURRENT_TIMESTAMP,
    [actualizado_el] DATETIME NOT NULL CONSTRAINT [elementos_deposito_actualizado_el_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [elementos_deposito_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[log_elementos] (
    [id] INT NOT NULL IDENTITY(1,1),
    [perforador_id] INT NOT NULL,
    [elemento_deposito_id] INT NOT NULL,
    [baja] BIT NOT NULL CONSTRAINT [log_elementos_baja_df] DEFAULT 0,
    [motivo_baja] VARCHAR(255),
    [horas] BIGINT NOT NULL,
    [horas_inicio] BIGINT,
    [horas_fin] BIGINT,
    [creado_el] DATETIME NOT NULL CONSTRAINT [log_elementos_creado_el_df] DEFAULT CURRENT_TIMESTAMP,
    [actualizado_el] DATETIME NOT NULL CONSTRAINT [log_elementos_actualizado_el_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [log_elementos_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [idx_componentes_perforador_componente_id] ON [dbo].[componentes_perforador]([componente_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [idx_componentes_perforador_perforador_id] ON [dbo].[componentes_perforador]([perforador_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [idx_elementos_tipo_elemento_id] ON [dbo].[elementos]([tipo_elemento_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [idx_elementos_componente_componente_perforador_id] ON [dbo].[elementos_componente]([componente_perforador_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [idx_elementos_componente_elemento_id] ON [dbo].[elementos_componente]([elemento_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [idx_depositos_perforador_id] ON [dbo].[depositos]([perforador_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [idx_modelos_marca_id] ON [dbo].[modelos]([marca_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [idx_elementos_deposito_medida_id] ON [dbo].[elementos_deposito]([medida_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [idx_elementos_deposito_deposito_id] ON [dbo].[elementos_deposito]([deposito_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [idx_elementos_deposito_modelo_id] ON [dbo].[elementos_deposito]([modelo_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [idx_elementos_deposito_elemento_componente_id] ON [dbo].[elementos_deposito]([elemento_componente_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [idx_log_elementos_perforador_id] ON [dbo].[log_elementos]([perforador_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [idx_log_elementos_elemento_deposito_id] ON [dbo].[log_elementos]([elemento_deposito_id]);

-- AddForeignKey
ALTER TABLE [dbo].[componentes_perforador] ADD CONSTRAINT [componentes_perforador_componente_id_fkey] FOREIGN KEY ([componente_id]) REFERENCES [dbo].[componentes]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[componentes_perforador] ADD CONSTRAINT [componentes_perforador_perforador_id_fkey] FOREIGN KEY ([perforador_id]) REFERENCES [dbo].[perforadores]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[elementos] ADD CONSTRAINT [elementos_tipo_elemento_id_fkey] FOREIGN KEY ([tipo_elemento_id]) REFERENCES [dbo].[tipos_elemento]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[elementos_componente] ADD CONSTRAINT [elementos_componente_componente_perforador_id_fkey] FOREIGN KEY ([componente_perforador_id]) REFERENCES [dbo].[componentes_perforador]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[elementos_componente] ADD CONSTRAINT [elementos_componente_elemento_id_fkey] FOREIGN KEY ([elemento_id]) REFERENCES [dbo].[elementos]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[depositos] ADD CONSTRAINT [depositos_perforador_id_fkey] FOREIGN KEY ([perforador_id]) REFERENCES [dbo].[perforadores]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[modelos] ADD CONSTRAINT [modelos_marca_id_fkey] FOREIGN KEY ([marca_id]) REFERENCES [dbo].[marcas]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[elementos_deposito] ADD CONSTRAINT [elementos_deposito_medida_id_fkey] FOREIGN KEY ([medida_id]) REFERENCES [dbo].[medidas]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[elementos_deposito] ADD CONSTRAINT [elementos_deposito_modelo_id_fkey] FOREIGN KEY ([modelo_id]) REFERENCES [dbo].[modelos]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[elementos_deposito] ADD CONSTRAINT [elementos_deposito_deposito_id_fkey] FOREIGN KEY ([deposito_id]) REFERENCES [dbo].[depositos]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[elementos_deposito] ADD CONSTRAINT [elementos_deposito_elemento_componente_id_fkey] FOREIGN KEY ([elemento_componente_id]) REFERENCES [dbo].[elementos_componente]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[log_elementos] ADD CONSTRAINT [log_elementos_elemento_deposito_id_fkey] FOREIGN KEY ([elemento_deposito_id]) REFERENCES [dbo].[elementos_deposito]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[log_elementos] ADD CONSTRAINT [log_elementos_perforador_id_fkey] FOREIGN KEY ([perforador_id]) REFERENCES [dbo].[perforadores]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
