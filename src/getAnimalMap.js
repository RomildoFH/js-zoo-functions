const data = require('../data/zoo_data');

const { species } = data;

// 1 - Criando array com todas localizações
const getAllRegions = () => {
  const regionsArray = [];
  species.map((specie) => specie.location).forEach((location) => {
    if (!regionsArray.includes(location)) {
      regionsArray.push(location);
    }
  });
  return regionsArray;
};
// console.log(getAllRegions());

// 2 - Função que cria objeto geral com todas as regiões, e também cada região possui um array com os nomes das especíes que lá habitam:
const getAllLocationsSpecies = () => {
  const regioes = getAllRegions();
  const objetoGeral = {};
  regioes.forEach((regiao) => {
    objetoGeral[regiao] = species.filter((specie) => specie.location === regiao)
      .map((specie) => specie.name);
  });
  return objetoGeral;
};

const verifySex = (sex, animal, sorted) => {
  let animal2 = animal.filter((e3) => e3.sex === sex).map((e2) => e2.name);
  if (sorted === true) {
    animal2 = animal2.sort();
  }
  // console.log(animal2);
  return animal2;
};

// 3 - Função que cria um objeto para cada especie e apresenta o nome da especie como chave e os nomes dos residentes dentro de um array como valor.
const getAnimalsName = (sorted, sex) => {
  const allSpecies = getAllLocationsSpecies();
  const regioes = getAllRegions();
  const arrayResidentes = [];
  regioes.forEach((regiao, index) => {
    arrayResidentes[index] = allSpecies[regiao].reduce((acc, curr) => {
      let animal = species.find((e) => e.name === curr).residents;
      if (sex !== undefined) {
        animal = verifySex(sex, animal, sorted);
      }
      if (sorted === true && sex === undefined) {
        animal = animal.map((e2) => e2.name).sort();
      }
      acc.push({ [curr]: animal });
      return acc;
    }, []);
    allSpecies[regiao] = arrayResidentes[index];
  });
  return allSpecies;
};

const getAnimalsName2 = () => {
  const allSpecies = getAllLocationsSpecies();
  const regioes = getAllRegions();
  const arrayResidentes = [];
  regioes.forEach((regiao, index) => {
    arrayResidentes[index] = allSpecies[regiao].reduce((acc, curr) => {
      let animal = species.find((e) => e.name === curr).residents;
      animal = animal.map((e2) => e2.name);
      acc.push({ [curr]: animal });
      return acc;
    }, []);
    allSpecies[regiao] = arrayResidentes[index];
  });
  return allSpecies;
};

const decisoryFlow = (sorted, sex) => {
  if (sorted === undefined && sex === undefined) {
    return getAnimalsName2();
  }
  return getAnimalsName(sorted, sex);
};

function getAnimalMap(options) {
  if (!options) return getAllLocationsSpecies();

  const { includeNames, sorted, sex } = options;

  if (!includeNames) return getAllLocationsSpecies();

  if (includeNames === true) return decisoryFlow(sorted, sex);

  // if (includeNames === true) return getAnimalsName(sorted, sex);
}
// console.log(getAnimalMap());
// console.log(getAnimalMap({ sex: 'female' }));
// console.log(getAnimalMap({ sex: 'female', sorted: true }));
// console.log(getAnimalMap({ includeNames: true }));
// console.log(getAnimalMap({ includeNames: true, sorted: true }));
// console.log(getAnimalMap({ includeNames: true, sex: 'male' }));
// console.log(getAnimalMap({ includeNames: true, sorted: true, sex: 'male' }));

module.exports = getAnimalMap;
