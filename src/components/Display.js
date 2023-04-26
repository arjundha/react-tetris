import React from 'react';
import PropTypes from 'prop-types';

// Styled Components
import { StyledDisplay } from './styles/StyledDisplay';

const Display = ({ gameOver, text }) => (
  <StyledDisplay gameOver={gameOver}>{text}</StyledDisplay>
);

Display.propTypes = {
  gameOver: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
};

export default Display;
