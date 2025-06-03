const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config(); // carrega as variáveis do .env (não é obrigatório no Render, mas fds)

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = pool;
