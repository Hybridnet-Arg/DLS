BEGIN TRY

BEGIN TRAN;

  -- agregar diametros en los modelos de nov y tipo de pieza piston
  update modelo set idDiametro = 1 where idModelo = 108;

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca, idTipoPieza, idDiametro)
  VALUES(109, 'XM475WL', 2, 2, 2);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca, idTipoPieza, idDiametro)
  VALUES(110, 'XM500WL', 2, 2, 3);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca, idTipoPieza, idDiametro)
  VALUES(111, 'XM550WL', 2, 2, 4);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca, idTipoPieza, idDiametro)
  VALUES(112, 'XM600WL', 2, 2, 5);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca, idTipoPieza, idDiametro)
  VALUES(113, 'XM650WL', 2, 2, 6);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca, idTipoPieza, idDiametro)
  VALUES(114, '18583031-001', 2, 2, 2);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca, idTipoPieza, idDiametro)
  VALUES(115, '18582606-001', 2, 2, 3);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca, idTipoPieza, idDiametro)
  VALUES(116, '18580031-001', 2, 2, 4);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca, idTipoPieza, idDiametro)
  VALUES(117, '18584427-001', 2, 2, 5);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca, idTipoPieza, idDiametro)
  VALUES(118, '18583704-001', 2, 2, 6);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  UPDATE modelo set modelo = 'UB-44-3' WHERE idModelo = 82;
  UPDATE modelo set modelo = 'UB-46-3' WHERE idModelo = 83;
  UPDATE modelo set modelo = '100-51C46-00' WHERE idModelo = 48;
  UPDATE modelo set modelo = '100-51C44-00' WHERE idModelo = 49;
  UPDATE modelo set modelo = '510-66S00-00' WHERE idModelo = 5;
  UPDATE modelo set modelo = '510-62V00-HT' WHERE idModelo = 16;
  UPDATE modelo set modelo = '183-11S75-SS' WHERE idModelo = 91;


COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH