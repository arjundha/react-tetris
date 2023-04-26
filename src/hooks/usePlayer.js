import { useState } from 'react';

import { generateRandomTetromino } from '../tetrominos';

export const usePlayer = () => {
    // TODO: remove eslint override
    // eslint-disable-next-line no-unused-vars
    const [player, setPlayer] = useState({
        pos: { x: 0, y: 0 },
        tetromino: generateRandomTetromino().shape,
        collided: false
    });

    return [player];
};

export default usePlayer;