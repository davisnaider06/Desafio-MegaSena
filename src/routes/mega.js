const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM megasena ORDER BY data_do_sorteio DESC LIMIT 1');
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Nenhum sorteio encontrado' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

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

router.put('/:concurso', async (req, res) => {
  try {
    const {
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
      UPDATE megasena SET 
        data_do_sorteio = $1, bola1 = $2, bola2 = $3, bola3 = $4, bola4 = $5, bola5 = $6, bola6 = $7,
        ganhadores_6_acertos = $8, rateio_6_acertos = $9, ganhadores_5_acertos = $10, rateio_5_acertos = $11,
        ganhadores_4_acertos = $12, rateio_4_acertos = $13, acumulado_6_acertos = $14, arrecadacao_total = $15,
        estimativa_premio = $16, acumulado_sorteio_especial_mega_da_virada = $17, cidade_uf = $18,
        RETURNING *;
    `;

    const values = [
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
