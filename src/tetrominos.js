// Ideally this would have been an enum if I were using TypeScript
const TetrominoColours = {
    0: '0, 0, 0',
    I: '80, 227, 230',
    J: '36, 95, 223',
    L: '223, 173, 36',
    O: '223, 217, 36',
    S: '48, 211, 56',
    T: '132, 61, 198',
    Z: '227, 78, 78'
}

// Map of all the possible tetrominos (including the clean cell)
// Shape is a 2D array of the tetromino
// Colour is the colour of the tetromino
export const TETROMINOS = {
    0: { shape: [[0]], colour: TetrominoColours[0] }, // Clean cell,
    I: {
        shape: [
                [0, 'I', 0, 0],
                [0, 'I', 0, 0],
                [0, 'I', 0, 0],
                [0, 'I', 0, 0]
            ],
        colour: TetrominoColours.I
    },
    J: {
        shape: [
                [0, 'J', 0],
                [0, 'J', 0],
                ['J', 'J', 0]
            ],
        colour: TetrominoColours.J
    },
    L: {
        shape: [
                [0, 'L', 0],
                [0, 'L', 0],
                [0, 'L', 'L']
            ],
        colour: TetrominoColours.L
    },
    O: {
        shape: [
                ['O', 'O'],
                ['O', 'O']
            ],
        colour: TetrominoColours.O
    },
    S: {
        shape: [
                [0, 'S', 'S'],
                ['S', 'S', 0],
                [0, 0, 0]
            ],
        colour: TetrominoColours.S
    },
    T: {
        shape: [
                [0, 0, 0],
                ['T', 'T','T'],
                [0, 'T', 0]
            ],
        colour: TetrominoColours.T
    },
    Z: {
        shape: [
                ['Z', 'Z', 0],
                [0, 'Z','Z'],
                [0, 0, 0]
            ],
        colour: TetrominoColours.Z
    }
}

export const generateRandomTetromino = () => {
    const tetrominos = 'IJLOSTZ';
    const randomTetromino = tetrominos[Math.floor(Math.random() * tetrominos.length)];
    return TETROMINOS[randomTetromino];
}