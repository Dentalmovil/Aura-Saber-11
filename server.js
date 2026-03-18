const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.static('public'));

// Ruta para obtener las preguntas del archivo JSON
app.get('/api/preguntas', (req, res) => {
    const rutaJson = path.join(__dirname, 'preguntas.json');
    
    fs.readFile(rutaJson, 'utf8', (err, data) => {
        if (err) {
            console.error("Error al leer preguntas.json:", err);
            return res.status(500).json({ error: "No se encontró el archivo de preguntas" });
        }
        try {
            const preguntas = JSON.parse(data);
            res.json(preguntas);
        } catch (parseErr) {
            res.status(500).json({ error: "Error en el formato del JSON" });
        }
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Aura Saber 11 corriendo en http://localhost:${PORT}`);
});
