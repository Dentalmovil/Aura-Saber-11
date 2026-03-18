const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function registrar(pool, nombre, email, password) {
    const hash = await bcrypt.hash(password, 10);
    return pool.query('INSERT INTO usuarios (nombre, email, password_hash) VALUES ($1, $2, $3)', [nombre, email, hash]);
}
// Exportar si es necesario
module.exports = { registrar };
