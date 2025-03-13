BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[diametro] (
    [idDiametro] INT NOT NULL IDENTITY(1,1),
    [diametro] VARCHAR(10) NOT NULL,
    CONSTRAINT [PK_diametro] PRIMARY KEY CLUSTERED ([idDiametro])
);

-- CreateTable
CREATE TABLE [dbo].[item] (
    [inv_item] VARCHAR(12) NOT NULL,
    [descr] VARCHAR(50) NOT NULL,
    [idPieza] INT NOT NULL,
    [idDiametro] INT,
    CONSTRAINT [PK_item] PRIMARY KEY CLUSTERED ([inv_item])
);

-- CreateTable
CREATE TABLE [dbo].[log] (
    [idLog] INT NOT NULL IDENTITY(1,1),
    [idPerforadorPieza] INT NOT NULL,
    [movimiento] VARCHAR(50) NOT NULL,
    [detalle] VARCHAR(50),
    [fecha] DATETIME CONSTRAINT [DF_log_fecha] DEFAULT CURRENT_TIMESTAMP,
    [bomba] INT,
    [cuerpo] INT,
    [modulo] VARCHAR(50) CONSTRAINT [DF_log_modulo] DEFAULT '',
    [hs] DECIMAL(18,1),
    [usuario] VARCHAR(50),
    [perforador] VARCHAR(50),
    CONSTRAINT [PK_log] PRIMARY KEY CLUSTERED ([idLog])
);

-- CreateTable
CREATE TABLE [dbo].[logPieza] (
    [idLogPieza] INT NOT NULL IDENTITY(1,1),
    [idPerforadorPieza] INT NOT NULL,
    [fecha] DATETIME NOT NULL CONSTRAINT [DF_logPieza_fecha] DEFAULT CURRENT_TIMESTAMP,
    [hs] DECIMAL(18,1) NOT NULL,
    [hsInst] DECIMAL(18,1) NOT NULL,
    CONSTRAINT [PK_logPieza] PRIMARY KEY CLUSTERED ([idLogPieza])
);

-- CreateTable
CREATE TABLE [dbo].[marca] (
    [idMarca] INT NOT NULL IDENTITY(1,1),
    [marca] NCHAR(50) NOT NULL,
    CONSTRAINT [PK_marca] PRIMARY KEY CLUSTERED ([idMarca])
);

-- CreateTable
CREATE TABLE [dbo].[perforador] (
    [perforador] VARCHAR(50) NOT NULL,
    [tipoBomba] NCHAR(10) NOT NULL,
    [factu] DATETIME NOT NULL,
    CONSTRAINT [PK_perforador] PRIMARY KEY CLUSTERED ([perforador])
);

-- CreateTable
CREATE TABLE [dbo].[perforadorPieza] (
    [idPerforadorPieza] INT NOT NULL IDENTITY(1,1),
    [perforador] VARCHAR(50) NOT NULL,
    [idPieza] INT NOT NULL,
    [hs] DECIMAL(18,1) NOT NULL,
    [hsInst] DECIMAL(18,1) NOT NULL,
    [serie] VARCHAR(50),
    [enUso] TINYINT NOT NULL,
    [baja] TINYINT NOT NULL CONSTRAINT [DF_perforadorPieza_baja] DEFAULT 0,
    [motivo] VARCHAR(50),
    [bomba] INT NOT NULL CONSTRAINT [DF_perforadorPieza_bomba] DEFAULT 1,
    [cuerpo] INT NOT NULL CONSTRAINT [DF_perforadorPieza_cuerpo] DEFAULT 1,
    [modulo] NVARCHAR(50) CONSTRAINT [DF_perforadorPieza_modulo] DEFAULT '0',
    [idMarca] INT,
    [idDiametro] INT,
    CONSTRAINT [PK_perforadorPieza] PRIMARY KEY CLUSTERED ([idPerforadorPieza])
);

-- CreateTable
CREATE TABLE [dbo].[perforadorPiezaBackUp] (
    [idPerforadorPieza] INT NOT NULL,
    [perforador] VARCHAR(50) NOT NULL,
    [idPieza] INT NOT NULL,
    [hs] DECIMAL(18,1) NOT NULL,
    [hsInst] DECIMAL(18,1) NOT NULL,
    [serie] VARCHAR(50),
    [enUso] TINYINT NOT NULL,
    [baja] TINYINT NOT NULL,
    [motivo] VARCHAR(50),
    [bomba] INT NOT NULL,
    [cuerpo] INT NOT NULL,
    [modulo] NVARCHAR(50),
    [idMarca] INT,
    [idDiametro] INT
);

-- CreateTable
CREATE TABLE [dbo].[pieza] (
    [idPieza] INT NOT NULL IDENTITY(1,1),
    [tipo] VARCHAR(25),
    [codigo] VARCHAR(25),
    [hsMin] INT NOT NULL,
    [hsMax] INT NOT NULL,
    [serie] TINYINT NOT NULL CONSTRAINT [DF_pieza_serie] DEFAULT 0,
    [nroPieza] INT NOT NULL CONSTRAINT [DF_pieza_nroPieza] DEFAULT 1,
    [diametro] TINYINT NOT NULL CONSTRAINT [DF_pieza_diametro] DEFAULT 0,
    CONSTRAINT [PK_pieza] PRIMARY KEY CLUSTERED ([idPieza])
);

-- CreateTable
CREATE TABLE [dbo].[piezaDiametro] (
    [idPiezaDiametro] INT NOT NULL IDENTITY(1,1),
    [idPieza] INT NOT NULL,
    [idDiametro] INT NOT NULL,
    CONSTRAINT [PK_piezaDiametro] PRIMARY KEY CLUSTERED ([idPiezaDiametro])
);

-- CreateTable
CREATE TABLE [dbo].[piezaPerforador] (
    [idPiezaPerforador] INT NOT NULL IDENTITY(1,1),
    [idPieza] INT NOT NULL,
    [perforador] VARCHAR(50) NOT NULL,
    [stock] INT NOT NULL CONSTRAINT [DF_piezaPerforador_stock] DEFAULT 5,
    [reposicion] INT NOT NULL CONSTRAINT [DF_piezaPerforador_reposicion] DEFAULT 5,
    CONSTRAINT [PK_piezaPerforador] PRIMARY KEY CLUSTERED ([idPiezaPerforador])
);

-- CreateTable
CREATE TABLE [dbo].[pnq] (
    [idPnq] INT NOT NULL IDENTITY(1,1),
    [unidadNegocio] VARCHAR(10) NOT NULL,
    [distributionType] VARCHAR(12) NOT NULL,
    [inv_item1] VARCHAR(12) NOT NULL,
    [inv_item2] VARCHAR(12),
    [inv_item3] VARCHAR(12),
    [inv_item4] VARCHAR(12),
    [cantidad] INT NOT NULL,
    [estado] NCHAR(10) NOT NULL,
    [fecha] DATETIME NOT NULL CONSTRAINT [DF_pnq_fecha] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [PK_pnq] PRIMARY KEY CLUSTERED ([idPnq])
);

-- CreateTable
CREATE TABLE [dbo].[vfBomba] (
    [idVfBomba] INT NOT NULL,
    [vf1] INT NOT NULL,
    [vf2] INT NOT NULL,
    CONSTRAINT [PK_vfBomba] PRIMARY KEY CLUSTERED ([idVfBomba])
);

-- CreateTable
CREATE TABLE [dbo].[wellData] (
    [idWellData] INT NOT NULL IDENTITY(1,1),
    [fecha] DATETIME CONSTRAINT [DF_wellData_fecha] DEFAULT CURRENT_TIMESTAMP,
    [hsBomba1] DECIMAL(18,1) NOT NULL,
    [hsBomba2] DECIMAL(18,1) NOT NULL,
    [hsBomba3] DECIMAL(18,1) NOT NULL,
    [lts] DECIMAL(18,1) NOT NULL,
    [perforador] INT,
    [jobId] NCHAR(30),
    [perforadorStr] NCHAR(10),
    [onBomba1] TINYINT,
    [onBomba2] TINYINT,
    [onBomba3] TINYINT,
    CONSTRAINT [PK_wellData] PRIMARY KEY CLUSTERED ([idWellData])
);

-- CreateTable
CREATE TABLE [dbo].[sysdiagrams] (
    [name] NVARCHAR(128) NOT NULL,
    [principal_id] INT NOT NULL,
    [diagram_id] INT NOT NULL IDENTITY(1,1),
    [version] INT,
    [definition] VARBINARY(max),
    CONSTRAINT [PK__sysdiagr__C2B05B61F765061A] PRIMARY KEY CLUSTERED ([diagram_id]),
    CONSTRAINT [UK_principal_name] UNIQUE NONCLUSTERED ([principal_id],[name])
);

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

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
