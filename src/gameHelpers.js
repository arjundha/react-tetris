// Constants for Stage size
export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

// Stage Creation
export const createStage = () =>
  Array.from(
    Array(STAGE_HEIGHT),
    () => new Array(STAGE_WIDTH).fill([0, 'clear']) // Fill each element with an array that represents true emptiness (no specific block, and not merged)
  );

// Collision Detection
export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
  // Loop through each row
  for (let y = 0; y < player.tetromino.length; y += 1) {
    for (let x = 0; x < player.tetromino[y].length; x += 1) {
      // Check that the cell is a tetromino cell, not an empty stage cell
      if (player.tetromino[y][x] !== 0) {
        const yIndex = y + player.pos.y + moveY;
        const xIndex = x + player.pos.x + moveX;

        // Going to perform three checks:
        // Check that we are within the stage height (y)
        // Check that we are not moving outside the stage width (x)
        // Check that the cell we are moving to is NOT set to clear

        if (
          !stage[yIndex] ||
          !stage[yIndex][xIndex] ||
          stage[yIndex][xIndex][1] !== 'clear'
        ) {
          console.log('collision detected');
          return true;
        }
      }
    }
  }
  // No collisions detected!
  return false;
};
