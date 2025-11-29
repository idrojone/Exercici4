require('dotenv').config();
const cors = require('cors');
const express = require('express');
const fs = require('fs');
const path = require('path');


const dbPath = path.resolve('../data.sqlite');
if (!fs.existsSync(dbPath)) {
    console.log('Inicializando base de datos...');
    require('../init-db');
}

const app = express();

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());


const PORT = process.env.PORT || 5002;


// Rutas
require('./routes/auth.routes')(app);
require('./routes/categories.routes')(app);





//Seed
// require('./utils/seed-chuck')


app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});