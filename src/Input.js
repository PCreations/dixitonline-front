import React from 'react';
import PropTypes from 'prop-types';
import { Input as BaseInput } from 'semantic-ui-react';

export const Input = ({ placeholder, onChange, error = false, style, size } = {}) => (
  <BaseInput placeholder={placeholder} onChange={onChange} error={error} style={style} size={size} />
);

Input.propTypes = {
  placeholder: PropTypes.string.isRequired,
  error: PropTypes.bool,
};
