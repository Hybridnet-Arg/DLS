BEGIN TRY

BEGIN TRAN;

  -- Eliminar marcas que no pertenecen a tipo de pieza valvulas
  delete from marcasTipoPieza where idMarca IN (3,4,5,6,7) and idTipoPieza = 3;

  -- adicionar marcas a tipo de pieza valvulas
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(101, 15, 3);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF 

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(102, 17, 3);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(103, 16, 3);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  -- Modelos para marca NOV y tipo de pieza VALVULA
  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(11, '9700359', 2);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(12, '9700602WL', 2);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  -- Modelos para marca amg y tipo de pieza VALVULA
  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(13, 'EAGLE-6-V2HC', 1);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(14, '060155042-BE', 1);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  -- Modelos para marca SOUTHWEST y tipo de pieza VALVULA
  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(15, 'SWND-6VBHT', 14);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  -- Modelos para marca PREMIUM y tipo de pieza VALVULA
  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(16, 'Premium 6 valve', 15);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  -- Modelos para marca PETROMECANICA y tipo de pieza VALVULA
  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(17, 'PM-512', 17);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

   -- Modelos para marca FADAC y tipo de pieza VALVULA
  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(18, '8004', 16);
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