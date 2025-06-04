const express = require('express');
const router = express.Router();
const pool = require('../db');

// Rota para deletar um concurso
router.delete('/:concurso', async (req, res) => {
  try {
    const { concurso } = req.params;

    const result = await pool.query('DELETE FROM megasena WHERE concurso = $1 RETURNING *', [concurso]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Concurso não encontrado' });
    }

    res.status(200).json({ message: 'Concurso deletado com sucesso', data: result.rows[0] });
  } catch (error) {
    console.error('Erro ao deletar concurso:', error);
    res.status(500).json({ error: 'Erro ao deletar concurso' });
  }
});

module.exports = router;
