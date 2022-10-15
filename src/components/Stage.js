import React from 'react';

import Cell from './Cell';

const Stage = ({ stage }) => (
  <div>
    {stage}
    <Cell />
  </div>
);

Stage.propTypes = {
  stage: Cell,
};

Stage.defaultProps = {
  stage: undefined,
};

export default Stage;
