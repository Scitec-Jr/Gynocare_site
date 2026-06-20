INSERT INTO DoutorHorario (DoutorId, DiaSemana, HoraInicio, HoraFim)
VALUES
-- Dra. Mônica (ID 1)
(1, 1, '08:00:00', '12:00:00'), -- Segunda
(1, 2, '08:00:00', '12:00:00'), -- Terça manhã
(1, 2, '13:00:00', '18:00:00'), -- Terça tarde (após almoço)
(1, 5, '14:00:00', '17:30:00'), -- Sexta

-- Dra. Alexandra (ID 2)
(2, 5, '08:30:00', '12:00:00'), -- Sexta
(2, 6, '08:30:00', '12:00:00'), -- Sábado

-- Dr. Bruno (ID 3)
(3, 3, '16:00:00', '18:00:00'); -- Quarta