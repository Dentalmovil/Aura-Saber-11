const fs = require('fs');

// Al estar todo en la raíz, la ruta es directa
const ARCHIVO_PATH = './preguntas.json';

try {
  const data = fs.readFileSync(ARCHIVO_PATH, 'utf-8');
  let preguntas = JSON.parse(data);

  // Algoritmo Fisher-Yates para desordenar
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Mezclamos las opciones de las 80 preguntas
  preguntas = preguntas.map(p => {
    if (p.opciones) {
      p.opciones = shuffle(p.opciones);
    }
    return p;
  });

  fs.writeFileSync(ARCHIVO_PATH, JSON.stringify(preguntas, null, 2));
  console.log('✅ ¡Listo! Las respuestas de Aura-Saber-11 ahora están desordenadas.');
} catch (error) {
  console.error('❌ Error al procesar el JSON:', error.message);
}
