require('dotenv').config();
const cors = require('cors');
const express = require('express');

const app = express();

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());


const PORT = process.env.PORT || 5002;
const LIBRE_URL = process.env.LIBRETRANSLATE_URL || 'http://localhost:5001';
const JWT_SECRET = process.env.JWT_SECRET || 'ssh_secreto';

// Rutas
require('./routes/auth.routes')(app);
require('./routes/categories.routes')(app);

//Seed
// require('./utils/seed-chuck')


app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});