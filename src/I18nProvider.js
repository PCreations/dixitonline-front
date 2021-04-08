import React, { useState, useCallback } from 'react';
import { I18nTranslateContext, I18nLanguageContext } from './I18nContext';

const catalog = new Map([
  [
    'welcome.home',
    new Map([
      ['fr', 'Bienvenue'],
      ['en', 'Welcome'],
    ]),
  ],
  [
    'lobby-infos.no-waiting-games',
    new Map([
      ['fr', 'Aucune partie en attente de joueurs'],
      ['en', 'No games waiting for players'],
    ]),
  ],
  [
    'lobby-infos.no-connected-players',
    new Map([
      ['fr', 'Aucun joueur connecté'],
      ['en', 'No connected players'],
    ]),
  ],
  [
    'lobby-infos.game',
    new Map([
      ['fr', 'partie'],
      ['en', 'game'],
    ]),
  ],
  [
    'lobby-infos.waiting-players',
    new Map([
      ['fr', 'en attente de joueurs'],
      ['en', 'waiting for players'],
    ]),
  ],
  [
    'lobby-infos.connected-player',
    new Map([
      ['fr', 'joueur connecté'],
      ['en', 'connected player'],
    ]),
  ],
  [
    'lobby-infos.connected-players',
    new Map([
      ['fr', 'joueurs connectés'],
      ['en', 'connected players'],
    ]),
  ],
  [
    'lobby-infos.games',
    new Map([
      ['fr', 'parties'],
      ['en', 'games'],
    ]),
  ],
  [
    'lobby-infos.no-players-connected',
    new Map([
      ['fr', 'Aucun joueur connecté'],
      ['en', 'No players connected'],
    ]),
  ],
  [
    'game-configuration.ending-condition',
    new Map([
      ['fr', 'Condition de fin de partie'],
      ['en', 'End of game condition'],
    ]),
  ],
  [
    'game-configuration.value-label',
    new Map([
      ['fr', 'Valeur'],
      ['en', 'Value'],
    ]),
  ],
  [
    'game-configuration.default',
    new Map([
      ['fr', 'Par défaut'],
      ['en', 'Default'],
    ]),
  ],
  [
    'game-configuration.x-times-storyteller',
    new Map([
      ['fr', 'Nombre de fois conteur'],
      ['en', 'Number of times being storyteller'],
    ]),
  ],
  [
    'game-configuration.points-limit',
    new Map([
      ['fr', 'Limite de points'],
      ['en', 'Points limit'],
    ]),
  ],
  [
    'game-configuration.value-error',
    new Map([
      ['fr', 'La valeur doit être supérieure à zéro'],
      ['en', 'The value must be superior to zero'],
    ]),
  ],
  [
    'game-choice.title',
    new Map([
      ['fr', 'Choix de partie'],
      ['en', 'Game choice'],
    ]),
  ],
  [
    'game-choice.create-new-game',
    new Map([
      ['fr', 'Créer une nouvelle partie'],
      ['en', 'Create new game'],
    ]),
  ],
  [
    'game-choice.or',
    new Map([
      ['fr', 'ou'],
      ['en', 'or'],
    ]),
  ],
  [
    'game-choice.join-game',
    new Map([
      ['fr', 'Rejoindre une partie :'],
      ['en', 'Join a game :'],
    ]),
  ],
  [
    'game-choice.code-error-empty',
    new Map([
      ['fr', 'Le code ne peut pas être vide'],
      ['en', 'The code cannot be empty'],
    ]),
  ],
  [
    'game-choice.join',
    new Map([
      ['fr', 'rejoindre'],
      ['en', 'join'],
    ]),
  ],
  [
    'game-choice.discord',
    new Map([
      ['fr', 'Trouvez des parties en attente de joueurs grâce à Discord !'],
      ['en', 'Find other players on Discord !'],
    ]),
  ],
  [
    'footer.rights',
    new Map([
      ['fr', 'Dixit - Tous droits réservés '],
      ['en', 'Dixit - All rights reserved '],
    ]),
  ],
  [
    'footer.game-created-by',
    new Map([
      ['fr', 'Jeu original créé par Jean-Louis Roubira, illustré par Marie Cardouat.'],
      ['en', 'Original game created by Jean-Louis Roubira, illustrations by Marie Cardouat.'],
    ]),
  ],
  [
    'footer.created-by',
    new Map([
      ['fr', 'Créé par'],
      ['en', 'Created by'],
    ]),
  ],
  [
    'game.cant-start-game',
    new Map([
      ['fr', 'Impossible de lancer la partie :('],
      ['en', "Can' start the game :("],
    ]),
  ],
  [
    'an-error-has-occured',
    new Map([
      ['fr', 'Une erreur est survenue :('],
      ['en', 'An error has occured :('],
    ]),
  ],
  [
    'refresh-page',
    new Map([
      ['fr', 'Essayez de rafraîchir la page'],
      ['en', 'Try to refresh the page'],
    ]),
  ],
  [
    'game.last-turn',
    new Map([
      ['fr', 'Dernier tour !'],
      ['en', 'Last turn !'],
    ]),
  ],
  [
    'game.remaining-turns',
    new Map([
      ['fr', 'Tours restants : '],
      ['en', 'Remaining turns : '],
    ]),
  ],
  [
    'error.oops',
    new Map([
      ['fr', 'Oups...'],
      ['en', 'Oops...'],
    ]),
  ],
  [
    'error.punish-me',
    new Map([
      ['fr', 'Il va falloir punir le développeur...'],
      ['en', 'The developer has to be punished...'],
    ]),
  ],
  [
    'game.does-not-exist',
    new Map([
      ['fr', "Aucune partie n'existe pour ce code !"],
      ['en', 'No game found for this code'],
    ]),
  ],
  [
    'game.error-not-in-game',
    new Map([
      ['fr', "Vous n'êtes pas dans cette partie"],
      ['en', "You're not in that game"],
    ]),
  ],
  [
    'game.error-game-full',
    new Map([
      ['fr', 'Ce jeu est déjà complet'],
      ['en', 'This game is full'],
    ]),
  ],
  [
    'game.accessing-game',
    new Map([
      ['fr', 'Accès au jeu...'],
      ['en', 'This game is full'],
    ]),
  ],
  [
    'game.click-if-not-redirected',
    new Map([
      ['fr', "Cliquez ici si vous n'êtes pas redirigé"],
      ['en', "Click here if you're not redirected"],
    ]),
  ],
  [
    'turn.waiting-for-other-players',
    new Map([
      ['fr', 'En attente des autres joueurs...'],
      ['en', 'Waiting for other players...'],
    ]),
  ],
  [
    'turn.you-are-the-storyteller',
    new Map([
      ['fr', 'Vous êtes le conteur !'],
      ['en', 'You are the storyteller'],
    ]),
  ],
  [
    'turn.waiting-for-storyteller',
    new Map([
      ['fr', 'En attente du conteur...'],
      ['en', 'Waiting for the storyteller...'],
    ]),
  ],
  [
    'turn.other-players-voting',
    new Map([
      ['fr', 'Les autres joueurs sont en train de voter...'],
      ['en', 'Other players are voting...'],
    ]),
  ],
  [
    'turn.error-cant-vote-for-own-card',
    new Map([
      ['fr', 'Vous ne pouvez pas voter pour votre propre carte !'],
      ['en', "You can't vote for your own card"],
    ]),
  ],
  [
    'turn.cards-exposed-to-vote',
    new Map([
      ['fr', 'Cartes soumises au vote'],
      ['en', 'Exposed cards'],
    ]),
  ],
  [
    'card.owner',
    new Map([
      ['fr', 'Carte de {$}'],
      ['en', "{$}'s card"],
    ]),
  ],
  [
    'card-modal.clue',
    new Map([
      ['fr', "Définir l'indice pour cette carte"],
      ['en', 'Define a clue for this card'],
    ]),
  ],
  [
    'card-modal.clue-placeholder',
    new Map([
      ['fr', 'indice'],
      ['en', 'clue'],
    ]),
  ],
  [
    'card-modal.validate',
    new Map([
      ['fr', 'VALIDER'],
      ['en', 'VALIDATE'],
    ]),
  ],
  [
    'card-modal.chose-card',
    new Map([
      ['fr', 'CHOISIR CETTE CARTE'],
      ['en', 'CHOSE THIS CARD'],
    ]),
  ],
  [
    'card-modal.vote-card',
    new Map([
      ['fr', 'VOTER POUR CETTE CARTE'],
      ['en', 'VOTE FOR THIS CARD'],
    ]),
  ],
  [
    'card-modal.vote-result',
    new Map([
      ['fr', 'Joueur(s) ayant voté pour cette carte :'],
      ['en', 'Players having voted for this card :'],
    ]),
  ],
  [
    'card-modal.no-votes',
    new Map([
      ['fr', "Personne n'a voté pour cette carte."],
      ['en', 'Nobody has voted for this card.'],
    ]),
  ],
  [
    'username.chose-username',
    new Map([
      ['fr', 'Choisissez un pseudo'],
      ['en', 'Choose a username'],
    ]),
  ],
  [
    'username.placeholder',
    new Map([
      ['fr', 'pseudo'],
      ['en', 'username'],
    ]),
  ],
  [
    'username.error-cant-be-empty',
    new Map([
      ['fr', 'Le pseudo ne peut pas être vide'],
      ['en', "The username can't be empty"],
    ]),
  ],
  [
    'game-waiting.can-be-started',
    new Map([
      ['fr', 'Vous pouvez maintenant lancer la partie'],
      ['en', "The username can't be empty"],
    ]),
  ],
  [
    'game-waiting.waiting-to-be-started',
    new Map([
      ['fr', 'En attente du lancement de la partie'],
      ['en', 'Waiting for the game to be started'],
    ]),
  ],
  [
    'game-waiting.waiting-for-players',
    new Map([
      ['fr', 'En attente de joueurs... (3 joueurs minimum, 6 maximum)'],
      ['en', 'Waiting for other players... (3 players min, 6 max)'],
    ]),
  ],
  [
    'game-waiting.start-game',
    new Map([
      ['fr', 'Lancer la partie !'],
      ['en', 'Start the game !'],
    ]),
  ],
  [
    'game-ended.ranking.first',
    new Map([
      ['fr', '1er'],
      ['en', '1st'],
    ]),
  ],
  [
    'game-ended.ranking.other',
    new Map([
      ['fr', '{$}ème'],
      ['en', '{$}'],
    ]),
  ],
  [
    'clue.being-the-storyteller',
    new Map([
      ['fr', "Vous avez donné l'indice : "],
      ['en', 'You gave the following clue : '],
    ]),
  ],
  [
    'clue.being-a-player',
    new Map([
      ['fr', "{$} a donné l'indice : "],
      ['en', '{$} gave the following clue : '],
    ]),
  ],
  [
    'titled-card-grid.your-hand',
    new Map([
      ['fr', 'Votre main'],
      ['en', 'Your hand'],
    ]),
  ],
  [
    'titled-card-grid.chose-card',
    new Map([
      ['fr', 'Choisissez une carte'],
      ['en', 'Chose a card'],
    ]),
  ],
  [
    'titled-card-grid.chose-two-cards',
    new Map([
      ['fr', 'Choisissez deux cartes'],
      ['en', 'Chose two cards'],
    ]),
  ],
  [
    'titled-card-grid.find-card',
    new Map([
      ['fr', 'Retrouvez la carte de {$}'],
      ['en', "Find {$}'s card"],
    ]),
  ],
  [
    'titled-card-grid.vote-results',
    new Map([
      ['fr', 'Résultat des votes'],
      ['en', 'Vote results'],
    ]),
  ],
  [
    'titled-card-grid.see-leaderboard',
    new Map([
      ['fr', 'Voir le classement final !'],
      ['en', 'See the leaderboard !'],
    ]),
  ],
  [
    'titled-card-grid.go-to-next-turn',
    new Map([
      ['fr', 'Passer au prochain tour'],
      ['en', 'Go to next turn'],
    ]),
  ],
]);

export const I18nProvider = ({ defaultLanguage = 'fr', children }) => {
  const [language, setLanguage] = useState(defaultLanguage);
  const t = useCallback(
    (name, param = '') => {
      if (!catalog.has(name)) {
        console.error(`${name} not found in catalog`);
        return name;
      }
      if (!catalog.get(name).has(language)) {
        console.error(`${language} not found in catalog for ${name}`);
        return name;
      }
      return catalog.get(name).get(language).replace('{$}', param);
    },
    [language]
  );

  return (
    <I18nTranslateContext.Provider value={t}>
      <I18nLanguageContext.Provider value={{ language, setLanguage }}>{children}</I18nLanguageContext.Provider>
    </I18nTranslateContext.Provider>
  );
};
