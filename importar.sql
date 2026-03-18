TRUNCATE preguntas, opciones RESTART IDENTITY CASCADE;

INSERT INTO preguntas (enunciado, dificultad) VALUES 
('LECTURA CRÍTICA: ¿Cuál es el objetivo de un texto argumentativo?', 'media'),
('MATEMÁTICAS: En un triángulo rectángulo, si los catetos miden 3 y 4, ¿cuánto mide la hipotenusa?', 'media'),
('SOCIALES Y CIUDADANAS: ¿Qué mecanismo permite a los ciudadanos participar en la aprobación o rechazo de una ley?', 'media'),
('CIENCIAS NATURALES: ¿Cuál es la unidad estructural y funcional de todos los seres vivos?', 'media'),
('INGLÉS: Choose the correct word: "She ___ to the park every morning."', 'media');

INSERT INTO opciones (id_pregunta, texto_opcion, es_correcta) VALUES 
(1, 'Persuadir al lector', true), (1, 'Solo informar hechos', false),
(2, '5', true), (2, '7', false),
(3, 'Referendo', true), (3, 'Tutela', false),
(4, 'La célula', true), (4, 'El átomo', false),
(5, 'goes', true), (5, 'go', false);
