const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();

// Configuração do CORS
app.use(cors());

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rotas
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Importação correta das rotas
const especificoRouter = require('./routes/mega');

app.use('/api', especificoRouter)

// Rota de fallback
app.get('*', (req, res) => {
  res.status(404).send('Página não encontrada');
});

// Porta
const PORT = process.env.PORT || 10000; // Use a porta 10000 como nos logs

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});