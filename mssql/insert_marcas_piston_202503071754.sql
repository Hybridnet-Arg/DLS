BEGIN TRY

BEGIN TRAN;

  -- Eliminar marcas que no pertenecen a tipo de pieza piston
  delete from marcasTipoPieza where idMarca IN (3,4,5,6,7) and idTipoPieza = 2;

  -- Agregar marca URETEC tipo de pieza piston
  SET IDENTITY_INSERT [dbo].[marca] ON
  INSERT INTO marca
  (idMarca, marca)
  VALUES(19, 'URETEC');
  SET IDENTITY_INSERT [dbo].[marca] OFF 

  -- adicionar marcas a tipo de pieza piston
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(106, 19, 2);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF 

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(107, 18, 2);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(108, 15, 2);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  -- Modelos para marca NOV y tipo de pieza piston
  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(51, '12180197', 2);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(52, '1502054XT', 2);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(53, '12180254', 2);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(54, '1502056XT', 2);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(55, '12180338', 2);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(56, '1502058XT', 2);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(57, '12180395', 2);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(58, '1502060XT', 2);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(59, '12180494', 2);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(60, '1502061XT', 2);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(61, '12180536', 2);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(62, '1502062XT', 2);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  -- Modelos para marca amg y tipo de pieza piston
  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(63, 'EAGLE45', 1);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(64, 'EAGLE50', 1);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(65, 'EAGLE55', 1);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(66, 'EAGLE60', 1);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(67, 'EAGLE62', 1);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(68, 'EAGLE65', 1);
  SET IDENTITY_INSERT [dbo].[modelo] OFF


  -- Modelos para marca SOUTHWEST y tipo de pieza piston
  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(69, '78BDB', 14);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(70, '78BDP', 14);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(71, '79BDB', 14);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(72, '79BDP', 14);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(73, '81BDB', 14);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(74, '81BDP', 14);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(75, '83BDB', 14);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(76, '83BDP', 14);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(77, '85BDB', 14);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(78, '85BDP', 14);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(79, '87BDB', 14);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(80, '87BDP', 14);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(81, '79BSD', 14);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  -- Modelos para marca PREMIUM y tipo de pieza piston
  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(82, '4.1/2" PREMIUN', 15);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(83, '4.3/4" PREMIUN', 15);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  -- Modelos para marca TFI y tipo de pieza piston
  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(84, '4.3/4" TFI', 18);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  -- Modelos para marca URETEC y tipo de pieza piston
  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(85, 'P-1700-DD-47', 19);
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