BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[locaciones] (
    [id] INT NOT NULL IDENTITY(1,1),
    [nombre] VARCHAR(255) NOT NULL,
    [nombre_clave] VARCHAR(255),
    [descripcion] VARCHAR(max),
    [deshabilitado] BIT NOT NULL CONSTRAINT [locaciones_deshabilitado_df] DEFAULT 0,
    [creado_el] DATETIME NOT NULL CONSTRAINT [locaciones_creado_el_df] DEFAULT CURRENT_TIMESTAMP,
    [actualizado_el] DATETIME NOT NULL CONSTRAINT [locaciones_actualizado_el_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [locaciones_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[perforadores] (
    [id] INT NOT NULL IDENTITY(1,1),
    [nombre] VARCHAR(255) NOT NULL,
    [nombre_clave] VARCHAR(100),
    [numero] VARCHAR(255),
    [descripcion] VARCHAR(max),
    [estado] VARCHAR(50),
    [deshabilitado] BIT NOT NULL CONSTRAINT [perforadores_deshabilitado_df] DEFAULT 0,
    [creado_el] DATETIME NOT NULL CONSTRAINT [perforadores_creado_el_df] DEFAULT CURRENT_TIMESTAMP,
    [actualizado_el] DATETIME NOT NULL CONSTRAINT [perforadores_actualizado_el_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [perforadores_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[perforador_locaciones] (
    [id] INT NOT NULL IDENTITY(1,1),
    [activo] BIT NOT NULL CONSTRAINT [perforador_locaciones_activo_df] DEFAULT 0,
    [locacion_id] INT NOT NULL,
    [perforador_id] INT NOT NULL,
    [fecha_inicio] DATE NOT NULL,
    [fecha_fin] DATE NOT NULL,
    [creado_el] DATETIME NOT NULL CONSTRAINT [perforador_locaciones_creado_el_df] DEFAULT CURRENT_TIMESTAMP,
    [actualizado_el] DATETIME NOT NULL CONSTRAINT [perforador_locaciones_actualizado_el_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [perforador_locaciones_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[estados_pozo] (
    [id] INT NOT NULL IDENTITY(1,1),
    [nombre] VARCHAR(255) NOT NULL,
    [creado_el] DATETIME NOT NULL CONSTRAINT [estados_pozo_creado_el_df] DEFAULT CURRENT_TIMESTAMP,
    [actualizado_el] DATETIME NOT NULL CONSTRAINT [estados_pozo_actualizado_el_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [estados_pozo_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [estados_pozo_nombre_key] UNIQUE NONCLUSTERED ([nombre])
);

-- CreateTable
CREATE TABLE [dbo].[pozos] (
    [id] INT NOT NULL IDENTITY(1,1),
    [nombre] VARCHAR(255) NOT NULL,
    [nombre_clave] VARCHAR(100) NOT NULL,
    [descripcion] VARCHAR(max),
    [profundidad] DECIMAL(10,2) NOT NULL,
    [fecha_inicio] DATE NOT NULL,
    [fecha_fin] DATE NOT NULL,
    [activo] BIT NOT NULL CONSTRAINT [pozos_activo_df] DEFAULT 0,
    [estado_pozo_id] INT NOT NULL,
    [perforador_locacion_id] INT NOT NULL,
    [creado_el] DATETIME NOT NULL CONSTRAINT [pozos_creado_el_df] DEFAULT CURRENT_TIMESTAMP,
    [actualizado_el] DATETIME NOT NULL CONSTRAINT [pozos_actualizado_el_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [pozos_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[etapas_pozo] (
    [id] INT NOT NULL IDENTITY(1,1),
    [nombre] VARCHAR(255) NOT NULL,
    [profundidad_desde] DECIMAL(10,2) NOT NULL,
    [profundidad_hasta] DECIMAL(10,2) NOT NULL,
    [encamisa] VARCHAR(255) NOT NULL,
    [casing] VARCHAR(255) NOT NULL,
    [pozo_id] INT NOT NULL,
    [creado_el] DATETIME NOT NULL CONSTRAINT [etapas_pozo_creado_el_df] DEFAULT CURRENT_TIMESTAMP,
    [actualizado_el] DATETIME NOT NULL CONSTRAINT [etapas_pozo_actualizado_el_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [etapas_pozo_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[planes_pozo] (
    [id] INT NOT NULL IDENTITY(1,1),
    [nombre] VARCHAR(255),
    [perforador_id] INT NOT NULL,
    [perforador_locacion_id] INT NOT NULL,
    [pozo_id] INT NOT NULL,
    [creado_el] DATETIME NOT NULL CONSTRAINT [planes_pozo_creado_el_df] DEFAULT CURRENT_TIMESTAMP,
    [actualizado_el] DATETIME NOT NULL CONSTRAINT [planes_pozo_actualizado_el_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [planes_pozo_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [idx_perforador_locaciones_perforador_id] ON [dbo].[perforador_locaciones]([perforador_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [idx_perforador_locaciones_locacion_id] ON [dbo].[perforador_locaciones]([locacion_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [idx_pozos_estado_pozo_id] ON [dbo].[pozos]([estado_pozo_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [idx_pozos_perforador_locacion_id] ON [dbo].[pozos]([perforador_locacion_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [idx_etapas_pozo_pozo_id] ON [dbo].[etapas_pozo]([pozo_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [idx_planes_pozo_perforador_id] ON [dbo].[planes_pozo]([perforador_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [idx_planes_pozo_perforador_locacion_id] ON [dbo].[planes_pozo]([perforador_locacion_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [idx_planes_pozo_pozo_id] ON [dbo].[planes_pozo]([pozo_id]);

-- AddForeignKey
ALTER TABLE [dbo].[perforador_locaciones] ADD CONSTRAINT [perforador_locaciones_locacion_id_fkey] FOREIGN KEY ([locacion_id]) REFERENCES [dbo].[locaciones]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[perforador_locaciones] ADD CONSTRAINT [perforador_locaciones_perforador_id_fkey] FOREIGN KEY ([perforador_id]) REFERENCES [dbo].[perforadores]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[pozos] ADD CONSTRAINT [pozos_perforador_locacion_id_fkey] FOREIGN KEY ([perforador_locacion_id]) REFERENCES [dbo].[perforador_locaciones]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[pozos] ADD CONSTRAINT [pozos_estado_pozo_id_fkey] FOREIGN KEY ([estado_pozo_id]) REFERENCES [dbo].[estados_pozo]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[etapas_pozo] ADD CONSTRAINT [etapas_pozo_pozo_id_fkey] FOREIGN KEY ([pozo_id]) REFERENCES [dbo].[pozos]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[planes_pozo] ADD CONSTRAINT [planes_pozo_perforador_id_fkey] FOREIGN KEY ([perforador_id]) REFERENCES [dbo].[perforadores]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[planes_pozo] ADD CONSTRAINT [planes_pozo_perforador_locacion_id_fkey] FOREIGN KEY ([perforador_locacion_id]) REFERENCES [dbo].[perforador_locaciones]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[planes_pozo] ADD CONSTRAINT [planes_pozo_pozo_id_fkey] FOREIGN KEY ([pozo_id]) REFERENCES [dbo].[pozos]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
