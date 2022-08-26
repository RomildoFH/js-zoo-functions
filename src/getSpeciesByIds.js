const data = require('../data/zoo_data');

const { species } = data;

const getSpeciesByIds = (...ids) => {
  // 1 - A função getSpeciesByIds, caso não receba nenhum parâmetro, deve retornar um array vazio;
  const selected = [];
  const idsLength = ids.length;
  // 2 - A função getSpeciesByIds, caso receba como parâmetro um único ID, deve retornar um array com a espécie referente a esse ID;
  if (idsLength !== 0) {
    ids.forEach((id) => {
      species.filter((element) => ((element.id === id) ? selected.push(element) : selected));
    });
  }
  return selected;
};
// console.log(getSpeciesByIds('0938aa23-f153-4937-9f88-4858b24d6bce'));
// console.log(getSpeciesByIds('0938aa23-f153-4937-9f88-4858b24d6bce', 'e8481c1d-42ea-4610-8e11-1752cfc05a46'));
// console.log(getSpeciesByIds());

module.exports = getSpeciesByIds;
