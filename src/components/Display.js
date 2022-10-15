import React from 'react';
import PropTypes from 'prop-types';

const Display = ({ text }) => <div>{text}</div>;

Display.propTypes = {
  text: PropTypes.string,
};

Display.defaultProps = {
  text: '',
};

export default Display;
