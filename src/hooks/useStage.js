import { useState, useEffect } from 'react';
import useSound from 'use-sound';
import { createStage } from '../gameHelpers';
import clearSfx from '../sfx/clear.wav';

export const useStage = (player, resetPlayer) => {
  const [stage, setStage] = useState(createStage());
  const [rowsCleared, setRowsCleared] = useState(0);
  const [play] = useSound(clearSfx);

  useEffect(() => {
    setRowsCleared(0);

    const clearRows = (newStage) =>
      newStage.reduce((acc, row) => {
        if (row.findIndex((cell) => cell[0] === 0) === -1) {
          setRowsCleared((prev) => prev + 1);
          acc.unshift(new Array(newStage[0].length).fill([0, 'clear']));
          play();
          return acc;
        }
        acc.push(row);
        return acc;
      }, []);

    const updateStage = (prevStage) => {
      // Flush the stage
      const newStage = prevStage.map((row) =>
        row.map((cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell))
      );

      // Draw the tetromino
      player.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            newStage[y + player.pos.y][x + player.pos.x] = [
              value,
              `${player.collided ? 'merged' : 'clear'}`,
            ];
          }
        });
      });

      // Check if we have a collision
      if (player.collided) {
        resetPlayer();
        return clearRows(newStage);
      }

      return newStage;
    };

    // specifying it inside here so it doesn't need to be a dependency
    setStage((prev) => updateStage(prev));
  }, [player, resetPlayer]);

  return [stage, setStage, rowsCleared];
};

export default useStage;
