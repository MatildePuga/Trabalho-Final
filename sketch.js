
let tabela;
let dadosAnuais = [];
let particulas = [];

let escala = 5000;

let anoAtual = 0;
let indiceParticula = 0;
let velocidade = 250;

let mascaraTexto;


async function setup() { 

  createCanvas(windowWidth, windowHeight);
  background(255);

  mascaraTexto = createGraphics(width, height);
  mascaraTexto.pixelDensity(1);
  mascaraTexto.background(255);
  mascaraTexto.textAlign(CENTER, CENTER);
  mascaraTexto.textFont("Arial");
  mascaraTexto.textStyle(BOLD);
  mascaraTexto.textSize(50);
  mascaraTexto.fill(0);
  mascaraTexto.stroke(0);
  mascaraTexto.strokeWeight(6);
  mascaraTexto.text("A SOMA DAS AUSÊNCIAS", width / 2, height / 2);
  mascaraTexto.loadPixels();

  tabela = await loadTable("data/mortes.csv", ",", "header");

  for (let i = 0; i < tabela.getRowCount(); i++) {

    let entidade = tabela.getString(i, "Entity");

    if (entidade == "World") {

      let ano = Number(tabela.getString(i, "Year"));
      let mortes = Number(tabela.getString(i, "Number of deaths"));

      if (ano >= 1950 && ano <= 2023) {
        dadosAnuais.push({ ano: ano, mortes: mortes });
      }
    }
  }

  let totalMortes = 0;
  let totalParticulas = 0;

  for (let i = 0; i < dadosAnuais.length; i++) {

    totalMortes += dadosAnuais[i].mortes;

    let acumulado = Math.round(totalMortes / escala);

    dadosAnuais[i].particulas = acumulado - totalParticulas;
    dadosAnuais[i].inicio = totalParticulas;

    totalParticulas = acumulado;
  }

  for (let i = 0; i < dadosAnuais.length; i++) {

    for (let j = 0; j < dadosAnuais[i].particulas; j++) {

      let x, y;

      let zona = random();

      if (zona < 0.08) {

        x = random(width);
        y = random(height);

      } else {

        let centro;

        if (zona < 0.38) {
          centro = { x: 0.43, y: 0.48, sx: 0.13, sy: 0.18 };
        } else if (zona < 0.63) {
          centro = { x: 0.57, y: 0.43, sx: 0.13, sy: 0.12 };
        } else if (zona < 0.85) {
          centro = { x: 0.55, y: 0.61, sx: 0.16, sy: 0.13 };
        } else {
          centro = { x: 0.35, y: 0.62, sx: 0.11, sy: 0.13 };
        }

        x = randomGaussian(centro.x * width, centro.sx * width);
        y = randomGaussian(centro.y * height, centro.sy * height);
      }

      x = constrain(x, 0, width);
      y = constrain(y, 0, height);

      let px = Math.floor(x);
      let py = Math.floor(y);
      let indice = 4 * (py * mascaraTexto.width + px);

      while (mascaraTexto.pixels[indice] < 128) {

        x = random(width);
        y = random(height);

        px = Math.floor(x);
        py = Math.floor(y);
        indice = 4 * (py * mascaraTexto.width + px);
      }

      particulas.push({
        x: x,
        y: y,
        ano: dadosAnuais[i].ano,
        tamanho: random(2, 5)
      });
    }
  }

  console.log("Partículas criadas:", particulas.length);

  background(255);
}


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
      fill(0);
      circle(p.x, p.y, p.tamanho);

      indiceParticula++;

    } else {

      anoAtual++;
      indiceParticula = 0;
      break;
    }
  }
}
