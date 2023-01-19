//Declaração da lista de criaturas domésticas e lista total de criaturas
let criaturasDomesticas = [];
let criaturas = [];
//Criação dos objetos correspondentes às criaturas existentes na base de dados
criatura1 = {
  nome: "Centauro",
  habitat: "Floresta Proibida",
  alturaMedia: 2.1,
  domesticavel: false,
  figura: './images/centauro.jpg',
  habilidades: ["Cura", "arco e flecha", "adivinhação", "velocidade", "força"],
};
criatura2 = {
  nome: "Hipogrifo",
  habitat: "Campos abertos (Europa)",
  alturaMedia: 2.0,
  domesticavel: true,
  figura: './images/hipogrifo.jpg',
  habilidades: ["Vôo", "velocidade", "força"],
};
criatura3 = {
  nome: "Testrálio",
  habitat: "Florestas",
  alturaMedia: 2.4,
  domesticavel: true,
  figura: './images/testralio.jfif',
  habilidades: ["Vôo", "invisibilidade"],
};
criatura4 = {
  nome: "Agoureiro",
  habitat: "Arbustos de espinhos nas florestas",
  alturaMedia: 0.4,
  domesticavel: true,
  figura: './images/agoureiro.jpg',
  habilidades: ["Vôo", "previsão de chuvas"],
};
criatura5 = {
  nome: "Elfo Doméstico",
  habitat: "Casas de antigas famílias de bruxos",
  alturaMedia: 0.9,
  domesticavel: true,
  figura: './images/elfo-domestico.jpg',
  habilidades: ["Conjurar feitiços sem uma varinha", "aparatar"],
};
criatura6 = {
  nome: "Phoenix",
  habitat: "Picos de montanhas",
  alturaMedia: 1.0,
  domesticavel: true,
  figura: './images/fenix.jpg',
  habilidades: ["Lágrimas curativas", "renascer", "aparatar", "vôo"],
};
criatura7 = {
  nome: "Nundu",
  habitat: "Florestas da Tanzânia - África Oriental",
  alturaMedia: 3.0,
  domesticavel: false,
  figura: './images/nundu.jpg',
  habilidades: ["Respiração tóxica", "velocidade", "força"],
};
criatura8 = {
  nome: "Basilisco",
  habitat: "Desconhecido",
  alturaMedia: 6.0,
  domesticavel: false,
  figura: './images/basilisco.jpg',
  habilidades: ["Veneno mortal", "petrificação", "força"],
};
//Função que insere um a criatura na lista de criaturas,
//além de transformar o array de habilidades em uma string (texto)
const insereList = (criatura) => {
  const habilidadesCopy = [...criatura.habilidades]
  criatura.habilidades = "";
  habilidadesCopy.forEach((habilidade, index) => {
    index !== habilidadesCopy.length - 1
      ? (criatura.habilidades += habilidade + ", ")
      : (criatura.habilidades += habilidade + ".");
  });
  criaturas.push(criatura);
};
//Função que recebe uma lista de criaturas e retorna um relatório com todas as criaturas da lista
const textConstruct = (criaturas) => {
  let texto = "";

  criaturas.forEach(function (criatura) {
    texto += `${criatura.nome.toUpperCase()}\nHabitat: ${
      criatura.habitat
    }.\nAltura Média: ${criatura.alturaMedia} m.\n`;

    criatura.domesticavel
      ? (texto += "Domesticável? Sim.\nHabilidades: ")
      : (texto += "Domesticável? Não.\nHabilidades: ");

    texto += criatura.habilidades + "\n\n";
  });

  return texto;
};

const calcMedia = (criaturas) =>{
  let cont = 0;
  let soma = 0;
  for(criatura of criaturas){
    soma += criatura.alturaMedia
    cont++
  }
  return (soma/cont)
}

//Utiliza a função insereList para inserir cada criatura criada na lista de criaturas
insereList(criatura1);
insereList(criatura2);
insereList(criatura3);
insereList(criatura4);
insereList(criatura5);
insereList(criatura6);
insereList(criatura7);
insereList(criatura8);

//Cria uma lista apenas das criaturas domesticáveis a partir da lista total de criaturas
criaturasDomesticas = criaturas.filter(criatura => criatura.domesticavel)

console.log(
  "\n\nCriaturas Domesticáveis: \n\n" + textConstruct(criaturasDomesticas)
);

console.log("\n\nTotal de Criaturas: \n\n" + textConstruct(criaturas));

console.log('\n\n Média das alturas das criaturas: ' + calcMedia(criaturas))

const lista = document.getElementById('lista')

const input = document.getElementById('busca')

const createCard = (criatura) =>{
  let cardContent = ''
  cardContent += `
    <section class="card">
      <ul>
        <li id="titulo">${criatura.nome}</li>
        <li>Habitat: ${criatura.habitat}</li>
        <li>Altura Média: ${criatura.alturaMedia} metros</li>
        `
  criatura.domesticavel
  ? (cardContent += "<li>Domesticável? Sim.</li>")
  : (cardContent += "<li>Domesticável? Não.</li>");
  cardContent += `<li>Habilidades: ${criatura.habilidades}</li>
      </ul>

      <img class="image" src=${criatura.figura} alt="" />
    </section>
  `
  return cardContent;
}

const listAll = (event, criaturas) =>{
  lista.innerHTML = ''
  for (criatura of criaturas){
    lista.innerHTML += createCard(criatura)
  }
}

listAll(event, criaturas)

const search = (list, event) => {
  event.preventDefault()
  const inputSearch = input.value
  if(inputSearch){
    lista.innerHTML = ''
    for (object of list){
      for (property in object){
        if(object[property].toString().toLowerCase().includes(inputSearch.toLowerCase())){
          lista.innerHTML += createCard(object)
          break;
        }
      }
    }
    if(lista.innerHTML == '')
      lista.innerHTML = `
      <div class = "card" style="height:70px;width:10vw;color:black">
        <h1 style="font-size:40px;grid-column:1/3;">Criatura Inexistente</h1>
      </div>`
  }else{
    alert('Nem mesmo um bruxo saberá o que procuras, se não digitares nada!')
  }
}