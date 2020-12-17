const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./src/database/config');
const cors = require('cors')

// Crear el servidor de express
const app = express();

// Base de datos
dbConnection();

app.use(cors());

// Directorio público
app.use(express.static('public'));

// Lectura y parseo del body
app.use(express.json());

// Rutas
// TODO auth: crear, login, renew
app.use('/api/plan', require('./src/routes/PlanAnualRoute'));
app.use('/api/user', require('./src/routes/UserRoute'));
// TODO CRUD: Eventos

// Escuchar peticiones
app.listen(process.env.PORT, () => {
   console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
});