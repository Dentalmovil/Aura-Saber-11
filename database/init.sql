CREATE TABLE areas (id_area SERIAL PRIMARY KEY, nombre VARCHAR(100));
CREATE TABLE temas (id_tema SERIAL PRIMARY KEY, id_area INT REFERENCES areas(id_area), nombre VARCHAR(100));
CREATE TABLE preguntas (id_pregunta SERIAL PRIMARY KEY, id_tema INT REFERENCES temas(id_tema), enunciado TEXT, contexto TEXT);
CREATE TABLE opciones (id_opcion SERIAL PRIMARY KEY, id_pregunta INT REFERENCES preguntas(id_pregunta), texto_opcion TEXT, es_correcta BOOLEAN);
