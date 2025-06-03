const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();
app.use(cors());
app.use(express.json());

// Serve arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rota principal - serve apenas o HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'megasena.html'));
});

// Importa e configura rotas da API CORRETAMENTE
const ultimoRouter = require('./routes/ultimo');
const especificoRouter = require('./routes/especifico');
app.use('/api/ultimo', ultimoRouter);  // Note o caminho correto
app.use('/api/especifico', especificoRouter);

// Favicon
app.get('/favicon.ico', (req, res) => res.status(204).end());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});