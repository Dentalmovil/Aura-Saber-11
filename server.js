const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

// 1. Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// 2. Ruta principal para que Vercel cargue el index.html automáticamente
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 3. Ruta para obtener las preguntas del archivo JSON
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
  console.log(`🚀 Aura Saber 11 corriendo en el puerto ${PORT}`);
});
