import { readFileSync, appendFileSync } from 'fs';

// Función para convertir imagen a base64
function imageToBase64(filePath) {
    return readFileSync(filePath, { encoding: 'base64' });
}

// Función para convertir base64 a bytes
function base64ToBytes(base64) {
    return Buffer.from(base64, 'base64');
}

// Ruta del archivo de imagen
const imagePath = 'public/assets/images/course2.png';

// Convertir imagen a base64
const imageBase64 = imageToBase64(imagePath);

// Convertir base64 a bytes (BYTEA)
const imageBytes = base64ToBytes(imageBase64);

// Escribir en result.txt en lugar de imprimir en la consola
appendFileSync('public/js/result.txt', imageBase64 + '\n');