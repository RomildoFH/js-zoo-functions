const data = require('../data/zoo_data');

// Primeira Callback - Retornar um objeto com todos os dias da semana, onde cada dia seguirá este modelo:
/* {
  'Tuesday': {
    'officeHour': 'Open from 8am until 6pm',
    'exhibition': ['lions', 'tigers', 'bears', 'penguins', 'elephants', 'giraffes'],
    }
} */

const allDays = {};
const dias = Object.keys(data.hours);
const open = (element) => (data.hours[element]).open;
const close = (element) => (data.hours[element]).close;
const addAnimal = (element) => {
  const availableSpecies = [];
  data.species.forEach((specie) => {
    if (specie.availability.includes(element)) {
      availableSpecies.push(specie.name);
    }
  });
  return availableSpecies;
};
// console.log(addAnimal('Tuesday'));

const allDaysOfWeek = () => {
  dias.forEach((element) => {
    allDays[element] = {
      officeHour: `Open from ${open(element)}am until ${close(element)}pm`,
      exhibition: addAnimal(element),
    };
  });
  allDays.Monday = { officeHour: 'CLOSED', exhibition: 'The zoo will be closed!' };
  return allDays;
};
// console.log(allDaysOfWeek());

const daysPerAnimal = (scheduleTarget) => {
  const selected = data.species.filter((animal) => animal.name === scheduleTarget)[0].availability;
  return selected;
};
// console.log(daysPerAnimal('lions'));

const arrayDays = Object.keys(data.hours);
// console.log(arrayDays);
const animalsPerDay = (scheduleTarget) => {
  const resultado = {};
  resultado[scheduleTarget] = (allDaysOfWeek()[scheduleTarget]);
  return (resultado);
};
console.log(animalsPerDay('Tuesday'));

const arraySpecies = () => data.species.map((element) => element.name);
// console.log(arraySpecies());

const Monday = () => ({ Monday: { officeHour: 'CLOSED', exhibition: 'The zoo will be closed!' } });

function getSchedule(scheduleTarget) {
  if (scheduleTarget === undefined) {
    return allDaysOfWeek();
  }
  if (arraySpecies().includes(scheduleTarget)) {
    return daysPerAnimal(scheduleTarget);
  }
  if (scheduleTarget === 'Monday') {
    return Monday();
  }
  if (arrayDays.includes(scheduleTarget)) {
    return animalsPerDay(scheduleTarget);
  }
  return allDaysOfWeek();
}
console.log(getSchedule('Tuesday'));
module.exports = getSchedule;
