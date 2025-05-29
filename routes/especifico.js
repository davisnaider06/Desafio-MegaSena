const pool = require('../src/db'); // exporta a conexão pool do db

// consulta específica
//URL: http://localhost:3001/numero do concurso desejado
async function get(req, res) {
  try {
    const { concurso } = req.params // É REQ.PARAMS E NÃO REQ.QUERY!!!!!
    const result = await pool.query('SELECT * FROM megasena WHERE concurso=$1',
        [concurso]
    );
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao listar');
  }
}

module.exports = get;
