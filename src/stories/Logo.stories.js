import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Logo } from '../Logo';

export default { title: 'Logo' };

export const logo = () => (
  <MemoryRouter>
    <Logo />
  </MemoryRouter>
);
