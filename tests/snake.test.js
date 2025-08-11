import { describe, it, expect } from 'vitest';
import { computeNextHead, moveSnake, positionsToOccupiedSet, isOutOfBounds, willCollideWithWall } from '../src/logic/snake.js';

describe('snake logic', () => {
  it('computes next head based on direction', () => {
    expect(computeNextHead({ x: 5, y: 5 }, { x: 1, y: 0 })).toEqual({ x: 6, y: 5 });
    expect(computeNextHead({ x: 5, y: 5 }, { x: 0, y: -1 })).toEqual({ x: 5, y: 4 });
  });

  it('moves forward without growth', () => {
    const next = moveSnake([{ x: 2, y: 2 }], { x: 1, y: 0 }, 0);
    expect(next).toEqual([{ x: 3, y: 2 }]);
  });

  it('grows when growth > 0', () => {
    const next = moveSnake([{ x: 2, y: 2 }], { x: 1, y: 0 }, 1);
    expect(next).toEqual([{ x: 3, y: 2 }, { x: 2, y: 2 }]);
  });

  it('encodes occupied set', () => {
    const set = positionsToOccupiedSet([{ x: 1, y: 1 }, { x: 2, y: 3 }]);
    expect(set.has('1,1')).toBe(true);
    expect(set.has('2,3')).toBe(true);
    expect(set.has('0,0')).toBe(false);
  });

  it('detects out of bounds', () => {
    expect(isOutOfBounds({ x: -1, y: 0 }, 20, 20)).toBe(true);
    expect(isOutOfBounds({ x: 0, y: -1 }, 20, 20)).toBe(true);
    expect(isOutOfBounds({ x: 20, y: 0 }, 20, 20)).toBe(true);
    expect(isOutOfBounds({ x: 0, y: 20 }, 20, 20)).toBe(true);
    expect(isOutOfBounds({ x: 19, y: 19 }, 20, 20)).toBe(false);
  });

  it('predicts wall collision for next move', () => {
    expect(willCollideWithWall({ x: 0, y: 0 }, { x: -1, y: 0 }, 20, 20)).toBe(true);
    expect(willCollideWithWall({ x: 19, y: 0 }, { x: 1, y: 0 }, 20, 20)).toBe(true);
    expect(willCollideWithWall({ x: 0, y: 0 }, { x: 0, y: -1 }, 20, 20)).toBe(true);
    expect(willCollideWithWall({ x: 0, y: 19 }, { x: 0, y: 1 }, 20, 20)).toBe(true);
    expect(willCollideWithWall({ x: 1, y: 1 }, { x: 1, y: 0 }, 20, 20)).toBe(false);
  });
});


