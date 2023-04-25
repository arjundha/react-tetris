import React from 'react';
import { StyledStage } from './styles/StyledStage';

import Cell from './Cell';

const Stage = ({ stage }) => (
  <StyledStage width={stage[0].length} height={stage.length}>
    {/* Map through each row cell of each row in the stage array */}
    {stage.map(row => row.map((cell)  => <Cell type={cell[0]} />))}
  </StyledStage>
);

Stage.propTypes = {
  stage: Array.isRequired,
};

export default Stage;
