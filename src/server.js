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
const ultimoRouter = require('./routes/ultimo');
const especificoRouter = require('./routes/especifico');
const adicionarRouter = require('./routes/adicionar');
const deletarRouter = require('./routes/deletar')

// Configuração correta das rotas
// app.use('/api/ultimo', ultimoRouter);
// app.use('/api/especifico', especificoRouter);
// app.use('/api/adicionar', adicionarRouter);
// app.use('/api', deletarRouter);

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