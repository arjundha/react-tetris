import { useState, useEffect, useCallback } from 'react';

export const useGameStatus = (rowsCleared) => {
  const [score, setScore] = useState(0);
  const [rows, setRows] = useState(0);
  const [level, setLevel] = useState(0);

  const linePoints = [40, 100, 300, 1200];

  const calculateScore = useCallback(() => {
    if (rowsCleared > 0) {
      setScore((prev) => prev + linePoints[rowsCleared - 1] * (level + 1));
      setRows((prev) => prev + rowsCleared);
    }
  }, [level, linePoints, rowsCleared]);

  useEffect(() => {
    calculateScore();
  }, [calculateScore, rowsCleared, score]);

  return [score, setScore, rows, setRows, level, setLevel];
};

export default useGameStatus;
