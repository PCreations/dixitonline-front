import React from 'react';
import PropTypes from 'prop-types';
import { Button as BaseButton } from 'semantic-ui-react';

export const Button = ({ primary, children, onClick, style } = {}) => (
  <BaseButton primary={primary} onClick={onClick} style={style}>
    {children}
  </BaseButton>
);

Button.propTypes = {
  primary: PropTypes.bool,
  children: PropTypes.string.isRequired,
};
