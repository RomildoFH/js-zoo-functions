const data = require('../data/zoo_data');

// Callback Todas especies e Gêneros
const allSpeciesAndGender = (animal) => {
  if (animal === undefined) {
    return data.species.reduce((acc, curr) => {
      acc[curr.name] = curr.residents.length;
      return acc;
    }, {});
  }
};
// console.log(allSpeciesAndGender());
/* {
  'lions': 4,
  'tigers': 2,
  'bears': 3,
  'penguins': 4,
  'otters': 4,
  'frogs': 2,
  'snakes': 2,
  'elephants': 4,
  'giraffes': 6,
}; */

// Callback Todos gêneros de uma especie especificadas
const allAnimalsOfSpecie = (animal) => data.species.reduce((acc, curr) => {
  if (animal.specie === curr.name) {
    return curr.residents.length;
    // return acc;
  }
  return acc;
}, 0);
// console.log(allAnimalsOfSpecie({ specie: 'giraffes' }));

const countAnimalsBySpecieAndSex = (animal) => data.species.reduce((acc, curr) => {
  if (animal.specie === curr.name) {
    const residentsBySex = curr.residents.filter((resident) => resident.sex === animal.sex);
    return residentsBySex.length;
    // return acc;
  }
  return acc;
}, 0);
console.log(countAnimalsBySpecieAndSex({ specie: 'elephants', sex: 'male' }));

function countAnimals(animal) {
  if (animal === undefined) {
    return allSpeciesAndGender();
  }
  if (animal.specie !== undefined && animal.sex === undefined) {
    return allAnimalsOfSpecie(animal);
  }
  return countAnimalsBySpecieAndSex(animal);
}
// console.log(countAnimals({ specie: 'giraffes' }));

module.exports = countAnimals;
