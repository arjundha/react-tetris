import React from 'react';
import PropTypes from 'prop-types';

// Styled Components
import { StyledStartButton } from './styles/StyledStartButton';

const StartButton = ({ callback }) => (
  <StyledStartButton onClick={callback}>
    Start Game {callback}
  </StyledStartButton>
);

StartButton.propTypes = {
  callback: PropTypes.func.isRequired,
};

export default StartButton;
