BEGIN TRY

BEGIN TRAN;

  -- agregar diametros en los modelos de amg y tipo de pieza piston
  update modelo set idDiametro = 1 where idModelo = 63;
  update modelo set idDiametro = 3 where idModelo = 64;
  update modelo set idDiametro = 4 where idModelo = 65;
  update modelo set idDiametro = 5 where idModelo = 66;
  update modelo set idDiametro = 11 where idModelo = 67;
  update modelo set idDiametro = 6 where idModelo = 68;

  -- agregar diametros en los modelos de amg y tipo de pieza camisa
  update modelo set idDiametro = 2 where idModelo = 30;
  update modelo set idDiametro = 1 where idModelo = 31;
  update modelo set idDiametro = 3 where idModelo = 32;
  update modelo set idDiametro = 4 where idModelo = 33;
  update modelo set idDiametro = 5 where idModelo = 34;
  update modelo set idDiametro = 6 where idModelo = 35;
  update modelo set idDiametro = 11 where idModelo = 36;
  update modelo set idDiametro = 2 where idModelo = 37;
  update modelo set idDiametro = 1 where idModelo = 38;

  -- agregar diametros en los modelos de amg y tipo de pieza valvula
  update modelo set idDiametro = 9 where idModelo = 13;
  update modelo set idDiametro = 10 where idModelo = 14;

  -- agregar diametros en los modelos de nov y tipo de pieza camisa
  update modelo set idDiametro = 2 where idModelo = 19;
  update modelo set idDiametro = 1 where idModelo = 20;
  update modelo set idDiametro = 3 where idModelo = 21;
  update modelo set idDiametro = 4 where idModelo = 22;
  update modelo set idDiametro = 5 where idModelo = 23;
  update modelo set idDiametro = 6 where idModelo = 24;
  update modelo set idDiametro = 11 where idModelo = 25;
  update modelo set idDiametro = 4 where idModelo = 26;
  update modelo set idDiametro = 5 where idModelo = 27;
  update modelo set idDiametro = 6 where idModelo = 28;
  update modelo set idDiametro = 11 where idModelo = 29;

  -- agregar diametros en los modelos de nov y tipo de pieza asiento
  update modelo set idDiametro = 9 where idModelo = 1;
  update modelo set idDiametro = 10 where idModelo = 2;
  update modelo set idDiametro = 10 where idModelo = 3;

  -- agregar diametros en los modelos de nov y tipo de pieza piston
  update modelo set idDiametro = 1 where idModelo = 51;
  update modelo set idDiametro = 1 where idModelo = 52;
  update modelo set idDiametro = 3 where idModelo = 53;
  update modelo set idDiametro = 3 where idModelo = 54;
  update modelo set idDiametro = 4 where idModelo = 55;
  update modelo set idDiametro = 4 where idModelo = 56;
  update modelo set idDiametro = 5 where idModelo = 57;
  update modelo set idDiametro = 5 where idModelo = 58;
  update modelo set idDiametro = 11 where idModelo = 59;
  update modelo set idDiametro = 11 where idModelo = 60;
  update modelo set idDiametro = 6 where idModelo = 61;
  update modelo set idDiametro = 6 where idModelo = 62;

  -- agregar diametros en los modelos de nov y tipo de pieza valvula
  update modelo set idDiametro = 9 where idModelo = 11;
  update modelo set idDiametro = 9 where idModelo = 12;

  -- agregar diametros en los modelos de fadac y tipo de pieza valvula
  update modelo set idDiametro = 10 where idModelo = 18;

  -- agregar diametros en los modelos de fadac y tipo de pieza asiento
  update modelo set idDiametro = 10 where idModelo = 6;

  -- agregar diametros en los modelos de petromecanica y tipo de pieza valvula
  update modelo set idDiametro = 10 where idModelo = 17;

  -- agregar diametros en los modelos de premium y tipo de pieza asiento
  update modelo set idDiametro = 9 where idModelo = 5;

  -- agregar diametros en los modelos de premium y tipo de pieza camisa
  update modelo set idDiametro = 2 where idModelo = 48;
  update modelo set idDiametro = 1 where idModelo = 49;

  -- agregar diametros en los modelos de premium y tipo de pieza piston
  update modelo set idDiametro = 1 where idModelo = 82;
  update modelo set idDiametro = 2 where idModelo = 83;

  -- agregar diametros en los modelos de premium y tipo de pieza valvula
  update modelo set idDiametro = 9 where idModelo = 16;

  -- agregar diametros en los modelos de SOUTHWEST y tipo de pieza asiento
  update modelo set idDiametro = 9 where idModelo = 4;

  -- agregar diametros en los modelos de SOUTHWEST y tipo de pieza camisa
  update modelo set idDiametro = 2 where idModelo = 39;
  update modelo set idDiametro = 1 where idModelo = 40;
  update modelo set idDiametro = 3 where idModelo = 41;
  update modelo set idDiametro = 4 where idModelo = 42;
  update modelo set idDiametro = 5 where idModelo = 43;
  update modelo set idDiametro = 6 where idModelo = 44;
  update modelo set idDiametro = 11 where idModelo = 45;
  update modelo set idDiametro = 2 where idModelo = 46;
  update modelo set idDiametro = 1 where idModelo = 47;

  -- agregar diametros en los modelos de SOUTHWEST y tipo de pieza piston
  update modelo set idDiametro = 1 where idModelo = 69;
  update modelo set idDiametro = 1 where idModelo = 70;
  update modelo set idDiametro = 2 where idModelo = 71;
  update modelo set idDiametro = 2 where idModelo = 72;
  update modelo set idDiametro = 3 where idModelo = 73;
  update modelo set idDiametro = 3 where idModelo = 74;
  update modelo set idDiametro = 4 where idModelo = 75;
  update modelo set idDiametro = 4 where idModelo = 76;
  update modelo set idDiametro = 5 where idModelo = 77;
  update modelo set idDiametro = 5 where idModelo = 78;
  update modelo set idDiametro = 6 where idModelo = 79;
  update modelo set idDiametro = 6 where idModelo = 80;
  update modelo set idDiametro = 2 where idModelo = 81;

  -- agregar diametros en los modelos de tfi y tipo de pieza piston
  update modelo set idDiametro = 2 where idModelo = 84;

  -- agregar diametros en los modelos de tfi y tipo de pieza camisa
  update modelo set idDiametro = 2 where idModelo = 50;

  -- agregar diametros en los modelos de uretec y tipo de pieza piston
  update modelo set idDiametro = 2 where idModelo = 85;


COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH