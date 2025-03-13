DELETE FROM [dbo].[marcas]
WHERE id=3;

UPDATE [dbo].[marcas]
SET nombre='M&M'
WHERE id=2;

SET IDENTITY_INSERT [dbo].[modelos] ON
INSERT INTO [dbo].[modelos]
(id, nombre, marca_id, creado_el, actualizado_el)
VALUES(3, '3-00-66ARRUT15 (H2S TRIM - NACE MR0175)  15M WP', 2, '2024-11-14 11:11:00.820', '2024-11-14 11:11:00.820');
SET IDENTITY_INSERT [dbo].[modelos] OFF 

SET IDENTITY_INSERT [dbo].[modelos] ON
INSERT INTO [dbo].[modelos]
(id, nombre, marca_id, creado_el, actualizado_el)
VALUES(4, '3-00-103-0TV (H2S TRIM - NACE MR0175) 15M WP', 2, '2024-11-14 11:11:00.820', '2024-11-14 11:11:00.820');
SET IDENTITY_INSERT [dbo].[modelos] OFF 

SET IDENTITY_INSERT [dbo].[modelos] ON
INSERT INTO [dbo].[modelos]
(id, nombre, marca_id, creado_el, actualizado_el)
VALUES(5, 'AX3-06-RACR645TV (H2S TRIM - NACE MR0175) 15M WP', 2, '2024-11-14 11:11:00.820', '2024-11-14 11:11:00.820');
SET IDENTITY_INSERT [dbo].[modelos] OFF 