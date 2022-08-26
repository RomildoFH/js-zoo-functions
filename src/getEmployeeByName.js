const data = require('../data/zoo_data');

const { employees } = data;
// console.log(employees);
function getEmployeeByName(employeeName) {
  if (employeeName !== undefined) {
    return employees.find((e) => e.firstName === employeeName || e.lastName === employeeName);
  }
  return ({});
}
console.log(getEmployeeByName('Nigel'));
// console.log(getEmployeeByName());

module.exports = getEmployeeByName;
