const getOpeningHours = require('../src/getOpeningHours');

describe('Testes da função getOpeningHours', () => {
  it('Caso a função não receba parâmetro deverá retornar um objeto com a agenda completa', () => {
    const result = getOpeningHours();
    expect(result).toEqual({
      Tuesday: { open: 8, close: 6 },
      Wednesday: { open: 8, close: 6 },
      Thursday: { open: 10, close: 8 },
      Friday: { open: 10, close: 8 },
      Saturday: { open: 8, close: 10 },
      Sunday: { open: 8, close: 8 },
      Monday: { open: 0, close: 0 },
    });
  });
  it('Para os argumentos Monday e 09:00-AM deve retornar a string \'The zoo is closed\'', () => {
    const result = getOpeningHours('Monday', '09:00-AM');
    expect(result).toBe('The zoo is closed');
  });
  it('Para os argumentos Tuesday e 09:00-AM deve retornar a string \'The zoo is open\'Para os argumentos Tuesday e 09:00-AM deve retornar a string \'The zoo is open\'', () => {
    const result = getOpeningHours('Tuesday', '09:00-AM');
    expect(result).toBe('The zoo is open');
  });
  it('Para os argumentos Wednesday e 09:00-PM deve retornar a string \'The zoo is closed\'', () => {
    const result = getOpeningHours('Wednesday', '09:00-PM');
    expect(result).toBe('The zoo is closed');
  });
  it("Teste se caso receba um dia inexistente retorna um erro", () => {
    expect(() => getOpeningHours('Tuesdayy','10:00-AM')).toThrow(/^The day must be valid. Example: Monday$/);
  });
  it("Teste se caso receba não a sigla AM ou PM errada, retorne erro", () => {
    expect(() => getOpeningHours('Tuesday','10:00-AN')).toThrow(/^The abbreviation must be 'AM' or 'PM'$/);
  });
  it("Teste se caso receba não o separador da sigla, retorne erro", () => {
    expect(() => getOpeningHours('Tuesday','10:00 AM')).toThrow(/^The minutes should represent a number$/);
  });
  it("Teste se caso receba hora maior que 12, retorne erro", () => {
    expect(() => getOpeningHours('Wednesday', '13:30-AM')).toThrow(/^The hour must be between 0 and 12$/);
  });
  it("Teste se caso receba minuto maior que 59, retorne erro", () => {
    expect(() => getOpeningHours('Wednesday', '11:60-AM')).toThrow(/^The minutes must be between 0 and 59$/);
  });
  it("Teste se caso receba o horário com formato errado, retorne erro", () => {
    expect(() => getOpeningHours('Wednesday', ' 9:00-AM')).toThrow(/^The hour should represent a number$/);
  });
});
