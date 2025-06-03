const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();

// Configuração mais segura do CORS
app.use(cors({
  origin: '*',
  methods: ['GET']
}));

app.use(express.json());

// Serve arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rota principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'megasena.html'));
});

// Rotas API
const ultimoRouter = require('./routes/ultimo');
const especificoRouter = require('./routes/especifico');
app.use('/api/ultimo', ultimoRouter);
app.use('/api/especifico', especificoRouter);

// Rota de fallback para SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'megasena.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});