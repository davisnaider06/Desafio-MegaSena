const { Pool }= require('pg'); //Importa a função Pool da biblioteca pg
const dotenv = require('dotenv') // carrega as variaveis do .env


const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

module.exports = pool;