BEGIN TRY

BEGIN TRAN;

  -- Marcas para tipo de pieza asiento
  SET IDENTITY_INSERT [dbo].[marca] ON
  INSERT INTO marca
  (idMarca, marca)
  VALUES(14, 'SOUTHWEST');
  SET IDENTITY_INSERT [dbo].[marca] OFF 

  SET IDENTITY_INSERT [dbo].[marca] ON
  INSERT INTO marca
  (idMarca, marca)
  VALUES(15, 'PREMIUM');
  SET IDENTITY_INSERT [dbo].[marca] OFF 

  SET IDENTITY_INSERT [dbo].[marca] ON
  INSERT INTO marca
  (idMarca, marca)
  VALUES(16, 'FADAC');
  SET IDENTITY_INSERT [dbo].[marca] OFF 

  -- Marcas para tipo de pieza resorte
  SET IDENTITY_INSERT [dbo].[marca] ON
  INSERT INTO marca
  (idMarca, marca)
  VALUES(17, 'PETROMECANICA');
  SET IDENTITY_INSERT [dbo].[marca] OFF


  -- Modelos para marca NOV
  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(1, '9702555NS', 2);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(2, '61101507', 2);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(3, '9702504', 2);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

   -- Modelos para marca SOUTHWEST
  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(4, 'SWND-6S4', 14);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  -- Modelos para marca PREMIUM
  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(5, 'Premium 6 asiento', 15);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  -- Modelos para marca FADAC
  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(6, '8204', 16);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  -- Modelos para marca PETROMECANICA
  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(7, 'PM-109', 17);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  -- Modelos para marca AMG
  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(8, '55213417', 1);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  -- Modelos para marca NOV
  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(9, '8201684', 2);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  -- Modelos para marca SOUTHWEST
  SET IDENTITY_INSERT [dbo].[modelo] ON
  INSERT INTO modelo
  (idModelo, modelo, idMarca)
  VALUES(10, 'SW5710-115', 14);
  SET IDENTITY_INSERT [dbo].[modelo] OFF

  -- Diametros API6
  SET IDENTITY_INSERT [dbo].[diametro] ON
  INSERT INTO diametro
  (idDiametro, diametro)
  VALUES(9, 'API6');
  SET IDENTITY_INSERT [dbo].[diametro] OFF

  -- Diametros API7
  SET IDENTITY_INSERT [dbo].[diametro] ON
  INSERT INTO diametro
  (idDiametro, diametro)
  VALUES(10, 'API7');
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