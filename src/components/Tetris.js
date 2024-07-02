/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

import useSound from 'use-sound';
import { createStage, checkCollision } from '../gameHelpers';

// Styled Components
import { StyledTetris, StyledTetrisWrapper } from './styles/StyledTetris';

// Custom Hooks
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { useGameStatus } from '../hooks/useGameStatus';
import useInterval from '../hooks/useInterval';

// Components
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

// Sound Effects
import theme from '../sfx/Tetris.mp3';

const Tetris = () => {
  // Sound Effects
  const [play, { stop, isPlaying }] = useSound(theme, { volume: 0.5 });

  // Everything else
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] =
    useGameStatus(rowsCleared);

  const movePlayer = (dir) => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };

  // Reset all values
  const startGame = () => {
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setGameOver(false);
    setScore(0);
    setRows(0);
    setLevel(0);
    stop();
    play();
    // eslint-disable-next-line no-const-assign
    isPlaying = true;
  };

  const drop = () => {
    // increase the levelwhen a player has cleared 10 rows
    if (rows > (level + 1) * 10) {
      setLevel((prev) => prev + 1);
      // and increase the drop speed from setInterval
      setDropTime(1000 / (level + 1) + 200);
    }

    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      if (player.pos.y < 1) {
        setGameOver(true);
        setDropTime(null);
        stop();
      }
      // Do NOT move the tetromino --> it has collided
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  const keyUp = ({ keyCode }) => {
    if (!gameOver) {
      // When a player releases the down key, we restasrt the droptime interval
      if (keyCode === 40 || keyCode === 83) {
        setDropTime(1000 / (level + 1) + 200);
      }
    }
  };

  const dropPlayer = () => {
    // When a player manually presses down, we need to pause the drop interval
    setDropTime(null);
    drop();
  };

  const move = ({ keyCode }) => {
    if (!gameOver) {
      // Move left (left arrow, or A)
      if (keyCode === 37 || keyCode === 65) {
        movePlayer(-1);
      }
      // Move right (right arrow, or D)
      else if (keyCode === 39 || keyCode === 68) {
        movePlayer(1);
      }
      // Move down (down arrow, or S)
      else if (keyCode === 40 || keyCode === 83) {
        dropPlayer();
      }
      // Rotate clockwise (up arrow, W, or Q)
      else if (keyCode === 38 || keyCode === 87 || keyCode === 81) {
        playerRotate(stage, 1);
      }
      // Rotate counter-clockwise (E)
      else if (keyCode === 69) {
        playerRotate(stage, 0);
      }
    }
  };

  useInterval(() => {
    drop();
  }, dropTime);

  return (
    <StyledTetrisWrapper
      role="button"
      tabIndex="0"
      onKeyDown={(e) => move(e)}
      onKeyUp={keyUp}
    >
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text="Game Over" />
          ) : (
            <div>
              <Display text={`Score: ${score}`} />
              <Display text={`Rows: ${rows}`} />
              <Display text={`Level: ${level}`} />
            </div>
          )}
          <StartButton callback={startGame} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
