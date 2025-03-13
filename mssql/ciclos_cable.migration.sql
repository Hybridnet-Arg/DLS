BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[diametros] (
    [id] INT NOT NULL IDENTITY(1,1),
    [pulgadas] VARCHAR(255),
    [corte] DECIMAL(18,1),
    [largo_corte] DECIMAL(18,1),
    [metros_cable] DECIMAL(18,1),
    [metros_despliegue] DECIMAL(18,1),
    [creado_el] DATETIME NOT NULL CONSTRAINT [diametros_creado_el_df] DEFAULT CURRENT_TIMESTAMP,
    [actualizado_el] DATETIME NOT NULL CONSTRAINT [diametros_actualizado_el_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [diametros_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AlterTable
ALTER TABLE [dbo].[elementos_deposito] ADD [diametro_id] INT,
[marca_id] INT;
-- AddForeignKey
ALTER TABLE [dbo].[elementos_deposito] ADD CONSTRAINT [elementos_deposito_marca_id_fkey] FOREIGN KEY ([marca_id]) REFERENCES [dbo].[marcas]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;
-- AddForeignKey
ALTER TABLE [dbo].[elementos_deposito] ADD CONSTRAINT [elementos_deposito_diametro_id_fkey] FOREIGN KEY ([diametro_id]) REFERENCES [dbo].[diametros]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE [dbo].[cortes_cable] (
    [id] INT NOT NULL IDENTITY(1,1),
    [metros_corte] DECIMAL(18,1),
    [fecha_corte] DATETIME2,
    [remanente] DECIMAL(18,1),
    [motivo] VARCHAR(255),
    [elemento_deposito_id] INT NOT NULL,
    [creado_el] DATETIME NOT NULL CONSTRAINT [cortes_cable_creado_el_df] DEFAULT CURRENT_TIMESTAMP,
    [actualizado_el] DATETIME NOT NULL CONSTRAINT [cortes_cable_actualizado_el_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [cortes_cable_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[usuarios] (
    [id] INT NOT NULL IDENTITY(1,1),
    [alias] VARCHAR(255) NOT NULL,
    [ultimo_ingreso] DATETIME NOT NULL CONSTRAINT [usuarios_ultimo_ingreso_df] DEFAULT CURRENT_TIMESTAMP,
    [creado_el] DATETIME NOT NULL CONSTRAINT [usuarios_creado_el_df] DEFAULT CURRENT_TIMESTAMP,
    [actualizado_el] DATETIME NOT NULL CONSTRAINT [usuarios_actualizado_el_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [usuarios_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [usuarios_alias_key] UNIQUE NONCLUSTERED ([alias])
);

-- CreateTable
CREATE TABLE [dbo].[desgastes_cable] (
    [id] INT NOT NULL IDENTITY(1,1),
    [perforador_id] INT NOT NULL,
    [componente_perforador_id] INT NOT NULL,
    [elemento_componente_id] INT NOT NULL,
    [elemento_deposito_id] INT NOT NULL,
    [bit_weight] DECIMAL(18,1),
    [block_height] DECIMAL(18,1),
    [desgaste] DECIMAL(18,1),
    [creado_el] DATETIME NOT NULL CONSTRAINT [desgastes_cable_creado_el_df] DEFAULT CURRENT_TIMESTAMP,
    [actualizado_el] DATETIME NOT NULL CONSTRAINT [desgastes_cable_actualizado_el_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [desgastes_cable_pkey] PRIMARY KEY CLUSTERED ([id])
);


-- CreateIndex
CREATE NONCLUSTERED INDEX [idx_desgastes_cable_perforador_id] ON [dbo].[desgastes_cable]([perforador_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [idx_desgastes_cable_elemento_deposito_id] ON [dbo].[desgastes_cable]([elemento_deposito_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [idx_desgastes_cable_elementos_componente_id] ON [dbo].[desgastes_cable]([elemento_componente_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [idx_desgastes_cable_componente_perforador_id] ON [dbo].[desgastes_cable]([componente_perforador_id]);

-- AddForeignKey
ALTER TABLE [dbo].[cortes_cable] ADD CONSTRAINT [cortes_cable_elemento_deposito_id_fkey] FOREIGN KEY ([elemento_deposito_id]) REFERENCES [dbo].[elementos_deposito]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[desgastes_cable] ADD CONSTRAINT [desgastes_cable_elemento_componente_id_fkey] FOREIGN KEY ([elemento_componente_id]) REFERENCES [dbo].[elementos_componente]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[desgastes_cable] ADD CONSTRAINT [desgastes_cable_componente_perforador_id_fkey] FOREIGN KEY ([componente_perforador_id]) REFERENCES [dbo].[componentes_perforador]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[desgastes_cable] ADD CONSTRAINT [desgastes_cable_elemento_deposito_id_fkey] FOREIGN KEY ([elemento_deposito_id]) REFERENCES [dbo].[elementos_deposito]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[desgastes_cable] ADD CONSTRAINT [desgastes_cable_perforador_id_fkey] FOREIGN KEY ([perforador_id]) REFERENCES [dbo].[perforadores]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AlterTable
ALTER TABLE [dbo].[log_elementos] ADD [fecha_alta] DATETIME2,
[fecha_baja] DATETIME2;
-- AlterTable
ALTER TABLE [dbo].[log_elementos] ADD [usuario_id] INT;

-- AddForeignKey
ALTER TABLE [dbo].[log_elementos] ADD CONSTRAINT [log_elementos_usuario_id_fkey] FOREIGN KEY ([usuario_id]) REFERENCES [dbo].[usuarios]([id]) ON DELETE SET NULL ON UPDATE CASCADE;


COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
