const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('API Mega-Sena funcionando!');
});

app.get('/favicon.ico', (req, res) => res.status(204).end());

// Importação correta das rotas
const ultimoRouter = require('../routes/ultimo');
const especificoRouter = require('../routes/especifico');

// Uso correto das rotas
app.use('/ultimo', ultimoRouter);
app.use('/especifico', especificoRouter);

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
    process.exit(1); // Encerra o processo com código de erro
});

// Verificação adicional para garantir que o servidor está rodando
server.on('listening', () => {
    console.log('✅ Servidor inicializado com sucesso!');
});
