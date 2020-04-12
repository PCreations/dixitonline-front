import React from 'react';
import { Input } from '../Input';

export default { title: 'Input' };

export const withPlaceholder = () => <Input placeholder="pseudo"></Input>;

export const inError = () => <Input error placeholder="pseudo"></Input>;
