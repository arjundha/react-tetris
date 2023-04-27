/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import { useState, useCallback } from 'react';

import { TETROMINOS, generateRandomTetromino } from '../tetrominos';
import { STAGE_WIDTH, checkCollision } from '../gameHelpers';

/* 
  A player in this game is considered to be the active tetromino that is falling
*/

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOS[0].shape,
    collided: false,
  });

  const updatePlayerPos = ({ x, y, collided }) => {
    setPlayer((prev) => ({
      ...prev,
      pos: {
        x: prev.pos.x + x,
        y: prev.pos.y + y,
      },
      collided,
    }));
  };

  const rotate = (tetromino, dir) => {
    // Rotate the tetromino by transposing the rows to columns
    const rotatedTetromino = tetromino.map((_, index) =>
      tetromino.map((col) => col[index])
    );

    // Reverse each row if rotating clockwise
    if (dir > 0) {
      return rotatedTetromino.map((row) => row.reverse());
    }

    // Reverse each column if rotating counter-clockwise
    return rotatedTetromino.reverse();
  };

  const rotatePlayer = (stage, direction) => {
    // Need to deep clone the player object to avoid mutating the state
    const clonedTetromino = JSON.parse(JSON.stringify(player));
    clonedTetromino.tetromino = rotate(clonedTetromino.tetromino, direction);

    const position = clonedTetromino.pos.x;
    let offset = 1;
    while (checkCollision(clonedTetromino, stage, { x: 0, y: 0 })) {
      // Try moving the tetromino to the right
      clonedTetromino.pos.x += offset;

      // If moving to the right causes a collision, then move to the left
      offset = -(offset + (offset > 0 ? 1 : -1));

      // If we cannot rotate at all in either direction, then do not rotate
      if (offset > clonedTetromino.tetromino[0].length) {
        // Rotate the tetromino back to its original position
        rotate(clonedTetromino.tetromino, -direction);
        clonedTetromino.pos.x = position;
        return;
      }
    }

    setPlayer(clonedTetromino);
  };

  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      tetromino: generateRandomTetromino().shape,
      collided: false,
    });
  }, []);

  return [player, updatePlayerPos, resetPlayer, rotatePlayer];
};

export default usePlayer;
