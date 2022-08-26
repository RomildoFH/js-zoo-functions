const data = require('../data/zoo_data');

const Managers = data.employees.map((element) => (element.managers));

// console.log(Managers);

function isManager(id) {
  let manager = false;
  Managers.forEach((element) => {
    if (element.includes(id)) {
      manager = true;
    }
  });
  return manager;
}
// console.log(isManager('9e7d4524-363c-416a-8759-8aa7e50c0992'))

function getRelatedEmployees(managerId) {
  if (isManager(managerId) === true) {
    // console.log(isManager(managerId))
    // return (`Sim é uma pessoa gerente`)
    const listaEmployee = data.employees.filter((element) => element.managers
      .some((e) => e === managerId));
    return listaEmployee.map((funcionario) => (`${funcionario.firstName} ${funcionario.lastName}`));
    // console.log(listaEmployee);
  }
  throw new Error('O id inserido não é de uma pessoa colaboradora gerente!');
}
console.log(getRelatedEmployees('9e7d4524-363c-416a-8759-8aa7e50c0992'));
module.exports = { isManager, getRelatedEmployees };
