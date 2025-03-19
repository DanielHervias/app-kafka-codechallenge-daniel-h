import http from 'k6/http';
import { check } from 'k6';
import { Trend } from 'k6/metrics';
import { randomIntBetween, uuidv4 } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

let myTrend = new Trend('custom_duration');

// Configuración de la prueba de carga
export let options = {
  stages: [
    { duration: '1m', target: 100 }, // 1000 usuarios en 1 minuto
    { duration: '1m', target: 200 }, // 10,000 usuarios en 5 minutos
    { duration: '1m', target: 0 }, // Desacelerar la carga
  ],
};

// Función para generar datos aleatorios
function generateRandomData() {
  return {
    accountExternalIdDebit: uuidv4(), // Cadena aleatoria de 10 caracteres
    accountExternalIdCredit: uuidv4(), // Número aleatorio entre 1 y 100
    transferTypeId: randomIntBetween(1, 3),
    value: randomIntBetween(100, 1500),
  };
}

export default function () {
  // Generar datos aleatorios para cada solicitud
  const randomData = generateRandomData();

  const res = http.post('http://localhost:3000/transactions', JSON.stringify(randomData), {
    headers: { 'Content-Type': 'application/json' },
  });

  check(res, {
    'is status 200': (r) => r.status === 200,
  });

  myTrend.add(res.timings.duration);  // Guarda el tiempo de respuesta personalizado
}
