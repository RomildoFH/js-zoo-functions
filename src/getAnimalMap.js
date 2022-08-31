const data = require('../data/zoo_data');

const { species } = data;

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
  if (sex !== undefined) {
    return getAnimalsNameBySex(sorted, sex);
  }
  return allRegionsSpecies;
};

function getAnimalMap(options) {
  if (options === undefined) {
    return speciesByRegion();
  }
  const { includeNames, sorted, sex } = options;
  // console.log(includeNames)
  // console.log(sorted)
  // console.log(sex)
  if (includeNames === true) {
    return getAnimalsName(sorted, sex);
  }
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
