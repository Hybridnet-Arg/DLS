BEGIN TRY

BEGIN TRAN;

  -- Eliminar marcas que no pertenecen a tipo de pieza empaquetadura
  delete from marcasTipoPieza where idMarca IN (3,4,5,6,7) and idTipoPieza = 7;

  -- Modelos para marca SOUTHWEST y tipo de pieza empaquetadura
  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(92, '2930-1U', 14);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(93, '2930-3U', 14);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(94, '2930-5U', 14);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(95, '2930-7U', 14);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(96, 'AJO390', 14);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(97, 'AJO428SU', 14);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(98, '2988U', 14);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(99, 'AJO495U', 14);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(100, 'AJ1256', 14);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(101, 'P115U', 14);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

   -- Modelos para marca amg y tipo de pieza empaquetadura
  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(102, '07211011', 1);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(103, '07211012', 1);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(104, '07211035 ', 1);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(105, '07211005 ', 1);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(106, '07211004  ', 1);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  -- Modelos para marca NOV y tipo de pieza empaquetadura
  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(107, '07211003', 2);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH