BEGIN TRY

BEGIN TRAN;

  SET IDENTITY_INSERT [dbo].[tiposPieza] ON
  INSERT INTO tiposPieza
  (idTipoPieza, nombre)
  VALUES(1, 'CAMISA');
  SET IDENTITY_INSERT [dbo].[tiposPieza] OFF 

  SET IDENTITY_INSERT [dbo].[tiposPieza] ON
  INSERT INTO tiposPieza
  (idTipoPieza, nombre)
  VALUES(2, 'PISTON');
  SET IDENTITY_INSERT [dbo].[tiposPieza] OFF 

  SET IDENTITY_INSERT [dbo].[tiposPieza] ON
  INSERT INTO tiposPieza
  (idTipoPieza, nombre)
  VALUES(3, 'VALVULA');
  SET IDENTITY_INSERT [dbo].[tiposPieza] OFF 

  SET IDENTITY_INSERT [dbo].[tiposPieza] ON
  INSERT INTO tiposPieza
  (idTipoPieza, nombre)
  VALUES(4, 'RESORTE');
  SET IDENTITY_INSERT [dbo].[tiposPieza] OFF

  SET IDENTITY_INSERT [dbo].[tiposPieza] ON
  INSERT INTO tiposPieza
  (idTipoPieza, nombre)
  VALUES(5, 'ASIENTO');
  SET IDENTITY_INSERT [dbo].[tiposPieza] OFF

  SET IDENTITY_INSERT [dbo].[tiposPieza] ON
  INSERT INTO tiposPieza
  (idTipoPieza, nombre)
  VALUES(6, 'INSERTO');
  SET IDENTITY_INSERT [dbo].[tiposPieza] OFF 

  SET IDENTITY_INSERT [dbo].[tiposPieza] ON
  INSERT INTO tiposPieza
  (idTipoPieza, nombre)
  VALUES(7, 'EMPAQUETADURA');
  SET IDENTITY_INSERT [dbo].[tiposPieza] OFF

  SET IDENTITY_INSERT [dbo].[tiposPieza] ON
  INSERT INTO tiposPieza
  (idTipoPieza, nombre)
  VALUES(8, 'CUERPO PISTON');
  SET IDENTITY_INSERT [dbo].[tiposPieza] OFF

  SET IDENTITY_INSERT [dbo].[tiposPieza] ON
  INSERT INTO tiposPieza
  (idTipoPieza, nombre)
  VALUES(9, 'GOMA PISTON NEGRA');
  SET IDENTITY_INSERT [dbo].[tiposPieza] OFF

  SET IDENTITY_INSERT [dbo].[tiposPieza] ON
  INSERT INTO tiposPieza
  (idTipoPieza, nombre)
  VALUES(10, 'GOMA PISTON ROJA');
  SET IDENTITY_INSERT [dbo].[tiposPieza] OFF

  SET IDENTITY_INSERT [dbo].[tiposPieza] ON
  INSERT INTO tiposPieza
  (idTipoPieza, nombre)
  VALUES(11, 'GOMA PISTON BLANCA');
  SET IDENTITY_INSERT [dbo].[tiposPieza] OFF

  SET IDENTITY_INSERT [dbo].[tiposPieza] ON
  INSERT INTO tiposPieza
  (idTipoPieza, nombre)
  VALUES(12, 'O''RING MANIFOLD');
  SET IDENTITY_INSERT [dbo].[tiposPieza] OFF

  SET IDENTITY_INSERT [dbo].[tiposPieza] ON
  INSERT INTO tiposPieza
  (idTipoPieza, nombre)
  VALUES(13, 'PLATO DESGASTE');
  SET IDENTITY_INSERT [dbo].[tiposPieza] OFF

  COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH