import React from 'react';

const StartButton = ({ callback }) => <div>Start Game {callback}</div>;

StartButton.propTypes = {
  callback: String,
};

StartButton.defaultProps = {
  callback: undefined,
};
export default StartButton;
