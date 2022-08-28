const data = require('../data/zoo_data');

// Primeria Callback - Encontrar a pessoa colaboradora cujo o id passado pertence:
const getEmplyee = (id) => data.employees.filter((element) => element.id === id);
// console.log(getEmplyee ('c1f50212-35a6-4ecd-8223-f835538526c2'));

// Segunda Callback - Encontrar a primeira espécie de animal que a pessoa colaboradora é responsável

const FirstSpecie = (id) => getEmplyee(id)[0].responsibleFor[0];
// console.log(FirstSpecie('c1f50212-35a6-4ecd-8223-f835538526c2'));

const getOldestAnimalFromSpecie = (id) => {
  const { residents } = data.species.filter((element) => element.id === FirstSpecie(id))[0];
  return residents.sort((obj1, obj2) => obj2.age - obj1.age)[0];
};
// console.log(getOldestAnimalFromSpecie('c1f50212-35a6-4ecd-8223-f835538526c2'));

function getOldestFromFirstSpecies(id) {
  return Object.values(getOldestAnimalFromSpecie(id));
}
console.log(getOldestFromFirstSpecies('c1f50212-35a6-4ecd-8223-f835538526c2'));

module.exports = getOldestFromFirstSpecies;
