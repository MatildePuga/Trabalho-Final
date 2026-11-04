
let tabela;
let dadosAnuais = [];
let particulas = [];

let escala = 2600;

// Controlo da animação
let anoAtual = 0;
let indiceParticula = 0;
let velocidade = 200;


// Criar uma posição completamente aleatória
function criarPosicaoOrganica() {

  let x = random(width);
  let y = random(height);

  return {
    x: x,
    y: y
  };
}


async function setup() {

  createCanvas(windowWidth, windowHeight);
  background(255);

  // Carregar o CSV
  tabela = await loadTable("data/mortes.csv", ",", "header");

  // Organizar os dados por ano
  for (let i = 0; i < tabela.getRowCount(); i++) {

    let entidade = tabela.getString(i, "Entity");

    if (entidade === "World") {

      let ano = Number(tabela.getString(i, "Year"));
      let mortes = Number(tabela.getString(i, "Number of deaths"));

      if (ano >= 1950 && ano <= 2023) {

        dadosAnuais.push({
          ano: ano,
          mortes: mortes
        });
      }
    }
  }


  // Calcular as partículas de cada ano
  let totalMortes = 0;
  let totalParticulas = 0;

  for (let i = 0; i < dadosAnuais.length; i++) {

    totalMortes += dadosAnuais[i].mortes;

    let acumulado = Math.round(totalMortes / escala);
    let novasParticulas = acumulado - totalParticulas;

    dadosAnuais[i].particulas = novasParticulas;
    dadosAnuais[i].inicio = totalParticulas;

    totalParticulas = acumulado;
  }


  // Criar todas as partículas
  for (let i = 0; i < dadosAnuais.length; i++) {

    let ano = dadosAnuais[i].ano;

    for (let j = 0; j < dadosAnuais[i].particulas; j++) {

      let posicao = criarPosicaoOrganica();

      // Opacidade máxima
      let opacidade = 255;

      // Tamanho mínimo e igual para todas
      let tamanho = 2;

      particulas.push({
        x: posicao.x,
        y: posicao.y,
        ano: ano,
        opacidade: opacidade,
        tamanho: tamanho
      });
    }
  }

  console.log("Anos carregados:", dadosAnuais.length);
  console.log("Partículas criadas:", particulas.length);

  background(255);
}


// Construção progressiva
function draw() {

  if (anoAtual >= dadosAnuais.length) {
    return;
  }

  let dados = dadosAnuais[anoAtual];

  for (let i = 0; i < velocidade; i++) {

    if (indiceParticula < dados.particulas) {

      let indiceGlobal = dados.inicio + indiceParticula;
      let p = particulas[indiceGlobal];

      noStroke();
      fill(0, p.opacidade);
      circle(p.x, p.y, p.tamanho);

      indiceParticula++;

    } else {

      anoAtual++;
      indiceParticula = 0;
      break;
    }
  }
}
