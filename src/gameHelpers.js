// Constants for Stage size
export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

// Stage Creation
export const createStage = () => 
    Array.from(Array(STAGE_HEIGHT), () => 
        new Array(STAGE_WIDTH).fill([0, 'clear']) // Fill each element with an array that represents true emptiness (no specific block, and no block at all)
    )
