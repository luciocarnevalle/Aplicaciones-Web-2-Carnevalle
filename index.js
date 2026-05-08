import express from 'express';
import dotenv from 'dotenv';
import fs, { readFile, writeFile } from 'fs/promises';
import productosRouter from './routes/productos.js';
import usuariosRouter from './routes/usuarios.js';

//configuro dotenv
dotenv.config();

//creo instancia de app
const app = express();
//configuro el puerto
const port = process.env.PORT || 3000; 

//Middleware para que el servidor entienda JSON
app.use(express.json()); 

app.use('/productos', productosRouter);
app.use('/usuarios', usuariosRouter);
// Levanto el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

//Pruebo para  ver si el servidor funciona
app.get('/', (req, res) => {
    res.send('Servidor de E-commerce funcionando correctamente');
});



