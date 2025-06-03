const express = require('express');
const router = express.Router(); //permite agrupar rotas relacionadas
const pool = require('../db'); // exporta a conexão pool do db

// consulta o mais recente
//URL: http://localhost:3001/
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM megasena ORDER BY data_do_sorteio DESC LIMIT 1');

      res.json(result.rows[0]);

  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao listar');
  }
});

module.exports = router;
