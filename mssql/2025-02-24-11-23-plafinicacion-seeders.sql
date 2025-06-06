SET IDENTITY_INSERT [dbo].[planificacion_areas] ON
INSERT INTO [dbo].[planificacion_areas] ([id], [nombre], [deshabilitado], [creado_el], [actualizado_el]) VALUES
('1', N'Supply chain', '0', '2025-02-24 13:21:53.473', '2025-02-24 13:21:53.473'),
('2', N'RRHH', '0', '2025-02-24 13:21:53.577', '2025-02-24 13:21:53.577'),
('3', N'Logistica', '0', '2025-02-24 13:21:53.617', '2025-02-24 13:21:53.617'),
('4', N'SSMAC', '0', '2025-02-24 13:21:53.687', '2025-02-24 13:21:53.687'),
('5', N'IT', '0', '2025-02-24 13:21:53.760', '2025-02-24 13:21:53.760'),
('6', N'Tubulares', '0', '2025-02-24 13:21:53.830', '2025-02-24 13:21:53.830'),
('7', N'Servicios Generales', '0', '2025-02-24 13:21:53.920', '2025-02-24 13:21:53.920'),
('8', N'Mantenimiento', '0', '2025-02-24 13:21:53.970', '2025-02-24 13:21:53.970');
SET IDENTITY_INSERT [dbo].[planificacion_areas] OFF

SET IDENTITY_INSERT [dbo].[planificacion_actividades] ON
INSERT INTO [dbo].[planificacion_actividades] ([id], [nombre], [planificacion_area_id], [deshabilitado], [creado_el], [actualizado_el]) VALUES
('1', N'Evaluación de compra', '1', '0', '2025-02-24 13:21:53.473', '2025-02-24 13:21:53.473'),
('2', N'Evaluación de costos', '1', '0', '2025-02-24 13:21:53.473', '2025-02-24 13:21:53.473'),
('3', N'Evaluación de Stock disponible', '1', '0', '2025-02-24 13:21:53.473', '2025-02-24 13:21:53.473'),
('4', N'Solicitud de personal - CRT', '2', '0', '2025-02-24 13:21:53.577', '2025-02-24 13:21:53.577'),
('5', N'Solicitud de personal - Entubada', '2', '0', '2025-02-24 13:21:53.577', '2025-02-24 13:21:53.577'),
('6', N'CRT', '3', '0', '2025-02-24 13:21:53.617', '2025-02-24 13:21:53.617'),
('7', N'GASOIL', '3', '0', '2025-02-24 13:21:53.617', '2025-02-24 13:21:53.617'),
('8', N'Llave H', '3', '0', '2025-02-24 13:21:53.617', '2025-02-24 13:21:53.617'),
('9', N'Llave Torque', '3', '0', '2025-02-24 13:21:53.617', '2025-02-24 13:21:53.617'),
('10', N'Grua', '3', '0', '2025-02-24 13:21:53.617', '2025-02-24 13:21:53.617'),
('11', N'Petrolero', '3', '0', '2025-02-24 13:21:53.617', '2025-02-24 13:21:53.617'),
('12', N'Montaje MPD', '3', '0', '2025-02-24 13:21:53.617', '2025-02-24 13:21:53.617'),
('13', N'Envio de Barras', '3', '0', '2025-02-24 13:21:53.617', '2025-02-24 13:21:53.617'),
('14', N'Retiro de Barras', '3', '0', '2025-02-24 13:21:53.617', '2025-02-24 13:21:53.617'),
('15', N'Verificación de equipamiento', '4', '0', '2025-02-24 13:21:53.687', '2025-02-24 13:21:53.687'),
('16', N'Gestión con JE', '4', '0', '2025-02-24 13:21:53.687', '2025-02-24 13:21:53.687'),
('17', N'Checklist', '4', '0', '2025-02-24 13:21:53.687', '2025-02-24 13:21:53.687'),
('18', N'Sindicato', '4', '0', '2025-02-24 13:21:53.687', '2025-02-24 13:21:53.687'),
('19', N'Visita de Mantenimiento Preventivo', '5', '0', '2025-02-24 13:21:53.760', '2025-02-24 13:21:53.760'),
('20', N'Visita por Proyecto', '5', '0', '2025-02-24 13:21:53.760', '2025-02-24 13:21:53.760'),
('21', N'Visita por Mantenimiento Correctivo', '5', '0', '2025-02-24 13:21:53.760', '2025-02-24 13:21:53.760'),
('22', N'Solicitar Barras a Taller', '6', '0', '2025-02-24 13:21:53.830', '2025-02-24 13:21:53.830'),
('23', N'Enviar Barras a Taller', '6', '0', '2025-02-24 13:21:53.830', '2025-02-24 13:21:53.830'),
('24', N'Visita de mantenimiento preventivo', '7', '0', '2025-02-24 13:21:53.920', '2025-02-24 13:21:53.920'),
('25', N'Visita por Proyecto', '7', '0', '2025-02-24 13:21:53.920', '2025-02-24 13:21:53.920'),
('26', N'Visita por Mantenimiento Correctivo', '7', '0', '2025-02-24 13:21:53.920', '2025-02-24 13:21:53.920'),
('27', N'Engrase de caño Lavador', '8', '0', '2025-02-24 13:21:53.970', '2025-02-24 13:21:53.970'),
('28', N'Engrase de IBOP', '8', '0', '2025-02-24 13:21:53.970', '2025-02-24 13:21:53.970'),
('29', N'Mantenimiento de bombas', '8', '0', '2025-02-24 13:21:53.970', '2025-02-24 13:21:53.970'),
('30', N'Mantenimiento de bombas', '8', '0', '2025-02-24 13:21:53.970', '2025-02-24 13:21:53.970'),
('31', N'Mantenimiento de Zarandas', '8', '0', '2025-02-24 13:21:53.970', '2025-02-24 13:21:53.970'),
('32', N'Test Frenado DW', '8', '0', '2025-02-24 13:21:53.970', '2025-02-24 13:21:53.970');
SET IDENTITY_INSERT [dbo].[planificacion_actividades] OFF
