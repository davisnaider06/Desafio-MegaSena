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

// Rota para carregar o index.html diretamente na raiz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'megasena.html'));
});

// Importa rotas
const ultimoRouter = require('../routes/ultimo');
const especificoRouter = require('../routes/especifico');

// Configura rotas da API
app.use('../routes/ultimo', ultimoRouter);
app.use('../routes/especifico', especificoRouter);

// Favicon para evitar erro
app.get('/favicon.ico', (req, res) => res.status(204).end());

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});

// Tratamento de erros na inicialização do servidor
server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`❌ Erro: A porta ${PORT} já está em uso!`);
    } else {
        console.error('❌ Erro ao iniciar o servidor:', error.message);
    }
    process.exit(1);
});

// Verificação adicional
server.on('listening', () => {
    console.log('✅ Servidor inicializado com sucesso!');
});
