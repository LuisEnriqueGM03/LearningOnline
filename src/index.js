import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { categoriaRouter } from './routes/categoria.routes.js';
import { cursoRouter } from './routes/curso.routes.js';
import { userRouter } from "./routes/usuario.routes.js";
import { LeccionRouter } from "./routes/leccion.routes.js";
import { incripcionRouter } from './routes/incripcion.routes.js';
import { progresionRouter} from "./routes/progresion.routes.js";


const app = express();

app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());
const PORT = process.env.PORT ?? 4000;

app.get('/', (req, res) => {
    res.json({ "mensaje": 'Hola mundo' });
});

// Rutas
app.use('/categoria', categoriaRouter);
app.use('/curso', cursoRouter);
app.use('/usuario', userRouter);
app.use('/leccion', LeccionRouter);
app.use('/inscripcion', incripcionRouter);
app.use('/progresion', progresionRouter);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`);
});