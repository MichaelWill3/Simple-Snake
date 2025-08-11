export function spawnFood(gridWidth, gridHeight, occupiedCells) {
  const totalCells = gridWidth * gridHeight;
  if (occupiedCells.size >= totalCells) {
    throw new Error('No empty cells available');
  }

  const emptyCells = [];
  for (let y = 0; y < gridHeight; y++) {
    for (let x = 0; x < gridWidth; x++) {
      const key = `${x},${y}`;
      if (!occupiedCells.has(key)) {
        emptyCells.push({ x, y });
      }
    }
  }

  const index = Math.floor(Math.random() * emptyCells.length);
  return emptyCells[index];
}

export function cellsEqual(a, b) {
  return a != null && b != null && a.x === b.x && a.y === b.y;
}

export function checkAndHandleEat(headCell, foodCell, gridWidth, gridHeight, occupiedCells) {
  const didEat = cellsEqual(headCell, foodCell);
  if (!didEat) {
    return { didEat: false, nextFood: foodCell, growth: 0 };
  }
  const nextFood = spawnFood(gridWidth, gridHeight, occupiedCells);
  return { didEat: true, nextFood, growth: 1 };
}


