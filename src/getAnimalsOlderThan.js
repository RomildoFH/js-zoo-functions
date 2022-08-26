const data = require('../data/zoo_data');

const { species } = data;

function getAnimalsOlderThan(animal, age) {
  const especie = species.find((specie) => specie.name === animal);
  // console.log(especie);
  const residentes = especie['residents'];
  // console.log(residentes);
  return residentes.every((resident) => resident.age > age);
}
console.log(getAnimalsOlderThan('penguins', 18));

module.exports = getAnimalsOlderThan;
