import { Ship } from '../Ship'

describe('test Ship factory functions', () => {
  const ship = Ship(4);

  test('shot position is less than length and not hit', () => {
    ship.hit(0);
    expect(ship.hits.length).toBe(1);
  })

  test('shot position is bigger than length', () => {
    ship.hit(14);
    expect(ship.hits.length).toBe(1);
  })

  test('shot position is negative', () => {
    ship.hit(-1);
    expect(ship.hits.length).toBe(1);
  })

  test('shot at a hit position', () => {
    ship.hit(0);
    expect(ship.hits.length).toBe(1);
  })


  test('hits is less than length', () => {
    expect(ship.isSunk).toBeTruthy();
  })

  test('hits is equal ship length', () => {
    ship.hit(1);
    ship.hit(2);
    ship.hit(3)
    expect(ship.isSunk).toBeTruthy();
  })


})
