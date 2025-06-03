const express = require('express');
const router = express.Router();
const pool = require('../src/db');

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM megasena ORDER BY concurso DESC LIMIT 1');
    res.json(result.rows);
  } catch (error) {
    console.error('Erro no /ultimo:', error);
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

module.exports = router;
