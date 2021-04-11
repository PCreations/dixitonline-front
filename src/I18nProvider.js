import React, { useState, useCallback } from 'react';
import { I18nTranslateContext, I18nLanguageContext } from './I18nContext';

const catalog = new Map([
  [
    'welcome.home',
    new Map([
      ['fr', 'Bienvenue'],
      ['en', 'Welcome'],
      ['de', 'Herzlich Willkommen'],
    ]),
  ],
  [
    'lobby-infos.no-waiting-games',
    new Map([
      ['fr', 'Aucune partie en attente de joueurs'],
      ['en', 'No games waiting for players'],
      ['de', 'Keine Spiele warten auf Spieler'],
    ]),
  ],
  [
    'lobby-infos.no-connected-players',
    new Map([
      ['fr', 'Aucun joueur prêt à jouer'],
      ['en', 'No players ready to play'],
      ['de', 'Kein Spieler bereit zu spielen'],
    ]),
  ],
  [
    'lobby-infos.game',
    new Map([
      ['fr', 'partie'],
      ['en', 'game'],
      ['de', 'Spiel'],
    ]),
  ],
  [
    'lobby-infos.waiting-players',
    new Map([
      ['fr', 'en attente de joueurs'],
      ['en', 'waiting for players'],
      ['de', 'Warten auf Spieler'],
    ]),
  ],
  [
    'lobby-infos.connected-player',
    new Map([
      ['fr', 'joueur connecté'],
      ['en', 'player connected'],
      ['de', 'verbundener Spieler'],
    ]),
  ],
  [
    'lobby-infos.connected-players',
    new Map([
      ['fr', 'joueurs connectés'],
      ['en', 'connected players'],
      ['de', 'verbundene Spieler'],
    ]),
  ],
  [
    'lobby-infos.games',
    new Map([
      ['fr', 'parties'],
      ['en', 'games'],
      ['de', 'Spiele'],
    ]),
  ],
  [
    'lobby-infos.no-players-connected',
    new Map([
      ['fr', 'Aucun joueur prêt à jouer'],
      ['en', 'No players ready to play'],
      ['de', 'Kein Spieler bereit zu spielen'],
    ]),
  ],
  [
    'game-configuration.ending-condition',
    new Map([
      ['fr', 'Condition de fin de partie'],
      ['en', 'End of game condition'],
      ['de', 'Spielende Bedingung'],
    ]),
  ],
  [
    'game-configuration.value-label',
    new Map([
      ['fr', 'Valeur'],
      ['en', 'Value'],
      ['de', 'Wert'],
    ]),
  ],
  [
    'game-configuration.default',
    new Map([
      ['fr', 'Par défaut'],
      ['en', 'Default'],
      ['de', 'Standardmäßig'],
    ]),
  ],
  [
    'game-configuration.x-times-storyteller',
    new Map([
      ['fr', 'Nombre de fois conteur'],
      ['en', 'Number of times being storyteller'],
      ['de', 'Häufigkeit, Geschichtenerzähler zu sein'],
    ]),
  ],
  [
    'game-configuration.points-limit',
    new Map([
      ['fr', 'Limite de points'],
      ['en', 'Points limit'],
      ['de', 'Punktbegrenzung'],
    ]),
  ],
  [
    'game-configuration.value-error',
    new Map([
      ['fr', 'La valeur doit être supérieure à zéro'],
      ['en', 'The value must be superior to zero'],
      ['de', 'Der Wert muss größer als Null sein'],
    ]),
  ],
  [
    'game-choice.play-now',
    new Map([
      ['fr', 'JOUER !'],
      ['en', 'PLAY !'],
      ['de', 'SPIELEN !'],
    ]),
  ],
  [
    'game-choice.title',
    new Map([
      ['fr', 'Choix de partie'],
      ['en', 'Game choice'],
      ['de', 'Spielwahl'],
    ]),
  ],
  [
    'game-choice.create-new-game',
    new Map([
      ['fr', 'Créer une nouvelle partie privée'],
      ['en', 'Create a new private game'],
      ['de', 'Erstelle ein neues privates Spiel'],
    ]),
  ],
  [
    'game-choice.or',
    new Map([
      ['fr', 'ou'],
      ['en', 'or'],
      ['de', 'oder'],
    ]),
  ],
  [
    'game-choice.join-game',
    new Map([
      ['fr', 'Rejoindre une partie :'],
      ['en', 'Join a game :'],
      ['de', 'Mach mit bei einem Spiel :'],
    ]),
  ],
  [
    'game-choice.code-error-empty',
    new Map([
      ['fr', 'Le code ne peut pas être vide'],
      ['en', 'The code cannot be empty'],
      ['de', 'Der Code darf nicht leer sein'],
    ]),
  ],
  [
    'game-choice.join',
    new Map([
      ['fr', 'rejoindre'],
      ['en', 'join'],
      ['de', 'teilnehmen'],
    ]),
  ],
  [
    'footer.rights',
    new Map([
      ['fr', 'Dixit - Tous droits réservés '],
      ['en', 'Dixit - All rights reserved '],
      ['de', 'Dixit - Alle Rechte vorbehalten '],
    ]),
  ],
  [
    'footer.game-created-by',
    new Map([
      ['fr', 'Jeu original créé par Jean-Louis Roubira, illustré par Marie Cardouat.'],
      ['en', 'Original game created by Jean-Louis Roubira, illustrations by Marie Cardouat.'],
      ['de', 'Originalspiel von Jean-Louis Roubira, Illustrationen von Marie Cardouat.'],
    ]),
  ],
  [
    'footer.created-by',
    new Map([
      ['fr', 'Créé par'],
      ['en', 'Created by'],
      ['de', 'Erstellt von'],
    ]),
  ],
  [
    'game.cant-start-game',
    new Map([
      ['fr', 'Impossible de lancer la partie :('],
      ['en', "Can't start the game :("],
      ['de', 'Es ist unmöglich, das Spiel zu starten :('],
    ]),
  ],
  [
    'an-error-has-occured',
    new Map([
      ['fr', 'Une erreur est survenue :('],
      ['en', 'An error has occurred :('],
      ['de', 'Ein Fehler ist aufgetreten :('],
    ]),
  ],
  [
    'refresh-page',
    new Map([
      ['fr', 'Essayez de rafraîchir la page'],
      ['en', 'Try to refresh the page'],
      ['de', 'Versuchen Sie, die Seite zu aktualisieren'],
    ]),
  ],
  [
    'game.last-turn',
    new Map([
      ['fr', 'Dernier tour !'],
      ['en', 'Last turn !'],
      ['de', 'Letzte Windung !'],
    ]),
  ],
  [
    'game.remaining-turns',
    new Map([
      ['fr', 'Tours restants : '],
      ['en', 'Remaining turns : '],
      ['de', 'Verbleibende Spielrunden : '],
    ]),
  ],
  [
    'error.oops',
    new Map([
      ['fr', 'Oups...'],
      ['en', 'Oops...'],
      ['de', 'Hoppla...'],
    ]),
  ],
  [
    'error.punish-me',
    new Map([
      ['fr', 'Il va falloir punir le développeur...'],
      ['en', 'The developer has to be punished...'],
      ['de', 'Wir müssen den Entwickler bestrafen...'],
    ]),
  ],
  [
    'game.does-not-exist',
    new Map([
      ['fr', "Aucune partie n'existe pour ce code !"],
      ['en', 'No game was found for this code'],
      ['de', 'Für diesen Code wurde kein Spiel gefunden'],
    ]),
  ],
  [
    'game.error-not-in-game',
    new Map([
      ['fr', "Vous n'êtes pas dans cette partie"],
      ['en', "You're not in that game"],
      ['de', 'Sie sind nicht in diesem Spiel'],
    ]),
  ],
  [
    'game.error-game-full',
    new Map([
      ['fr', 'Ce jeu est déjà complet'],
      ['en', 'This game is full'],
      ['de', 'Dieses Spiel ist bereits voll'],
    ]),
  ],
  [
    'game.accessing-game',
    new Map([
      ['fr', 'Accès au jeu...'],
      ['en', 'Accessing the game...'],
      ['de', 'Zugang zum Spiel ...'],
    ]),
  ],
  [
    'game.click-if-not-redirected',
    new Map([
      ['fr', "Cliquez ici si vous n'êtes pas redirigés"],
      ['en', "Click here if you're not redirected"],
      ['de', 'Klicken Sie hier, wenn Sie nicht weitergeleitet werden'],
    ]),
  ],
  [
    'turn.waiting-for-other-players',
    new Map([
      ['fr', 'En attente des autres joueurs...'],
      ['en', 'Waiting for the other players...'],
      ['de', 'Warten auf die anderen Spieler...'],
    ]),
  ],
  [
    'turn.you-are-the-storyteller',
    new Map([
      ['fr', 'Vous êtes le conteur !'],
      ['en', 'You are the storyteller !'],
      ['de', 'Du bist der Geschichtenerzähler !'],
    ]),
  ],
  [
    'turn.waiting-for-storyteller',
    new Map([
      ['fr', 'En attente du conteur...'],
      ['en', 'Waiting for the storyteller...'],
      ['de', 'Warten auf den Geschichtenerzähler...'],
    ]),
  ],
  [
    'turn.other-players-voting',
    new Map([
      ['fr', 'Les autres joueurs sont en train de voter...'],
      ['en', 'Other players are voting...'],
      ['de', 'Andere Spieler stimmen ab...'],
    ]),
  ],
  [
    'turn.error-cant-vote-for-own-card',
    new Map([
      ['fr', 'Vous ne pouvez pas voter pour votre propre carte !'],
      ['en', "You can't vote for your own card !"],
      ['de', 'Sie können nicht für Ihre eigene Karte stimmen !'],
    ]),
  ],
  [
    'turn.cards-exposed-to-vote',
    new Map([
      ['fr', 'Cartes soumises au vote'],
      ['en', 'Exposed cards'],
      ['de', 'Karten zur Abstimmung gestellt'],
    ]),
  ],
  [
    'card.owner',
    new Map([
      ['fr', 'Carte de {$}'],
      ['en', "{$}'s card"],
      ['de', '{$} Karte'],
    ]),
  ],
  [
    'card-modal.clue',
    new Map([
      ['fr', "Définir l'indice pour cette carte"],
      ['en', 'Define a clue for this card'],
      ['de', 'Definieren Sie einen Hinweis für diese Karte'],
    ]),
  ],
  [
    'card-modal.clue-placeholder',
    new Map([
      ['fr', 'indice'],
      ['en', 'clue'],
      ['de', 'Hinweis'],
    ]),
  ],
  [
    'card-modal.validate',
    new Map([
      ['fr', 'VALIDER'],
      ['en', 'VALIDATE'],
      ['de', 'BESTÄTIGEN'],
    ]),
  ],
  [
    'card-modal.chose-card',
    new Map([
      ['fr', 'CHOISIR CETTE CARTE'],
      ['en', 'CHOSE THIS CARD'],
      ['de', 'WÄHLEN SIE DIESE KARTE'],
    ]),
  ],
  [
    'card-modal.vote-card',
    new Map([
      ['fr', 'VOTER POUR CETTE CARTE'],
      ['en', 'VOTE FOR THIS CARD'],
      ['de', 'ABSTIMMUNG FÜR DIESE KARTE'],
    ]),
  ],
  [
    'card-modal.vote-result',
    new Map([
      ['fr', 'Joueur(s) ayant voté pour cette carte :'],
      ['en', 'Players having voted for this card :'],
      ['de', 'Spieler, die für diese Karte gestimmt haben :'],
    ]),
  ],
  [
    'card-modal.no-votes',
    new Map([
      ['fr', "Personne n'a voté pour cette carte."],
      ['en', 'Nobody has voted for this card.'],
      ['de', 'Niemand hat für diese Karte gestimmt.'],
    ]),
  ],
  [
    'username.chose-username',
    new Map([
      ['fr', 'Choisissez un pseudo'],
      ['en', 'Choose a username'],
      ['de', 'Wähle ein Pseudo'],
    ]),
  ],
  [
    'username.placeholder',
    new Map([
      ['fr', 'pseudo'],
      ['en', 'username'],
      ['de', 'pseudo'],
    ]),
  ],
  [
    'username.error-cant-be-empty',
    new Map([
      ['fr', 'Le pseudo ne peut pas être vide'],
      ['en', "The username can't be empty"],
      ['de', 'Das Pseudo kann nicht leer sein'],
    ]),
  ],
  [
    'game-waiting.can-be-started',
    new Map([
      ['fr', 'Vous pouvez maintenant lancer la partie'],
      ['en', 'You can now start the game'],
      ['de', 'Sie können jetzt das Spiel starten'],
    ]),
  ],
  [
    'game-waiting.waiting-to-be-started',
    new Map([
      ['fr', 'En attente du lancement de la partie'],
      ['en', 'Waiting for the game to start'],
      ['de', 'Warten auf den Start des Spiels'],
    ]),
  ],
  [
    'game-waiting.waiting-for-players',
    new Map([
      ['fr', 'En attente de joueurs... (3 joueurs minimum, 6 maximum)'],
      ['en', 'Waiting for other players... (3 players min, 6 max)'],
      ['de', 'Warten auf andere Spieler... (3 Spieler min, 6 max)'],
    ]),
  ],
  [
    'game-waiting.start-game',
    new Map([
      ['fr', 'Lancer la partie !'],
      ['en', 'Start the game !'],
      ['de', 'Starte das Spiel !'],
    ]),
  ],
  [
    'game-ended.ranking.first',
    new Map([
      ['fr', '1er'],
      ['en', '1st'],
      ['de', '1'],
    ]),
  ],
  [
    'game-ended.ranking.other',
    new Map([
      ['fr', '{$}ème'],
      ['en', '{$}'],
      ['de', '{$}'],
    ]),
  ],
  [
    'clue.being-the-storyteller',
    new Map([
      ['fr', "Vous avez donné l'indice : "],
      ['en', 'You gave the following clue : '],
      ['de', 'Sie gaben den folgenden Hinweis : '],
    ]),
  ],
  [
    'clue.being-a-player',
    new Map([
      ['fr', "{$} a donné l'indice : "],
      ['en', '{$} gave the following clue : '],
      ['de', '{$} gab den folgenden Hinweis : '],
    ]),
  ],
  [
    'titled-card-grid.your-hand',
    new Map([
      ['fr', 'Votre main'],
      ['en', 'Your hand'],
      ['de', 'Deine Hand'],
    ]),
  ],
  [
    'titled-card-grid.chose-card',
    new Map([
      ['fr', 'Choisissez une carte'],
      ['en', 'Chose a card'],
      ['de', 'Wähle eine Karte'],
    ]),
  ],
  [
    'titled-card-grid.chose-two-cards',
    new Map([
      ['fr', 'Choisissez deux cartes'],
      ['en', 'Chose two cards'],
      ['de', 'Wähle zwei Karten'],
    ]),
  ],
  [
    'titled-card-grid.find-card',
    new Map([
      ['fr', 'Retrouvez la carte de {$}'],
      ['en', "Find {$}'s card"],
      ['de', 'Finde {$}s Karte'],
    ]),
  ],
  [
    'titled-card-grid.vote-results',
    new Map([
      ['fr', 'Résultat des votes'],
      ['en', 'Vote results'],
      ['de', 'Ergebnis der Stimmen'],
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
      ['de', 'Siehe die endgültige Rangliste'],
    ]),
  ],
]);

export const I18nProvider = ({ defaultLanguage = 'en', children }) => {
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
