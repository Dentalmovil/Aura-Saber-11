const fs = require('fs');
const { Client } = require('pg');

const client = new Client({
    connectionString: 'postgres://u0_a839@localhost:5432/icfes_db'
});

async function seed() {
    try {
        await client.connect();
        console.log("Conectado a la base de datos...");

        await client.query('TRUNCATE preguntas, opciones RESTART IDENTITY CASCADE');

        const data = JSON.parse(fs.readFileSync('./database/preguntas.json', 'utf8'));

        for (const p of data) {
            if (!p.enunciado) continue;
            console.log(`Insertando: ${p.enunciado}`);
            const res = await client.query(
                'INSERT INTO preguntas (enunciado, dificultad) VALUES ($1, $2) RETURNING id_pregunta',
                [p.enunciado, 'media']
            );
            const id = res.rows[0].id_pregunta;
            for (const o of p.opciones) {
                await client.query(
                    'INSERT INTO opciones (id_pregunta, texto_opcion, es_correcta) VALUES ($1, $2, $3)',
                    [id, o.texto, o.correcta]
                );
            }
        }
        console.log('✅ ¡Sincronización completada con éxito!');
    } catch (e) {
        console.error('❌ Error:', e.message);
    } finally {
        await client.end();
    }
}
seed();
