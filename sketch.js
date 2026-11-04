
let tabela;
let dadosAnuais = [];
let particulas = [];

let escala = 100000;

// Controlo da animação
let anoAtual = 0;
let indiceParticula = 0;
let velocidade = 20;

// Criar uma posição com distribuição orgânica
function criarPosicaoOrganica() {

  let x;
  let y;

  let zona = random();

  // Pequena quantidade de partículas dispersas
  if (zona < 0.08) {

    x = random(width);
    y = random(height);

  } else {

    let centro;

    // Escolher um dos focos de concentração
    if (zona < 0.38) {
      centro = { x: 0.43, y: 0.48, sx: 0.13, sy: 0.18 };

    } else if (zona < 0.63) {
      centro = { x: 0.57, y: 0.43, sx: 0.13, sy: 0.12 };

    } else if (zona < 0.85) {
      centro = { x: 0.55, y: 0.61, sx: 0.16, sy: 0.13 };

    } else {
      centro = { x: 0.35, y: 0.62, sx: 0.11, sy: 0.13 };
    }

    x = randomGaussian(
      centro.x * width,
      centro.sx * width
    );

    y = randomGaussian(
      centro.y * height,
      centro.sy * height
    );
  }

  return {
    x: constrain(x, 0, width),
    y: constrain(y, 0, height)
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

      let opacidade = map(ano, 1950, 2023, 30, 255);

      particulas.push({
        x: posicao.x,
        y: posicao.y,
        ano: ano,
        opacidade: opacidade
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
      circle(p.x, p.y, 2);

      indiceParticula++;

    } else {

      anoAtual++;
      indiceParticula = 0;
      break;
    }
  }
}
