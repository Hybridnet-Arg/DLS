BEGIN TRY

BEGIN TRAN;

  -- marcas para tipo de pieza asiento
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(1, 2, 5);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF 

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(2, 14, 5);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(3, 15, 5);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(4, 16, 5);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  -- marcas para tipo de pieza resorte
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(5, 17, 4);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF 

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(6, 1, 4);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF 

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(7, 2, 4);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF 

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(8, 14, 4);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  -- marcas para tipo de pieza camisa
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(9, 1, 1);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(10, 2, 1);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF 

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(11, 3, 1);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(12, 4, 1);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(13, 5, 1);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(14, 6, 1);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(15, 7, 1);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(16, 14, 1);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  -- marcas para tipo de pieza piston
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(17, 1, 2);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(18, 2, 2);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(19, 3, 2);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(20, 4, 2);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(21, 5, 2);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(22, 6, 2);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(23, 7, 2);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(24, 14, 2);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  -- marcas para tipo de pieza valvula
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(25, 1, 3);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(26, 2, 3);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(27, 3, 3);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(28, 4, 3);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(29, 5, 3);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(31, 6, 3);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(32, 7, 3);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(33, 14, 3);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  -- marcas para tipo de pieza inserto
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(34, 1, 6);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(35, 2, 6);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(36, 3, 6);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(37, 4, 6);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(38, 5, 6);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(39, 6, 6);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(40, 7, 6);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(41, 14, 6);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  -- marcas para tipo de pieza empaquetadura
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(42, 1, 7);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(43, 2, 7);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(44, 3, 7);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(46, 4, 7);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(47, 5, 7);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(48, 6, 7);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(49, 7, 7);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(50, 14, 7);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

   -- marcas para tipo de pieza cuerpo piston
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(51, 1, 8);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(52, 2, 8);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(53, 3, 8);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(54, 4, 8);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(55, 5, 8);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(56, 6, 8);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(57, 7, 8);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(58, 14, 8);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  -- marcas para tipo de pieza goma piston negra
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(59, 1, 9);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(60, 2, 9);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(61, 3, 9);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(62, 4, 9);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(63, 5, 9);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(64, 6, 9);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(65, 7, 9);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(68, 14, 9);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  -- marcas para tipo de pieza goma piston roja
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(69, 1, 10);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(70, 2, 10);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(71, 3, 10);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(72, 4, 10);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(73, 5, 10);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(74, 6, 10);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(75, 7, 10);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(76, 14, 10);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  -- marcas para tipo de pieza goma piston blanca
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(77, 1, 11);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(78, 2, 11);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(79, 3, 11);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(80, 4, 11);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(81, 5, 11);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(82, 6, 11);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(83, 7, 11);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(84, 14, 11);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  -- marcas para tipo de pieza oring manifold
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(85, 1, 12);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(86, 2, 12);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(87, 3, 12);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(88, 4, 12);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(89, 5, 12);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(90, 6, 12);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(91, 7, 12);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(92, 14, 12);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  -- marcas para tipo de pieza plato desgaste
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(93, 1, 13);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(94, 2, 13);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(95, 3, 13);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(96, 4, 13);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(97, 5, 13);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(98, 6, 13);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(99, 7, 13);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] ON
  INSERT INTO marcasTipoPieza
  (id, idMarca, idTipoPieza)
  VALUES(100, 14, 13);
  SET IDENTITY_INSERT [dbo].[marcasTipoPieza] OFF

  COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH