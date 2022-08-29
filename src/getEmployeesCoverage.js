const { species } = require('../data/zoo_data');
const data = require('../data/zoo_data');

const getSpecieName = (animal) => {
  const specie = species.filter((e) => e.id === animal);
  return specie[0].name;
};
// console.log(getSpecieName('e8481c1d-42ea-4610-8e11-1752cfc05a46'));

const getSpeciesName = (element) => {
  const animais = [];
  element.responsibleFor.forEach((animal) => {
    animais.push(getSpecieName(animal));
  });
  return animais;
};

const getAnimalLocation = (animal) => {
  const specie = species.filter((e) => e.id === animal);
  return specie[0].location;
};

const getLocationAnimals = (element) => {
  const locations = [];
  element.responsibleFor.forEach((animal) => {
    locations.push(getAnimalLocation(animal));
  });
  return locations;
};
// console.log(animalsLocation([ 'lions', 'tigers' ]));

const allEmplyees = [];
const getAllEmployees = (...rest) => {
  if (rest.length === 0) {
    data.employees.forEach((e) => {
      allEmplyees.push({
        id: e.id,
        fullName: `${e.firstName} ${e.lastName}`,
        species: getSpeciesName(e),
        locations: getLocationAnimals(e),
      });
    });
    return allEmplyees;
  }
};
// console.log(getAllEmployees());

const getEmployeeByName = (...rest) => {
  const allEmployees = getAllEmployees();
  const employeeId = (data.employees
    .filter((e) => ((e.firstName === rest[0].name) || (e.lastName === rest[0].name))))[0].id;
  const employeeMap = allEmployees.filter((employee) => employee.id === employeeId)[0];
  return employeeMap;
};
// console.log(getEmployeeByName({ name: 'Spry' }));

const getEmployeeById = (...rest) => {
  const allEmployees = getAllEmployees();
  const selectedEmployee = (allEmployees.filter((element) => element.id === rest[0].id));
  return selectedEmployee[0];
};
// console.log(getEmployeeById({ id: 'c1f50212-35a6-4ecd-8223-f835538526c2' }));

const arrayNamesAndId = [];
data.employees.forEach((element) => {
  arrayNamesAndId.push(element.id, element.firstName, element.lastName);
});
// console.log(arrayNamesAndId);

const verifyInvalid = (rest) => arrayNamesAndId.includes(Object.values(rest[0])[0]);

const lancarErro = () => {
  throw new Error('Informações inválidas');
};

function getEmployeesCoverage(...rest) {
  if (rest[0] === undefined) {
    return getAllEmployees();
  }
  if (verifyInvalid(rest) === false) {
    lancarErro();
  }
  const restSize = Object.keys(rest[0]);
  if (restSize.includes('name')) {
    return getEmployeeByName(...rest);
  }
  if (restSize.includes('id')) {
    return getEmployeeById(...rest);
  }
}
// console.log(getEmployeesCoverage({ name: 'Sharonda' }));
// console.log('-----------------');
// console.log(getEmployeesCoverage({ name: 'Spry' }));
// console.log('-----------------');
// console.log(getEmployeesCoverage({ id: 'c1f50212-35a6-4ecd-8223-f835538526c2' }));
// console.log('-----------------');
// console.log(getEmployeesCoverage());
// console.log('-----------------');
// console.log(getEmployeesCoverage({ name: 'Não existe' }));
module.exports = getEmployeesCoverage;
