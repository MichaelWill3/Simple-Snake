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


