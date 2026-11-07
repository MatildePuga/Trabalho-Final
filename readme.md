# A SOMA DAS AUSÊNCIAS

## Sobre o projeto

**A Soma das Ausências** é um projeto de visualização de dados que representa o número de mortes registadas anualmente em todo o mundo.

A ideia surgiu da vontade de transformar números numa composição visual. Em vez de apresentar os dados através de um gráfico convencional, quis representá-los através de partículas que vão aparecendo e acumulando ao longo do tempo.

Cada partícula representa aproximadamente 5 000 mortes. A composição cresce progressivamente à medida que os dados de cada ano são acrescentados.

O título também faz parte da composição. Não é desenhado por cima das partículas, mas formado pelo espaço vazio onde estas não podem aparecer.

## Dados

Os dados foram retirados da plataforma **Our World in Data**, da série *Number of deaths*, baseada nas estimativas das Nações Unidas (*World Population Prospects 2024*).

Utilizei um ficheiro CSV com os registos anuais disponíveis, entre 1950 e 2023, selecionando apenas os dados relativos ao mundo (*World*).

Os valores correspondem a estimativas estatísticas do número de mortes por ano.

## Como funciona?

**Input**

Um ficheiro CSV com os dados anuais do número de mortes a nível mundial.

**Process**

O código lê e organiza os dados por ano, convertendo os valores em partículas através de uma escala definida. As partículas são distribuídas aleatoriamente, mas com centros de concentração que dão forma à composição. A sua posição, tamanho e velocidade de aparecimento são controlados através de diferentes parâmetros do código. A animação apresenta o resultado progressivamente, respeitando também o espaço reservado ao título.

**Output**

Uma composição visual generativa, em preto e branco, que vai crescendo de acordo com os dados e revela o título através da ausência de partículas.

## Ferramentas

- p5.js e JavaScript — programação e animação;
- Visual Studio Code — edição do código;
- CSV — organização dos dados;
- Our World in Data — fonte dos dados estatísticos.

## Utilização de Inteligência Artificial

A ideia de *A Soma das Ausências* partiu de mim. Expliquei à ferramenta de Inteligência Artificial o conceito e aquilo que pretendia alcançar visualmente.

A IA foi especialmente importante na parte técnica do projeto, nomeadamente na integração dos dados do ficheiro CSV no Visual Studio Code e na sua transformação em partículas através do p5.js. Também me ajudou a experimentar e a refinar o posicionamento das acumulações.

Ao longo do processo, tentei chegar, com a ajuda da IA, a um código que fosse o mais adaptável possível e que me permitisse explorar diferentes formatações do mesmo projeto. Queria conseguir experimentar livremente com parâmetros como o tamanho e a quantidade de partículas, as cores, a distribuição, a quantidade de mortes representada por cada partícula e a velocidade do seu aparecimento, sem ter de reconstruir o código sempre que quisesse testar uma nova possibilidade.

Também recorri à IA para compreender partes do código e resolver erros que foram surgindo durante o desenvolvimento.