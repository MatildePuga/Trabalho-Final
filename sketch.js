let tabela;
let dadosAnuais = [];
let particulas = [];

let escala = 100000;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);

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

    totalParticulas = acumulado;
  }

  // Criar as partículas
  for (let i = 0; i < dadosAnuais.length; i++) {

    let ano = dadosAnuais[i].ano;

    for (let j = 0; j < dadosAnuais[i].particulas; j++) {

      particulas.push({
        x: random(width),
        y: random(height),
        ano: ano
      });
    }
  }

  // Desenhar as partículas
  background(255);
  noStroke();
  fill(0);

  for (let p of particulas) {
    circle(p.x, p.y, 2);
  }

  console.log("Partículas criadas:", particulas.length);
}