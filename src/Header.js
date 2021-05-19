import React from 'react';
import { Header as SemHeader } from 'semantic-ui-react';
import { useColors } from './hooks/useColors';

export const Header = ({ children }) => {
  const { color } = useColors();

  return (
    <SemHeader size="medium" as="legend" textAlign="center" style={{ color }}>
      {children}
    </SemHeader>
  );
};
