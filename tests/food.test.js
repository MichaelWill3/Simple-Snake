import { describe, it, expect } from 'vitest';
import { spawnFood, cellsEqual, checkAndHandleEat } from '../src/logic/food.js';

describe('spawnFood', () => {
  it('places food on an empty cell within bounds', () => {
    const gridWidth = 20;
    const gridHeight = 20;
    const occupied = new Set([`${10},${10}`]);
    const result = spawnFood(gridWidth, gridHeight, occupied);
    expect(result.x).toBeGreaterThanOrEqual(0);
    expect(result.x).toBeLessThan(gridWidth);
    expect(result.y).toBeGreaterThanOrEqual(0);
    expect(result.y).toBeLessThan(gridHeight);
    expect(occupied.has(`${result.x},${result.y}`)).toBe(false);
  });

  it('throws if grid is full', () => {
    const gridWidth = 2;
    const gridHeight = 2;
    const occupied = new Set([
      '0,0','0,1','1,0','1,1'
    ]);
    expect(() => spawnFood(gridWidth, gridHeight, occupied)).toThrow();
  });

  it('compares cell equality', () => {
    expect(cellsEqual({ x: 1, y: 2 }, { x: 1, y: 2 })).toBe(true);
    expect(cellsEqual({ x: 1, y: 2 }, { x: 2, y: 1 })).toBe(false);
    expect(cellsEqual(null, { x: 1, y: 2 })).toBe(false);
  });

  it('handles eating and respawns food on empty cell', () => {
    const gridWidth = 5;
    const gridHeight = 5;
    const head = { x: 2, y: 2 };
    const food = { x: 2, y: 2 };
    const occupied = new Set();
    const result = checkAndHandleEat(head, food, gridWidth, gridHeight, occupied);
    expect(result.didEat).toBe(true);
    expect(result.growth).toBe(1);
    expect(result.nextFood).not.toBeNull();
    expect(result.nextFood.x).toBeGreaterThanOrEqual(0);
    expect(result.nextFood.y).toBeGreaterThanOrEqual(0);
  });
});


