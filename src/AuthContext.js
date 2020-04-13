import React from 'react';

export const AuthStateContext = React.createContext({ isAuthenticated: false });
export const AuthSetStateContext = React.createContext(() => {});
