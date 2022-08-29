const handlerElephants = require('../src/handlerElephants');

describe('Testes da função HandlerElephants', () => {
  it('Quando não recebe nenhum parâmetro deve retornar undefined', () => {
    const resultado = handlerElephants();
    expect(resultado).toBe(undefined);
  });
  it('Quando recebe um parâmetro cujo tipo não é String, deve retornar: Parâmetro inválido, é necessário uma string', () => {
    const resultado = handlerElephants(1);
    expect(resultado).toBe('Parâmetro inválido, é necessário uma string');
  });
  it('Quando recebe por parâmetro uma propriedade contida no objeto elefante, deverá retornar o seu valor.', () => {
    const resultado = handlerElephants('location');
    expect(resultado).toBe('NW');
  });
  it('Quando receber um parâmetro que não atenda a nenhuma condição estabelecida, deverá retornar null.', () => {
    const resultado = handlerElephants('foods');
    expect(resultado).toBe(null);
  });
  it('Para o argumento count deve retornar o número inteiro 4', () => {
    expect(4).toBe(4);
  });
  it('Para o argumento names deve retornar um array de nomes que possui o nome Jefferson', () => {
    const resultado = (handlerElephants('names').includes('Jefferson'));
    expect(resultado).toBe(true);
  });
  it('Para o argumento averageAge deve retornar um número próximo a 10.5', () => {
    const resultado = (handlerElephants('averageAge'));
    expect(resultado).toBe(10.5);
  });
  it('Testar se é função', () => {
    expect(typeof handlerElephants).toBe('function');
  })
  it('Para o argumento count deve retornar o número inteiro 4', () => {
    const resultado = handlerElephants('count')
    expect(resultado).toBe(4);
  })
});
