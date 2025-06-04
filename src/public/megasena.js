let concursoAtual = null;

async function load(concurso) {
  let url;
  
  if (concurso) {
    url = `/api/${concurso}`;
  } else {
    url = '/api';
  }

  console.log("Buscando:", url);

  try {
    const response = await fetch(url);
    
    if (!response.ok) {
  const text = await response.text();
  console.error('Erro HTTP:', response.status, text);
  throw new Error(`Erro HTTP: ${response.status}`);
}
    
    const result = await response.json();
    concursoAtual = Number(result.concurso);
    console.log("Dados recebidos", result);
    preencherHTML(result);
  } catch (error) {
    console.error("Erro na requisição:", error);
    alert("Falha ao receber dados. Por favor, tente novamente.");
  }
}

function formatReal(valor) {
  return Number(valor).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}


function preencherHTML(result) {
    let dataFormatada = new Date(result.data_do_sorteio).toLocaleDateString('pt-BR');
    document.getElementById('title-concurso').textContent = `Concurso ${result.concurso} (${dataFormatada})`;

    for (let i = 1; i <= 6; i++) {
        document.getElementById(`bola${i}`).textContent = result[`bola${i}`];
    }

    document.getElementById('local').textContent = `Sorteio realizado no ${result.cidade_uf}`;
    document.getElementById('estimativa-premio').textContent = formatReal(result.estimativa_premio);
    document.getElementById('acumulado-6-acertos').textContent = formatReal(result.acumulado_6_acertos);
    document.getElementById('acumulado-sorteio-especial-mega-da-virada').textContent = formatReal(result.acumulado_sorteio_especial_mega_da_virada);

    if (result.ganhadores_6_acertos === 0) {
        document.getElementById('ganhadores-6-acertos').textContent = "Não houve ganhadores";
    } else {
        document.getElementById('ganhadores-6-acertos').textContent = `${result.ganhadores_6_acertos} aposta(s) ganhadora(s), ${formatReal(result.rateio_6_acertos)}`;
    }

    document.getElementById('ganhadores-5-acertos').textContent = `${result.ganhadores_5_acertos} apostas ganhadoras, ${formatReal(result.rateio_5_acertos)}`;
    document.getElementById('ganhadores-4-acertos').textContent = `${result.ganhadores_4_acertos} apostas ganhadoras, ${formatReal(result.rateio_4_acertos)}`;

    document.getElementById('arrecadacao-total').textContent = formatReal(result.arrecadacao_total);

    if (result.ganhadores_6_acertos > 0) {
        document.getElementById('acumulou').style.display = 'none';
    } else {
        document.getElementById('acumulou').style.display = 'block';
    }

    document.getElementById('cidade-uf').textContent = result.cidade_uf;
}

// Event Listeners 
document.getElementById('search-input').addEventListener('keydown', function(event){
  if (event.key === 'Enter'){
    const valor = this.value.trim();
    if (valor){
      load(valor);
    }
  }
});

document.getElementById('prior').addEventListener('click', function(){
  if (concursoAtual){
    load(concursoAtual - 1);
  }
});

document.getElementById('next').addEventListener('click', function(){
  if (concursoAtual){
    load(concursoAtual + 1);
  }
});

// Carrega automaticamente o mais recente ao abrir
load();