-- Marcas
INSERT INTO marcas (nombre)
VALUES 
('M&M');

-- Tipos de Elemento
UPDATE [dbo].[tipos_elemento]
SET horas_desde = 0, horas_hasta = 400
WHERE id = 3; -- "Tubo"

UPDATE [dbo].[tipos_elemento]
SET horas_desde = 0, horas_hasta = 1800
WHERE id IN (1, 2); -- "Válvula" y "Conector"
