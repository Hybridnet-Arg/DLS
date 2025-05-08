
BEGIN TRY

BEGIN TRAN;

-- asociar tipos de piezas con modelos de la marca amg
update modelo set idTipoPieza = 2 where idModelo IN (63,64,65,66,67,68);
update modelo set idTipoPieza = 1 where idModelo IN (30,31,32,33,34,35,36,37,38);
update modelo set idTipoPieza = 3 where idModelo IN (13,14);
update modelo set idTipoPieza = 4 where idModelo IN (8);
update modelo set idTipoPieza = 13 where idModelo IN (89);
update modelo set idTipoPieza = 7 where idModelo IN (102,103,104,105,106);

-- asociar tipos de piezas con modelos de la marca nov
update modelo set idTipoPieza = 2 where idModelo IN (51,52,53,54,55,56,57,58,59,60,61,62,108);
update modelo set idTipoPieza = 1 where idModelo IN (19,20,21,22,23,24,25,26,27,28,29);
update modelo set idTipoPieza = 5 where idModelo IN (1,2,3);
update modelo set idTipoPieza = 3 where idModelo IN (11,12);
update modelo set idTipoPieza = 4 where idModelo IN (9);
update modelo set idTipoPieza = 13 where idModelo IN (87,88);
update modelo set idTipoPieza = 7 where idModelo IN (107);

-- asociar tipos de piezas con modelos de la marca SOUTHWEST
update modelo set idTipoPieza = 2 where idModelo IN (69,70,71,72,73,74,75,76,77,78,79,80,81);
update modelo set idTipoPieza = 1 where idModelo IN (39,40,41,42,43,44,45,46,47);
update modelo set idTipoPieza = 5 where idModelo IN (4);
update modelo set idTipoPieza = 3 where idModelo IN (15);
update modelo set idTipoPieza = 4 where idModelo IN (10);
update modelo set idTipoPieza = 13 where idModelo IN (86);
update modelo set idTipoPieza = 7 where idModelo IN (92,93,94,95,96,97,98,99,100,101);

-- asociar tipos de piezas con modelos de la marca premium
update modelo set idTipoPieza = 2 where idModelo IN (82,83);
update modelo set idTipoPieza = 1 where idModelo IN (48,49);
update modelo set idTipoPieza = 5 where idModelo IN (5);
update modelo set idTipoPieza = 3 where idModelo IN (16);
update modelo set idTipoPieza = 3 where idModelo IN (16);
update modelo set idTipoPieza = 13 where idModelo IN (91);

-- asociar tipos de piezas con modelos de la marca fadac
update modelo set idTipoPieza = 5 where idModelo IN (6);
update modelo set idTipoPieza = 3 where idModelo IN (18);

-- asociar tipos de piezas con modelos de la marca leone
update modelo set idTipoPieza = 13 where idModelo IN (90);

-- asociar tipos de piezas con modelos de la marca petromecanica
update modelo set idTipoPieza = 3 where idModelo IN (17,7);
update modelo set idTipoPieza = 4 where idModelo IN (7);

-- asociar tipos de piezas con modelos de la marca tfi
update modelo set idTipoPieza = 2 where idModelo IN (84);
update modelo set idTipoPieza = 1 where idModelo IN (50);

-- asociar tipos de piezas con modelos de la marca uretec
update modelo set idTipoPieza = 2 where idModelo IN (85);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH