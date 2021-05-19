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
  { id: '7', username: 'Anthow', isStoryteller: true, score: 3, isReady: true },
  { id: '8', username: 'Mike', isStoryteller: false, score: 1, isReady: false },
  { id: '9', username: 'Jaz', isStoryteller: false, score: 2, isReady: true },
  { id: '10', username: 'Pierre', isStoryteller: false, score: 0, isReady: true },
  { id: '11', username: 'Noyo', isStoryteller: false, score: 5, isReady: false },
  { id: '12', username: 'Yoyo', isStoryteller: false, score: 4, isReady: false },
  { id: '13', username: 'Anthow', isStoryteller: true, score: 3, isReady: true },
  { id: '14', username: 'Mike', isStoryteller: false, score: 1, isReady: false },
  { id: '15', username: 'Jaz', isStoryteller: false, score: 2, isReady: true },
  { id: '16', username: 'Pierre', isStoryteller: false, score: 0, isReady: true },
  { id: '17', username: 'Noyo', isStoryteller: false, score: 5, isReady: false },
  { id: '18', username: 'Yoyo', isStoryteller: false, score: 4, isReady: false },
  { id: '19', username: 'Anthow', isStoryteller: true, score: 3, isReady: true },
  { id: '10', username: 'Mike', isStoryteller: false, score: 1, isReady: false },
  { id: '21', username: 'Jaz', isStoryteller: false, score: 2, isReady: true },
  { id: '22', username: 'Pierre', isStoryteller: false, score: 0, isReady: true },
  { id: '23', username: 'Noyo', isStoryteller: false, score: 5, isReady: false },
  { id: '24', username: 'Yoyo', isStoryteller: false, score: 4, isReady: false },
];

export const playersAvatarAndScore = () => <PlayersPanel players={players} authenticatedPlayerId="1" />;
