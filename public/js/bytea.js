import { readFileSync, appendFileSync } from 'fs';

function imageToBase64(filePath) {
    return readFileSync(filePath, { encoding: 'base64' });
}

function base64ToBytes(base64) {
    return Buffer.from(base64, 'base64');
}

const imagePath = 'public/assets/images/course2.png';

const imageBase64 = imageToBase64(imagePath);

const imageBytes = base64ToBytes(imageBase64);

appendFileSync('public/js/result.txt', imageBase64 + '\n');