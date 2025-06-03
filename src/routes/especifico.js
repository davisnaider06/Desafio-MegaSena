const express = require('express');
const router = express.Router();
const pool = require('../db');

// Rota correta com parâmetro
router.get('/:concurso', async (req, res) => {
  try {
    const { concurso } = req.params;

    const result = await pool.query(
      'SELECT * FROM megasena WHERE concurso = $1',
      [parseInt(concurso)]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Concurso não encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro no /especifico:', error);
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

module.exports = router;
