let concursoAtual = null;

async function load(concurso) {
  let url;
  
  if (concurso) {
    url = `/api/especifico/${concurso}`;
  } else {
    url = '/api/ultimo';
  }

  console.log("Buscando:", url);

  try {
    const response = await fetch(url);
    
    if (!response.ok) {
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

// ... (mantenha as funções formatReal e preencherHTML exatamente como estão)

// Event Listeners (mantenha exatamente como estão)
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