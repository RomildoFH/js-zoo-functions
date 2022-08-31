const data = require('../data/zoo_data');

const { species } = data;

// 1 - Passo: Primeria callback - Criar uma função que capture todas as regiões no data e retorne um array contendo as mesmas para alimentarem as outras HOFs/Callbacks;
const regionsArray = () => {
  const regions = [];
  species.map((element) => element.location).forEach((region) => {
    if (regions.includes(region) === false) {
      regions.push(region);
    }
  });
  return regions;
};
// console.log(regionsArray());

// const allSpeciesNames = () => {
//   const speciesNames = [];
//   species.forEach((specie) => {
//     speciesNames.push(specie.name);
//   });
//   return speciesNames;
// };
// console.log(allSpeciesNames());

// 2 - Passo: Segunda callback - Retornar um objeto único, onde as chaves são as regiões e o valores são um array contendo as especies que alí residem;
const speciesByRegion = () => {
  const regions = regionsArray();
  let especies = [];
  const resultado = regions.reduce((acc, curr, index) => {
    especies = species.filter((specie) => specie.location === regions[index])
      .map((specie) => specie.name);
    acc[curr] = especies;
    // console.log(especies)
    return acc;
  }, {});
  return resultado;
};
// console.log(speciesByRegion())
// 9 - Passo: Cópie a função do getAnimalsName
// 10 - Passo: dentro da constante que realiza os filtros para montar o array de residentes, inclua um .filter que compare o sex do elemento com o sex passado por parâmetro, após isto, continue o .map para montar o array apenas com os nomes de residentes do sex passado.
const getAnimalsNameBySex = (sorted, sex) => {
  const allRegionsSpecies = speciesByRegion();
  const regions = regionsArray();
  const especies = [];
  regions.forEach((element, index) => {
    especies[index] = allRegionsSpecies[element].reduce((acc, specie) => {
      const residentes = species.find((e1) => e1.name === specie).residents
        .filter((e3) => e3.sex === sex).map((e2) => e2.name);
      if (sorted === true) {
        acc.push({ [specie]: residentes.sort() });
        console.log(residentes);
        return acc;
      }
      acc.push({ [specie]: residentes });
      return acc;
    }, []);
    allRegionsSpecies[element] = especies[index];
  });
  return allRegionsSpecies;
};

// 5 - Passo: Criar uma função, que busque o retorno de speciesByRegion() e traga-o para o seguinte formato:
/*  NE: [
    { lions: ['Zena', 'Maxwell', 'Faustino', 'Dee'] },
    { giraffes: ['Gracia', 'Antone', 'Vicky', 'Clay', 'Arron', 'Bernard'] },
  ],
// [...] */
// 5.1 - Utilizar o array de regiões com o forEach para poder ser percorrido e comparado com os elementos do allRegionsSpecies que são regiões;
// 5.2 - Criar um array vazio para receber os nomes dos visitantes para depois imputa-lo a cada especie. Exemplo: { lions: ['Zena', 'Maxwell', 'Faustino', 'Dee'] };
// 5.3 - Utilizar o forEach para percorrer o regions onde cada elemento é uma região que deverá ser comparada com os elementos (regiões) do objeto gerado pela speciesByRegion() LEMBRAR de colocar o [] no final da reduce;
// 5.4 - Utilizar reduce para criar o array de cada região que vai conter o objeto que abraça a especíe e os seus residentes.
// 5.5 - Utilizar o data.species.find em conjunto com o .map para poder criar o array que contém os nomes dos residentes.
// 6.0 - Dentro do escopo do reduce, verificar se é necessário utilizar o sorted, caso sim, o array que armazena os residentes deverá receber o .sort() para ordenar em ordem alfabética.
// 6.1 - O array que esta sendo criado no escopo do .reduce, deverá ter o seguinte formato [{ specie: [residente1, residente2...]}]
// 6.2 - Dentor do IF que verifica o sorte, utilize o .push({ specie: [residente1, residente2...]}) para ele criar o objeto e posteriormente adicionalo ao acc.
// 6.3 - NÃO ESQUECER DE RETORNAR O ACC NO FINAL DO IF DO SORT.
// 7 - Ainda dentro do escopo do forEach, deverá retornar o objeto { specie: [residente1, residente2...]} sem o sort() caso sorted não seja passado.
// 8 - Implemente uma condição para o caso de o sex ser repassado, lembrando que este valor é string e não boolean, logo deverá ser diferente de undefined.
const getAnimalsName = (sorted, sex) => {
  const allRegionsSpecies = speciesByRegion();
  const regions = regionsArray();
  const especies = [];
  regions.forEach((element, index) => {
    especies[index] = allRegionsSpecies[element].reduce((acc, specie) => {
      const residentes = species.find((e1) => e1.name === specie).residents.map((e2) => e2.name);
      if (sorted === true) {
        acc.push({ [specie]: residentes.sort() });
        return acc;
      }
      acc.push({ [specie]: residentes });
      return acc;
    }, []);
    allRegionsSpecies[element] = especies[index];
  });
  return sex !== undefined ? getAnimalsNameBySex(sorted, sex) : allRegionsSpecies;
};

// 2 - Passo: Alimentar a função getAnimalMap com condicional que chame as callbacks;
function getAnimalMap(options) {
// 3 - Passo: chamar a speciesByRegion() caso options seja indefinido;
  if (options === undefined) {
    return speciesByRegion();
  }
// 4 - Passo: Implementar condição que retorne uma callback que preencha com os nomes de todos os animais por especie e região;
  const { includeNames, sorted, sex } = options;
  // console.log(includeNames)
  // console.log(sorted)
  // console.log(sex)
  if (includeNames === true) {
    return getAnimalsName(sorted, sex);
  }
  // 11 - Passo: Inclua uma condição que caso o includeNames não seja repassado mas sex e sorted sim, retorne a função speciesByRegion.
  if (includeNames === undefined) {
    return speciesByRegion();
  }
}
// console.log(getAnimalMap());
// console.log(getAnimalMap({ sex: 'female' }));
// console.log(getAnimalMap({ sex: 'female', sorted: true }));
// console.log(getAnimalMap({ includeNames: true }));
console.log(getAnimalMap({ includeNames: true, sorted: true, sex: 'female' }));

module.exports = getAnimalMap;
