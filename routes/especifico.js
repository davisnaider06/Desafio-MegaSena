const express = require('express');
const router = express.Router();
const pool = require('../src/db');

router.get('/:concurso', async (req, res) => {
  const { concurso } = req.params;

  if (!/^\d+$/.test(concurso)) {
    return res.status(400).send('Concurso inválido!');
  }

  try {
    const result = await pool.query(
      'SELECT * FROM megasena WHERE concurso = $1',
      [parseInt(concurso)]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao buscar concurso');
  }
});

module.exports = router;
