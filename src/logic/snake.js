export function computeNextHead(currentHead, direction) {
  return { x: currentHead.x + direction.x, y: currentHead.y + direction.y };
}

export function moveSnake(segments, direction, growth) {
  const nextHead = computeNextHead(segments[0], direction);
  const grown = [nextHead, ...segments];
  if (growth > 0) return grown;
  return grown.slice(0, segments.length);
}

export function positionsToOccupiedSet(segments) {
  const occupied = new Set();
  for (const cell of segments) occupied.add(`${cell.x},${cell.y}`);
  return occupied;
}

export function isOutOfBounds(cell, gridWidth, gridHeight) {
  return cell.x < 0 || cell.y < 0 || cell.x >= gridWidth || cell.y >= gridHeight;
}

export function willCollideWithWall(currentHead, direction, gridWidth, gridHeight) {
  const next = computeNextHead(currentHead, direction);
  return isOutOfBounds(next, gridWidth, gridHeight);
}

export function willCollideWithSelf(nextHead, segments, tailWillMove) {
  const lastIndex = segments.length - 1;
  for (let i = 0; i < segments.length; i++) {
    if (tailWillMove && i === lastIndex) continue;
    const cell = segments[i];
    if (cell.x === nextHead.x && cell.y === nextHead.y) return true;
  }
  return false;
}
