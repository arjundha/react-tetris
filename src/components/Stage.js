import React from 'react';

import Cell from './Cell';

const Stage = ({ stage }) => (
  <div>
    {/* Map through each row cell of each row in the stage array */}
    {stage.map(row => row.map((cell)  => <Cell type={cell[0]} />))}
  </div>
);

Stage.propTypes = {
  stage: Array.isRequired,
};

export default Stage;
