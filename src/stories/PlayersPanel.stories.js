import React from 'react';
import { PlayersPanel } from '../PlayersPanel';

export default { title: 'PlayersPanel' };

const players = [
  { id: '1', username: 'Anthow', isStoryteller: true, score: 3, isReady: true },
  { id: '2', username: 'Mike', isStoryteller: false, score: 1, isReady: false },
  { id: '3', username: 'Jaz', isStoryteller: false, score: 2, isReady: true },
  { id: '4', username: 'Pierre', isStoryteller: false, score: 0, isReady: true },
  { id: '5', username: 'Noyo', isStoryteller: false, score: 5, isReady: false },
  { id: '6', username: 'Yoyo', isStoryteller: false, score: 4, isReady: false },
];

export const playersAvatarAndScore = () => <PlayersPanel players={players} authenticatedPlayerId="1" />;
