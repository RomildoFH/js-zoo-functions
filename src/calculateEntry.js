const data = require('../data/zoo_data');

const visitantes = [
  { name: 'Lara Carvalho', age: 5 },
  { name: 'Frederico Moreira', age: 5 },
  { name: 'Pedro Henrique Carvalho', age: 5 },
  { name: 'Maria Costa', age: 18 },
  { name: 'Núbia Souza', age: 18 },
  { name: 'Carlos Nogueira', age: 50 },
];

const resultado = {};

function countEntrants(entrants) {
  const children = entrants.filter((pessoa) => pessoa.age < 18);
  const adult = entrants.filter((pessoa) => pessoa.age >= 18 && pessoa.age < 50);
  const senior = entrants.filter((pessoa) => pessoa.age >= 50);
  resultado.child = children.length;
  resultado.adult = adult.length;
  resultado.senior = senior.length;
  return (resultado);
}
// console.log(countEntrants(visitantes));

function calculateEntry(entrants) {
  if (entrants === undefined || entrants.length === 0 || Object.keys(entrants).length === 0) {
    return 0;
  }
  countEntrants(entrants);
  const totalChild = Object.values(resultado)[0] * data.prices.child;
  const totalAdult = Object.values(resultado)[1] * data.prices.adult;
  const totalSenior = Object.values(resultado)[2] * data.prices.senior;
  const total = totalChild + totalAdult + totalSenior;
  return total;
}
console.log(calculateEntry(visitantes));

module.exports = { calculateEntry, countEntrants };
