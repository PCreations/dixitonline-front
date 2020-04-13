import React from 'react';
import { GameEnded } from '../GameEnded';

export default { title: 'GameEnded' };

const players = [
  {
    username: 'Anthow',
    score: 10,
  },
  {
    username: 'Mike',
    score: 5,
  },
  {
    username: 'Jaz',
    score: 14,
  },
  {
    username: 'Pierre',
    score: 12,
  },
  {
    username: 'Noyo',
    score: 8,
  },
  {
    username: 'Yoyo',
    score: 7,
  },
];

export const score = () => <GameEnded players={players} />;
