const express = require('express');
const router = express.Router();
const pool = require('../db');

// Rota para inserir novo concurso
router.post('/', async (req, res) => {
  try {
    const {
      concurso,
      data_do_sorteio,
      bola1,
      bola2,
      bola3,
      bola4,
      bola5,
      bola6,
      ganhadores_6_acertos,
      rateio_6_acertos,
      ganhadores_5_acertos,
      rateio_5_acertos,
      ganhadores_4_acertos,
      rateio_4_acertos,
      acumulado_6_acertos,
      arrecadacao_total,
      estimativa_premio,
      acumulado_sorteio_especial_mega_da_virada,
      cidade_uf
    } = req.body;

    const query = `
      INSERT INTO megasena (
        concurso, data_do_sorteio, bola1, bola2, bola3, bola4, bola5, bola6,
        ganhadores_6_acertos, rateio_6_acertos, ganhadores_5_acertos, rateio_5_acertos,
        ganhadores_4_acertos, rateio_4_acertos, acumulado_6_acertos, arrecadacao_total,
        estimativa_premio, acumulado_sorteio_especial_mega_da_virada, cidade_uf
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8,
        $9, $10, $11, $12,
        $13, $14, $15, $16,
        $17, $18, $19
      ) RETURNING *;
    `;

    const values = [
      concurso,
      data_do_sorteio,
      bola1,
      bola2,
      bola3,
      bola4,
      bola5,
      bola6,
      ganhadores_6_acertos,
      rateio_6_acertos,
      ganhadores_5_acertos,
      rateio_5_acertos,
      ganhadores_4_acertos,
      rateio_4_acertos,
      acumulado_6_acertos,
      arrecadacao_total,
      estimativa_premio,
      acumulado_sorteio_especial_mega_da_virada,
      cidade_uf
    ];

    const result = await pool.query(query, values);

    res.status(201).json({ message: 'Concurso inserido com sucesso', data: result.rows[0] });
  } catch (error) {
    console.error('Erro ao inserir concurso:', error);
    res.status(500).json({ error: 'Erro ao inserir concurso' });
  }
});

module.exports = router;
