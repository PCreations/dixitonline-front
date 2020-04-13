import React from 'react';
import PropTypes from 'prop-types';
import { Button as BaseButton } from 'semantic-ui-react';

export const Button = ({ primary, children, onClick, style, loading } = {}) => (
  <BaseButton primary={primary} onClick={onClick} style={style} loading={loading}>
    {children}
  </BaseButton>
);

Button.propTypes = {
  primary: PropTypes.bool,
  children: PropTypes.string.isRequired,
};
