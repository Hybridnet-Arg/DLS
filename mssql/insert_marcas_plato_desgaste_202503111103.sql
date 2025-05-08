BEGIN TRY

BEGIN TRAN;

  -- Eliminar marcas que no pertenecen a tipo de pieza plato desgaste
  delete from marcasTipoPieza where idMarca IN (3,4,5,6,7) and idTipoPieza = 13;

  -- Agregar marca LEONE tipo de pieza plato desgaste
  SET IDENTITY_INSERT [dbo].[marca] ON
  INSERT INTO marca
  (idMarca, marca)
  VALUES(20, 'LEONE');
  SET IDENTITY_INSERT [dbo].[marca] OFF 

  -- adicionar marcas a tipo de pieza plato desgaste
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(109, 20, 13);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF 

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(110, 15, 13);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  -- Modelos para marca SOUTHWEST y tipo de pieza plato desgaste
  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(86, '8490-28', 14);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  -- Modelos para marca NOV y tipo de pieza plato desgaste
  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(87, '80501043', 2);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(88, '0-6316-0365-00', 2);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  -- Modelos para marca amg y tipo de pieza piston
  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(89, ' PPSW 8490-28', 1);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  -- Modelos para marca leone y tipo de pieza plato desgaste
  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(90, 'SW Plato', 20);
  SET IDENTITY_INSERT [dbo].[modelo] OFF


  -- Modelos para marca premium y tipo de pieza plato desgaste
  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(91, 'Premium plato', 15);
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