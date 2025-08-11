import { describe, it, expect } from 'vitest';
import { spawnFood } from '../src/logic/food.js';

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
});


