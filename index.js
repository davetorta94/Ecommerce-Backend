const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./database/config');
const cors = require('cors');




const app = express();

dbConnection();

// CORS
app.use(cors())


//Directorio Publico
app.use( express.static( 'public' ) );

//Lectura y parseo del body
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));

// ruta de los eventos
app.use('/api/events', require('./routes/events'));

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
})