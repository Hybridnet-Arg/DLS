BEGIN TRY

BEGIN TRAN;

SET IDENTITY_INSERT [dbo].[tubulares_rangos] ON
INSERT INTO [dbo].[tubulares_rangos] ([id], [nombre], [creado_el], [actualizado_el]) VALUES
('1', N'Rango II', '2025-03-27 14:53:13.610', '2025-03-27 14:53:13.610'),
('2', N'Rango III', '2025-03-27 14:53:13.610', '2025-03-27 14:53:13.610'),
('3', N'Otro', '2025-03-27 14:53:13.610', '2025-03-27 14:53:13.610');
SET IDENTITY_INSERT [dbo].[tubulares_rangos] OFF

SET IDENTITY_INSERT [dbo].[tubulares_talleres] ON
INSERT INTO [dbo].[tubulares_talleres] ([id], [nombre], [creado_el], [actualizado_el]) VALUES
('1', N'OTI', '2025-03-27 14:53:13.737', '2025-03-27 14:53:13.737'),
('2', N'NDT', '2025-03-27 14:53:13.737', '2025-03-27 14:53:13.737'),
('3', N'BM', '2025-03-27 14:53:13.737', '2025-03-27 14:53:13.737');
SET IDENTITY_INSERT [dbo].[tubulares_talleres] OFF

SET IDENTITY_INSERT [dbo].[tubulares_tipos_barra] ON
INSERT INTO [dbo].[tubulares_tipos_barra] ([id], [nombre], [creado_el], [actualizado_el]) VALUES
('1', N'Barra de sondeo', '2025-03-27 14:53:13.657', '2025-03-27 14:53:13.657'),
('2', N'Hemingway', '2025-03-27 14:53:13.657', '2025-03-27 14:53:13.657'),
('3', N'Porta mecha', '2025-03-27 14:53:13.657', '2025-03-27 14:53:13.657'),
('4', N'Otro', '2025-03-27 14:53:13.657', '2025-03-27 14:53:13.657');
SET IDENTITY_INSERT [dbo].[tubulares_tipos_barra] OFF

SET IDENTITY_INSERT [dbo].[tubulares_tipos_conexion] ON
INSERT INTO [dbo].[tubulares_tipos_conexion] ([id], [nombre], [creado_el], [actualizado_el]) VALUES
('1', N'NC-50 GRADO G', '2025-03-27 14:53:13.627', '2025-03-27 14:53:13.627'),
('2', N'NC-50 GRADO S', '2025-03-27 14:53:13.627', '2025-03-27 14:53:13.627'),
('3', N'ST-40+', '2025-03-27 14:53:13.627', '2025-03-27 14:53:13.627'),
('4', N'TSDS-40', '2025-03-27 14:53:13.627', '2025-03-27 14:53:13.627'),
('5', N'VX-39', '2025-03-27 14:53:13.627', '2025-03-27 14:53:13.627'),
('6', N'XT-39', '2025-03-27 14:53:13.627', '2025-03-27 14:53:13.627'),
('7', N'Otro', '2025-03-27 14:53:13.627', '2025-03-27 14:53:13.627');
SET IDENTITY_INSERT [dbo].[tubulares_tipos_conexion] OFF

SET IDENTITY_INSERT [dbo].[tubulares_destinos] ON
INSERT INTO [dbo].[tubulares_destinos] ([id], [nombre], [creado_el], [actualizado_el]) VALUES
('1', N'Locación', '2025-03-27 14:53:13.707', '2025-03-27 14:53:13.707'),
('2', N'Taller', '2025-03-27 14:53:13.707', '2025-03-27 14:53:13.707'),
('3', N'Base', '2025-03-27 14:53:13.707', '2025-03-27 14:53:13.707'),
('4', N'Otro perforador', '2025-03-27 14:53:13.707', '2025-03-27 14:53:13.707'),
('5', N'Scrap', '2025-03-27 14:53:13.707', '2025-03-27 14:53:13.707'),
('6', N'Perdida en pozo', '2025-03-27 14:53:13.707', '2025-03-27 14:53:13.707');
SET IDENTITY_INSERT [dbo].[tubulares_destinos] OFF


SET IDENTITY_INSERT [dbo].[tubulares_estados_barra] ON
INSERT INTO [dbo].[tubulares_estados_barra] ([id], [nombre], [creado_el], [actualizado_el]) VALUES
('1', N'Operativas', '2025-03-27 14:53:13.690', '2025-03-27 14:53:13.690'),
('2', N'Inspeccion/reparación', '2025-03-27 14:53:13.690', '2025-03-27 14:53:13.690'),
('3', N'Descarte', '2025-03-27 14:53:13.690', '2025-03-27 14:53:13.690');
SET IDENTITY_INSERT [dbo].[tubulares_estados_barra] OFF

SET IDENTITY_INSERT [dbo].[tubulares_proveedores] ON
INSERT INTO [dbo].[tubulares_proveedores] ([id], [nombre], [creado_el], [actualizado_el]) VALUES
('1', N'Test', '2025-03-27 14:53:13.677', '2025-03-27 14:53:13.677');
SET IDENTITY_INSERT [dbo].[tubulares_proveedores] OFF

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
