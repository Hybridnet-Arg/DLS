BEGIN TRY

BEGIN TRAN;

  -- Eliminar marcas que no pertenecen a tipo de pieza camisas
  delete from marcasTipoPieza where idMarca IN (3,4,5,6,7) and idTipoPieza = 1;

  -- Agregar marca TFI tipo de pieza camisa
  SET IDENTITY_INSERT [dbo].[marca] ON
  INSERT INTO marca
  (idMarca, marca)
  VALUES(18, 'TFI');
  SET IDENTITY_INSERT [dbo].[marca] OFF 

  -- adicionar marcas a tipo de pieza camisa
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(104, 15, 1);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF 

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(105, 18, 1);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  -- Modelos para marca NOV y tipo de pieza CAMISA
  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(19, '05466475-HP', 2);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(20, '05466450-HP', 2);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(21, '05466500-HP', 2);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(22, '05466550-HP', 2);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(23, '05466600-HP', 2);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(24, '05466650-HP', 2);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(25, '05466625-HP', 2);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(26, '05499550HP', 2);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(27, '05499600HP', 2);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(28, '05499650HP', 2);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(29, '05499625-HP', 2);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  -- Modelos para marca amg y tipo de pieza camisa
  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(30, '05466475', 1);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(31, '05466450', 1);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(32, '05466500', 1);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(33, '05466550', 1);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(34, '05466600', 1);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(35, '05466650', 1);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(36, '05466625', 1);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(37, '7466450', 1);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(38, '7466475', 1);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  -- Modelos para marca SOUTHWEST y tipo de pieza camisa
  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(39, '1376G09', 14);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(40, '1376G08', 14);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(41, '1376G1', 14);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(42, '1376G3', 14);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(43, '1376G5', 14);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(44, '1376G7', 14);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(45, '1376G6', 14);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(46, '1376ZIR09', 14);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(47, '1376ZIR08', 14);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  -- Modelos para marca PREMIUM y tipo de pieza camisa
  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(48, 'Premium 4 3/4', 15);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(49, 'Premium 4 1/2', 15);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  -- Modelos para marca TFI y tipo de pieza camisa
  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(50, 'TFI 4 3/4', 18);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  -- Diametros API7
  SET IDENTITY_INSERT [dbo].[diametro] ON
  INSERT INTO diametro
  (idDiametro, diametro)
  VALUES(11, '6.1/4"');
  SET IDENTITY_INSERT [dbo].[diametro] OFF

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH