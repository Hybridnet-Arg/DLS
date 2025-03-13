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
    [numero] INT NOT NULL,
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
    [fecha_inicio] DATETIME,
    [fecha_fin] DATETIME,
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
    [nombre] VARCHAR(255),
    [nombre_clave] VARCHAR(100),
    [descripcion] VARCHAR(max),
    [profundidad] DECIMAL(10,2),
    [fecha_inicio] DATETIME,
    [fecha_fin] DATETIME,
    [activo] BIT NOT NULL CONSTRAINT [pozos_activo_df] DEFAULT 0,
    [en_progreso] BIT NOT NULL CONSTRAINT [pozos_en_progreso_df] DEFAULT 0,
    [estado_pozo_id] INT,
    [perforador_locacion_id] INT,
    [plan_pozo_id] INT,
    [creado_el] DATETIME NOT NULL CONSTRAINT [pozos_creado_el_df] DEFAULT CURRENT_TIMESTAMP,
    [actualizado_el] DATETIME NOT NULL CONSTRAINT [pozos_actualizado_el_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [pozos_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[tipos_etapa_pozo] (
    [id] INT NOT NULL IDENTITY(1,1),
    [nombre] VARCHAR(255) NOT NULL,
    [creado_el] DATETIME NOT NULL CONSTRAINT [tipos_etapa_pozo_creado_el_df] DEFAULT CURRENT_TIMESTAMP,
    [actualizado_el] DATETIME NOT NULL CONSTRAINT [tipos_etapa_pozo_actualizado_el_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [tipos_etapa_pozo_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[etapas_pozo] (
    [id] INT NOT NULL IDENTITY(1,1),
    [profundidad_desde] DECIMAL(10,2),
    [profundidad_hasta] DECIMAL(10,2),
    [encamisado] BIT NOT NULL CONSTRAINT [etapas_pozo_encamisado_df] DEFAULT 0,
    [casing] VARCHAR(255),
    [tipo_etapa_pozo_id] INT,
    [pozo_id] INT,
    [creado_el] DATETIME NOT NULL CONSTRAINT [etapas_pozo_creado_el_df] DEFAULT CURRENT_TIMESTAMP,
    [actualizado_el] DATETIME NOT NULL CONSTRAINT [etapas_pozo_actualizado_el_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [etapas_pozo_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[planes_pozo] (
    [id] INT NOT NULL IDENTITY(1,1),
    [perforador_id] INT NOT NULL,
    [perforador_locacion_id] INT NOT NULL,
    [fecha_inicio] DATETIME,
    [fecha_fin] DATETIME,
    [creado_el] DATETIME NOT NULL CONSTRAINT [planes_pozo_creado_el_df] DEFAULT CURRENT_TIMESTAMP,
    [actualizado_el] DATETIME NOT NULL CONSTRAINT [planes_pozo_actualizado_el_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [planes_pozo_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[avances_pozo] (
    [id] INT NOT NULL IDENTITY(1,1),
    [pozo_id] INT NOT NULL,
    [nivel_trepano] DECIMAL(10,2) CONSTRAINT [avances_pozo_nivel_trepano_df] DEFAULT 0,
    [profundidad] DECIMAL(10,2) CONSTRAINT [avances_pozo_profundidad_df] DEFAULT 0,
    [velocidad] DECIMAL(10,2),
    [curva_de_avance] DECIMAL(10,2),
    [creado_el] DATETIME NOT NULL CONSTRAINT [avances_pozo_creado_el_df] DEFAULT CURRENT_TIMESTAMP,
    [actualizado_el] DATETIME NOT NULL CONSTRAINT [avances_pozo_actualizado_el_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [avances_pozo_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[detalles_avance_pozo] (
    [id] INT NOT NULL IDENTITY(1,1),
    [avance_pozo_id] INT NOT NULL,
    [etapa_pozo_id] INT NOT NULL,
    [metros_acumulados] DECIMAL(10,2),
    [porcentaje_alcanzado] DECIMAL(10,2),
    [creado_el] DATETIME NOT NULL CONSTRAINT [detalles_avance_pozo_creado_el_df] DEFAULT CURRENT_TIMESTAMP,
    [actualizado_el] DATETIME NOT NULL CONSTRAINT [detalles_avance_pozo_actualizado_el_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [detalles_avance_pozo_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[estados_diagrama] (
    [id] INT NOT NULL IDENTITY(1,1),
    [plan_pozo_id] INT NOT NULL,
    [perforador_id] INT NOT NULL,
    [creado_el] DATETIME NOT NULL CONSTRAINT [estados_diagrama_creado_el_df] DEFAULT CURRENT_TIMESTAMP,
    [actualizado_el] DATETIME NOT NULL CONSTRAINT [estados_diagrama_actualizado_el_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [estados_diagrama_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [estados_diagrama_plan_pozo_id_key] UNIQUE NONCLUSTERED ([plan_pozo_id])
);

-- CreateTable
CREATE TABLE [dbo].[detalles_estado_diagrama] (
    [id] INT NOT NULL IDENTITY(1,1),
    [estado_diagrama_id] INT NOT NULL,
    [pozo_id] INT NOT NULL,
    [etapa_pozo_id] INT NOT NULL,
    [conecta_con_etapa] INT,
    [creado_el] DATETIME NOT NULL CONSTRAINT [detalles_estado_diagrama_creado_el_df] DEFAULT CURRENT_TIMESTAMP,
    [actualizado_el] DATETIME NOT NULL CONSTRAINT [detalles_estado_diagrama_actualizado_el_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [detalles_estado_diagrama_pkey] PRIMARY KEY CLUSTERED ([id])
);

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
    [horas_desde] INT,
    [horas_hasta] INT,
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
CREATE TABLE [dbo].[tipos_rosca] (
    [id] INT NOT NULL IDENTITY(1,1),
    [nombre] VARCHAR(255),
    [creado_el] DATETIME NOT NULL CONSTRAINT [tipos_rosca_creado_el_df] DEFAULT CURRENT_TIMESTAMP,
    [actualizado_el] DATETIME NOT NULL CONSTRAINT [tipos_rosca_actualizado_el_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [tipos_rosca_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[elementos_deposito] (
    [id] INT NOT NULL IDENTITY(1,1),
    [codigo] VARCHAR(255),
    [serie] VARCHAR(255),
    [horas_iniciales] BIGINT,
    [horas_en_uso] BIGINT,
    [horas_de_uso] BIGINT,
    [horas_actuales] BIGINT,
    [recambio] BIT NOT NULL CONSTRAINT [elementos_deposito_recambio_df] DEFAULT 0,
    [en_uso] BIT NOT NULL CONSTRAINT [elementos_deposito_en_uso_df] DEFAULT 0,
    [baja] BIT NOT NULL CONSTRAINT [elementos_deposito_baja_df] DEFAULT 0,
    [motivo_baja] VARCHAR(255),
    [condicion] VARCHAR(255),
    [modelo_id] INT,
    [tipo_rosca_id] INT,
    [deposito_id] INT,
    [elemento_componente_id] INT,
    [fecha_instalacion] DATETIME,
    [fecha_retiro] DATETIME,
    [fecha_ingreso] DATETIME,
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
    [horas_iniciales] BIGINT,
    [horas_en_uso] BIGINT,
    [horas_de_uso] BIGINT,
    [creado_el] DATETIME NOT NULL CONSTRAINT [log_elementos_creado_el_df] DEFAULT CURRENT_TIMESTAMP,
    [actualizado_el] DATETIME NOT NULL CONSTRAINT [log_elementos_actualizado_el_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [log_elementos_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [idx_perforador_locaciones_perforador_id] ON [dbo].[perforador_locaciones]([perforador_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [idx_perforador_locaciones_locacion_id] ON [dbo].[perforador_locaciones]([locacion_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [idx_pozos_plan_pozo_id] ON [dbo].[pozos]([plan_pozo_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [idx_pozos_estado_pozo_id] ON [dbo].[pozos]([estado_pozo_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [idx_pozos_perforador_locacion_id] ON [dbo].[pozos]([perforador_locacion_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [idx_etapas_pozo_pozo_id] ON [dbo].[etapas_pozo]([pozo_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [idx_etapas_pozo_tipo_etapa_pozo_id] ON [dbo].[etapas_pozo]([tipo_etapa_pozo_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [idx_planes_pozo_perforador_id] ON [dbo].[planes_pozo]([perforador_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [idx_planes_pozo_perforador_locacion_id] ON [dbo].[planes_pozo]([perforador_locacion_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [idx_avances_pozo_pozo_id] ON [dbo].[avances_pozo]([pozo_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [idx_detalles_avance_pozo_etapa_pozo] ON [dbo].[detalles_avance_pozo]([etapa_pozo_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [idx_detalles_avance_pozo_avance_pozo_id] ON [dbo].[detalles_avance_pozo]([avance_pozo_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [idx_pozos_plan_pozo_id] ON [dbo].[estados_diagrama]([plan_pozo_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [idx_estados_diagrama_perforador_id] ON [dbo].[estados_diagrama]([perforador_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [idx_detalles_estado_diagrama_pozo_id] ON [dbo].[detalles_estado_diagrama]([pozo_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [idx_detalles_estado_diagrama_etapa_pozo_id] ON [dbo].[detalles_estado_diagrama]([etapa_pozo_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [idx_detalles_estado_diagrama_estado_diagrama_id] ON [dbo].[detalles_estado_diagrama]([estado_diagrama_id]);

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
ALTER TABLE [dbo].[item] ADD CONSTRAINT [FK_item_diametro] FOREIGN KEY ([idDiametro]) REFERENCES [dbo].[diametro]([idDiametro]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[item] ADD CONSTRAINT [FK_item_Pieza] FOREIGN KEY ([idPieza]) REFERENCES [dbo].[pieza]([idPieza]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[log] ADD CONSTRAINT [FK_log_piezaPerforador] FOREIGN KEY ([idPerforadorPieza]) REFERENCES [dbo].[perforadorPieza]([idPerforadorPieza]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[perforadorPieza] ADD CONSTRAINT [FK_perforadorPieza_diametro] FOREIGN KEY ([idDiametro]) REFERENCES [dbo].[diametro]([idDiametro]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[perforadorPieza] ADD CONSTRAINT [FK_perforadorPieza_Marca] FOREIGN KEY ([idMarca]) REFERENCES [dbo].[marca]([idMarca]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[perforadorPieza] ADD CONSTRAINT [FK_perforadorPieza_Pieza] FOREIGN KEY ([idPieza]) REFERENCES [dbo].[pieza]([idPieza]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[piezaDiametro] ADD CONSTRAINT [FK_piezaDiametro_Diametro] FOREIGN KEY ([idDiametro]) REFERENCES [dbo].[diametro]([idDiametro]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[piezaDiametro] ADD CONSTRAINT [FK_piezaDiametro_pieza] FOREIGN KEY ([idPieza]) REFERENCES [dbo].[pieza]([idPieza]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[piezaPerforador] ADD CONSTRAINT [FK_piezaPerforador_pieza] FOREIGN KEY ([idPieza]) REFERENCES [dbo].[pieza]([idPieza]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[pnq] ADD CONSTRAINT [FK_pnq_item1] FOREIGN KEY ([inv_item1]) REFERENCES [dbo].[item]([inv_item]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[pnq] ADD CONSTRAINT [FK_pnq_item2] FOREIGN KEY ([inv_item2]) REFERENCES [dbo].[item]([inv_item]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[pnq] ADD CONSTRAINT [FK_pnq_item3] FOREIGN KEY ([inv_item3]) REFERENCES [dbo].[item]([inv_item]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[pnq] ADD CONSTRAINT [FK_pnq_item4] FOREIGN KEY ([inv_item4]) REFERENCES [dbo].[item]([inv_item]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[perforador_locaciones] ADD CONSTRAINT [perforador_locaciones_locacion_id_fkey] FOREIGN KEY ([locacion_id]) REFERENCES [dbo].[locaciones]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[perforador_locaciones] ADD CONSTRAINT [perforador_locaciones_perforador_id_fkey] FOREIGN KEY ([perforador_id]) REFERENCES [dbo].[perforadores]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[pozos] ADD CONSTRAINT [pozos_plan_pozo_id_fkey] FOREIGN KEY ([plan_pozo_id]) REFERENCES [dbo].[planes_pozo]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[pozos] ADD CONSTRAINT [pozos_estado_pozo_id_fkey] FOREIGN KEY ([estado_pozo_id]) REFERENCES [dbo].[estados_pozo]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[pozos] ADD CONSTRAINT [pozos_perforador_locacion_id_fkey] FOREIGN KEY ([perforador_locacion_id]) REFERENCES [dbo].[perforador_locaciones]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[etapas_pozo] ADD CONSTRAINT [etapas_pozo_pozo_id_fkey] FOREIGN KEY ([pozo_id]) REFERENCES [dbo].[pozos]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[etapas_pozo] ADD CONSTRAINT [etapas_pozo_tipo_etapa_pozo_id_fkey] FOREIGN KEY ([tipo_etapa_pozo_id]) REFERENCES [dbo].[tipos_etapa_pozo]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[planes_pozo] ADD CONSTRAINT [planes_pozo_perforador_id_fkey] FOREIGN KEY ([perforador_id]) REFERENCES [dbo].[perforadores]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[planes_pozo] ADD CONSTRAINT [planes_pozo_perforador_locacion_id_fkey] FOREIGN KEY ([perforador_locacion_id]) REFERENCES [dbo].[perforador_locaciones]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[avances_pozo] ADD CONSTRAINT [avances_pozo_pozo_id_fkey] FOREIGN KEY ([pozo_id]) REFERENCES [dbo].[pozos]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[detalles_avance_pozo] ADD CONSTRAINT [detalles_avance_pozo_etapa_pozo_id_fkey] FOREIGN KEY ([etapa_pozo_id]) REFERENCES [dbo].[etapas_pozo]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[detalles_avance_pozo] ADD CONSTRAINT [detalles_avance_pozo_avance_pozo_id_fkey] FOREIGN KEY ([avance_pozo_id]) REFERENCES [dbo].[avances_pozo]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[estados_diagrama] ADD CONSTRAINT [estados_diagrama_perforador_id_fkey] FOREIGN KEY ([perforador_id]) REFERENCES [dbo].[perforadores]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[estados_diagrama] ADD CONSTRAINT [estados_diagrama_plan_pozo_id_fkey] FOREIGN KEY ([plan_pozo_id]) REFERENCES [dbo].[planes_pozo]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[detalles_estado_diagrama] ADD CONSTRAINT [detalles_estado_diagrama_pozo_id_fkey] FOREIGN KEY ([pozo_id]) REFERENCES [dbo].[pozos]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[detalles_estado_diagrama] ADD CONSTRAINT [detalles_estado_diagrama_etapa_pozo_id_fkey] FOREIGN KEY ([etapa_pozo_id]) REFERENCES [dbo].[etapas_pozo]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[detalles_estado_diagrama] ADD CONSTRAINT [detalles_estado_diagrama_estado_diagrama_id_fkey] FOREIGN KEY ([estado_diagrama_id]) REFERENCES [dbo].[estados_diagrama]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

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
ALTER TABLE [dbo].[elementos_deposito] ADD CONSTRAINT [elementos_deposito_modelo_id_fkey] FOREIGN KEY ([modelo_id]) REFERENCES [dbo].[modelos]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[elementos_deposito] ADD CONSTRAINT [elementos_deposito_deposito_id_fkey] FOREIGN KEY ([deposito_id]) REFERENCES [dbo].[depositos]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[elementos_deposito] ADD CONSTRAINT [elementos_deposito_tipo_rosca_id_fkey] FOREIGN KEY ([tipo_rosca_id]) REFERENCES [dbo].[tipos_rosca]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

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
