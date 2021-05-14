import React, { useState, useCallback } from 'react';
import { I18nTranslateContext, I18nLanguageContext } from './I18nContext';

const catalog = new Map([
  [
    'info.update',
    new Map([
      ['fr', '🙌 Mise à jour ! 🙌'],
      ['en', '🙌 New update ! 🙌'],
      ['de', '🙌 Neues Update ! 🙌'],
      ['it', '🙌 Nuovo aggiornamento ! 🙌'],
    ]),
  ],
  [
    'info.message',
    new Map([
      ['fr', "Vous pouvez maintenant jouer jusqu'à 8 joueurs ! Et 75+ cartes ont été ajoutées 💪"],
      ['en', 'You can now play up to 8 players ! And enjoy 75+ new cards 💪'],
      ['de', 'Sie können jetzt bis zu 8 Spieler spielen ! Und genießen Sie mehr als 75+ neue Karten 💪'],
      ['it', 'Ora puoi giocare fino a 8 giocatori ! E goditi più di 75+ nuove carte 💪'],
    ]),
  ],
  [
    'welcome.home',
    new Map([
      ['fr', 'Bienvenue'],
      ['en', 'Welcome'],
      ['de', 'Herzlich Willkommen'],
      ['it', 'Benvenuto'],
    ]),
  ],
  [
    'lobby-infos.no-waiting-games',
    new Map([
      ['fr', 'Aucune partie en attente de joueurs'],
      ['en', 'No games waiting for players'],
      ['de', 'Keine Spiele warten auf Spieler'],
      ['it', 'No partita aspettando giocatori'],
    ]),
  ],
  [
    'lobby-infos.no-connected-players',
    new Map([
      ['fr', 'Aucun joueur prêt à jouer'],
      ['en', 'No players ready to play'],
      ['de', 'Kein Spieler bereit zu spielen'],
      ['it', 'No giocatore pronto a giocare'],
    ]),
  ],
  [
    'lobby-infos.game',
    new Map([
      ['fr', 'partie'],
      ['en', 'game'],
      ['de', 'Spiel'],
      ['it', 'Partita'],
    ]),
  ],
  [
    'lobby-infos.waiting-players',
    new Map([
      ['fr', 'en attente de joueurs'],
      ['en', 'waiting for players'],
      ['de', 'Warten auf Spieler'],
      ['it', 'Aspettando giocatori'],
    ]),
  ],
  [
    'lobby-infos.connected-player',
    new Map([
      ['fr', 'joueur prêt à jouer'],
      ['en', 'player ready to play'],
      ['de', 'Spieler spielbereit'],
      ['it', 'Giocatore pronto a giocare'],
    ]),
  ],
  [
    'lobby-infos.connected-players',
    new Map([
      ['fr', 'joueurs prêts à jouer'],
      ['en', 'players ready to play'],
      ['de', 'spielbereite Spieler'],
      ['it', 'Giocatori pronto a giocare'],
    ]),
  ],
  [
    'lobby-infos.games',
    new Map([
      ['fr', 'parties'],
      ['en', 'games'],
      ['de', 'Spiele'],
      ['it', 'Partite'],
    ]),
  ],
  [
    'lobby-infos.no-players-connected',
    new Map([
      ['fr', 'Aucun joueur prêt à jouer'],
      ['en', 'No players ready to play'],
      ['de', 'Kein Spieler bereit zu spielen'],
      ['it', 'No giocatore pronto a giocare'],
    ]),
  ],
  [
    'game-configuration.ending-condition',
    new Map([
      ['fr', 'Condition de fin de partie'],
      ['en', 'End of game condition'],
      ['de', 'Spielende Bedingung'],
      ['it', 'Condizioni di fine della partita'],
    ]),
  ],
  [
    'game-configuration.value-label',
    new Map([
      ['fr', 'Valeur'],
      ['en', 'Value'],
      ['de', 'Wert'],
      ['it', 'Valore'],
    ]),
  ],
  [
    'game-configuration.default',
    new Map([
      ['fr', 'Par défaut'],
      ['en', 'Default'],
      ['de', 'Standardmäßig'],
      ['it', 'Di default'],
    ]),
  ],
  [
    'game-configuration.x-times-storyteller',
    new Map([
      ['fr', 'Nombre de fois conteur'],
      ['en', 'Number of times being storyteller'],
      ['de', 'Häufigkeit, Geschichtenerzähler zu sein'],
      ['it', 'Numero di volte Narratore'],
    ]),
  ],
  [
    'game-configuration.points-limit',
    new Map([
      ['fr', 'Limite de points'],
      ['en', 'Points limit'],
      ['de', 'Punktbegrenzung'],
      ['it', 'Punteggio limite'],
    ]),
  ],
  [
    'game-configuration.value-error',
    new Map([
      ['fr', 'La valeur doit être supérieure à zéro'],
      ['en', 'The value must be superior to zero'],
      ['de', 'Der Wert muss größer als Null sein'],
      ['it', 'Il valore deve essere maggiore di zero'],
    ]),
  ],
  [
    'game-choice.play-now',
    new Map([
      ['fr', 'JOUER !'],
      ['en', 'PLAY!'],
      ['de', 'SPIELEN!'],
      ['it', 'GIOCARE!'],
    ]),
  ],
  [
    'game-choice.title',
    new Map([
      ['fr', 'Choix de partie'],
      ['en', 'Game choice'],
      ['de', 'Spielwahl'],
      ['it', 'Scelta di partita'],
    ]),
  ],
  [
    'game-choice.create-new-game',
    new Map([
      ['fr', 'Créer une nouvelle partie privée'],
      ['en', 'Create a new private game'],
      ['de', 'Erstelle ein neues privates Spiel'],
      ['it', 'Creare una nuova partita'],
    ]),
  ],
  [
    'game-choice.or',
    new Map([
      ['fr', 'ou'],
      ['en', 'or'],
      ['de', 'oder'],
      ['it', 'o'],
    ]),
  ],
  [
    'game-choice.join-game',
    new Map([
      ['fr', 'Rejoindre une partie :'],
      ['en', 'Join a game :'],
      ['de', 'Mach mit bei einem Spiel :'],
      ['it', 'Unirsi una partita'],
    ]),
  ],
  [
    'game-choice.code-error-empty',
    new Map([
      ['fr', 'Le code ne peut pas être vide'],
      ['en', 'The code cannot be empty'],
      ['de', 'Der Code darf nicht leer sein'],
      ['it', 'Il codice non puo essere vuoto'],
    ]),
  ],
  [
    'game-choice.join',
    new Map([
      ['fr', 'rejoindre'],
      ['en', 'join'],
      ['de', 'teilnehmen'],
      ['it', 'Unirsi'],
    ]),
  ],
  [
    'footer.created-by',
    new Map([
      ['fr', 'Créé par'],
      ['en', 'Created by'],
      ['de', 'Erstellt von'],
      ['it', 'Creato per'],
    ]),
  ],
  [
    'footer.dixit-world-coming',
    new Map([
      ['fr', 'le jeu officiel, arrive bientôt !'],
      ['en', 'the official game, is coming soon !'],
      ['de', 'Das offizielle Spiel, kommt bald'],
      ['it', 'il gioco ufficiale, arriverà presto'],
    ]),
  ],
  [
    'footer.dixit-world-register-beta',
    new Map([
      ['fr', 'Inscrivez-vous pour la beta'],
      ['en', 'Register for the beta'],
      ['de', 'Registrieren Sie sich für die Beta'],
      ['it', 'Registrati per la beta'],
    ]),
  ],
  [
    'game.cant-start-game',
    new Map([
      ['fr', 'Impossible de lancer la partie :('],
      ['en', "Can't start the game :("],
      ['de', 'Es ist unmöglich, das Spiel zu starten :('],
      ['it', 'Impossibile avviare la partita'],
    ]),
  ],
  [
    'an-error-has-occured',
    new Map([
      ['fr', 'Une erreur est survenue :('],
      ['en', 'An error has occurred :('],
      ['de', 'Ein Fehler ist aufgetreten :('],
      ['it', 'E verificato un errore'],
    ]),
  ],
  [
    'refresh-page',
    new Map([
      ['fr', 'Essayez de rafraîchir la page'],
      ['en', 'Try to refresh the page'],
      ['de', 'Versuchen Sie, die Seite zu aktualisieren'],
      ['it', 'Provate a aggiornare la pagina'],
    ]),
  ],
  [
    'game.last-turn',
    new Map([
      ['fr', 'Dernier tour !'],
      ['en', 'Last turn!'],
      ['de', 'Letzte Windung!'],
      ['it', 'Ultimo giro'],
    ]),
  ],
  [
    'game.remaining-turns',
    new Map([
      ['fr', 'Tours restants : '],
      ['en', 'Remaining turns: '],
      ['de', 'Verbleibende Spielrunden: '],
      ['it', 'Round rimasti '],
    ]),
  ],
  [
    'error.oops',
    new Map([
      ['fr', 'Oups...'],
      ['en', 'Oops...'],
      ['de', 'Hoppla...'],
      ['it', 'Oups...'],
    ]),
  ],
  [
    'error.punish-me',
    new Map([
      ['fr', 'Il va falloir punir le développeur...'],
      ['en', 'The developer has to be punished...'],
      ['de', 'Wir müssen den Entwickler bestrafen...'],
      ['it', 'Dovremo punire il deveolper...'],
    ]),
  ],
  [
    'game.does-not-exist',
    new Map([
      ['fr', "Aucune partie n'existe pour ce code !"],
      ['en', 'No game was found for this code'],
      ['de', 'Für diesen Code wurde kein Spiel gefunden'],
      ['it', 'No partita per questo codice'],
    ]),
  ],
  [
    'game.error-not-in-game',
    new Map([
      ['fr', "Vous n'êtes pas dans cette partie"],
      ['en', "You're not in that game"],
      ['de', 'Sie sind nicht in diesem Spiel'],
      ['it', 'Non è in questa partita'],
    ]),
  ],
  [
    'game.error-game-full',
    new Map([
      ['fr', 'Ce jeu est déjà complet'],
      ['en', 'This game is full'],
      ['de', 'Dieses Spiel ist bereits voll'],
      ['it', 'Questo gioco è già pieno'],
    ]),
  ],
  [
    'game.accessing-game',
    new Map([
      ['fr', 'Accès au jeu...'],
      ['en', 'Accessing the game...'],
      ['de', 'Zugang zum Spiel ...'],
      ['it', 'Accesso al gioco'],
    ]),
  ],
  [
    'game.click-if-not-redirected',
    new Map([
      ['fr', "Cliquez ici si vous n'êtes pas redirigés"],
      ['en', "Click here if you're not redirected"],
      ['de', 'Klicken Sie hier, wenn Sie nicht weitergeleitet werden'],
      ['it', 'Fare clic qui se non è rediretta'],
    ]),
  ],
  [
    'turn.waiting-for-other-players',
    new Map([
      ['fr', 'En attente des autres joueurs...'],
      ['en', 'Waiting for the other players...'],
      ['de', 'Warten auf die anderen Spieler...'],
      ['it', 'In attesa degli altri giocatori'],
    ]),
  ],
  [
    'turn.you-are-the-storyteller',
    new Map([
      ['fr', 'Vous êtes le conteur !'],
      ['en', 'You are the storyteller!'],
      ['de', 'Du bist die Geschichtenerzähler*in!'],
      ['it', 'Lei è il narratore'],
    ]),
  ],
  [
    'turn.waiting-for-storyteller',
    new Map([
      ['fr', 'En attente du conteur...'],
      ['en', 'Waiting for the storyteller...'],
      ['de', 'Warten auf die Geschichtenerzähler*in...'],
      ['it', 'Aspettando il narratore'],
    ]),
  ],
  [
    'turn.other-players-voting',
    new Map([
      ['fr', 'Les autres joueurs sont en train de voter...'],
      ['en', 'Other players are voting...'],
      ['de', 'Andere Spieler stimmen ab...'],
      ['it', 'Gli altri giocatori stanno votando...'],
    ]),
  ],
  [
    'turn.error-cant-vote-for-own-card',
    new Map([
      ['fr', 'Vous ne pouvez pas voter pour votre propre carte !'],
      ['en', "You can't vote for your own card !"],
      ['de', 'Sie können nicht für Ihre eigene Karte stimmen !'],
      ['it', 'Non può votare per la propria carta'],
    ]),
  ],
  [
    'turn.cards-exposed-to-vote',
    new Map([
      ['fr', 'Cartes soumises au vote'],
      ['en', 'Exposed cards'],
      ['de', 'Karten zur Abstimmung gestellt'],
      ['it', 'Carte sottoposte al voto'],
    ]),
  ],
  [
    'card.owner',
    new Map([
      ['fr', 'Carte de {$}'],
      ['en', "{$}'s card"],
      ['de', '{$} Karte'],
      ['it', 'Carta di {$}'],
    ]),
  ],
  [
    'card-modal.clue',
    new Map([
      ['fr', "Définir l'indice pour cette carte"],
      ['en', 'Define a clue for this card'],
      ['de', 'Definieren Sie einen Hinweis für diese Karte'],
      ['it', 'Definire l’indizio'],
    ]),
  ],
  [
    'card-modal.clue-placeholder',
    new Map([
      ['fr', 'indice'],
      ['en', 'clue'],
      ['de', 'Hinweis'],
      ['it', 'indizio'],
    ]),
  ],
  [
    'card-modal.validate',
    new Map([
      ['fr', 'VALIDER'],
      ['en', 'VALIDATE'],
      ['de', 'BESTÄTIGEN'],
      ['it', 'CONVALIDARE'],
    ]),
  ],
  [
    'card-modal.chose-card',
    new Map([
      ['fr', 'CHOISIR CETTE CARTE'],
      ['en', 'CHOSE THIS CARD'],
      ['de', 'WÄHLEN SIE DIESE KARTE'],
      ['it', 'SCEGLIERE QUESTA CARTA'],
    ]),
  ],
  [
    'card-modal.vote-card',
    new Map([
      ['fr', 'VOTER POUR CETTE CARTE'],
      ['en', 'VOTE FOR THIS CARD'],
      ['de', 'ABSTIMMUNG FÜR DIESE KARTE'],
      ['it', 'VOTARE PER QUESTA CARTA'],
    ]),
  ],
  [
    'card-modal.vote-result',
    new Map([
      ['fr', 'Joueur(s) ayant voté pour cette carte :'],
      ['en', 'Players who voted for this card:'],
      ['de', 'Spieler, die für diese Karte gestimmt haben:'],
      ['it', 'Giocatore(i) avendo votato per questa carta:'],
    ]),
  ],
  [
    'card-modal.no-votes',
    new Map([
      ['fr', "Personne n'a voté pour cette carte."],
      ['en', 'Nobody voted for this card.'],
      ['de', 'Niemand hat für diese Karte gestimmt.'],
      ['it', 'Nessuno ha votato per questa carta'],
    ]),
  ],
  [
    'username.chose-username',
    new Map([
      ['fr', 'Choisissez un pseudo'],
      ['en', 'Choose a username'],
      ['de', 'Wähle ein Pseudo'],
      ['it', 'Scegliete un pseudonimo'],
    ]),
  ],
  [
    'username.placeholder',
    new Map([
      ['fr', 'pseudo'],
      ['en', 'username'],
      ['de', 'pseudo'],
      ['it', 'pseudonimo'],
    ]),
  ],
  [
    'username.error-cant-be-empty',
    new Map([
      ['fr', 'Le pseudo ne peut pas être vide'],
      ['en', "The username can't be empty"],
      ['de', 'Das Pseudo kann nicht leer sein'],
      ['it', 'Il pseudonimo non può essere vuoto'],
    ]),
  ],
  [
    'game-waiting.can-be-started',
    new Map([
      ['fr', 'Vous pouvez maintenant lancer la partie'],
      ['en', 'You can now start the game'],
      ['de', 'Sie können jetzt das Spiel starten'],
      ['it', 'Adesso puo avviare la partita'],
    ]),
  ],
  [
    'game-waiting.waiting-to-be-started',
    new Map([
      ['fr', 'En attente du lancement de la partie'],
      ['en', 'Waiting for the game to start'],
      ['de', 'Warten auf den Start des Spiels'],
      ['it', 'Aspettando di avviare la partita'],
    ]),
  ],
  [
    'game-waiting.waiting-for-players',
    new Map([
      ['fr', 'En attente de joueurs... (3 joueurs minimum, 8 maximum)'],
      ['en', 'Waiting for other players... (3 players min, 8 max)'],
      ['de', 'Warten auf andere Spieler... (3 Spieler min, 8 max)'],
      ['it', 'Aspettando i giocari... (3 giocatori min, 8 max)'],
    ]),
  ],
  [
    'game-waiting.start-game',
    new Map([
      ['fr', 'Lancer la partie !'],
      ['en', 'Start the game!'],
      ['de', 'Starte das Spiel!'],
      ['it', 'Avviare la partita!'],
    ]),
  ],
  [
    'game-ended.ranking.first',
    new Map([
      ['fr', '1er'],
      ['en', '1st'],
      ['de', '1'],
      ['it', '1°'],
    ]),
  ],
  [
    'game-ended.ranking.other',
    new Map([
      ['fr', '{$}ème'],
      ['en', '{$}'],
      ['de', '{$}'],
      ['it', '{$}°'],
    ]),
  ],
  [
    'game-ended.thanks',
    new Map([
      ['fr', "🎉 Merci d'avoir joué 🙌 !"],
      ['en', '🎉 Thanks for playing 🙌 !'],
      ['de', '🎉 Danke fürs Spielen 🙌 !'],
      ['it', '🎉 Grazie per aver giocato 🙌 !'],
    ]),
  ],
  [
    'game-ended.survey',
    new Map([
      ['fr', 'Des idées pour améliorer Dixit Online ? Dites-le moi ici :)'],
      ['en', 'Any ideas to improve Dixit online ? Tell me here :)'],
      ['de', 'Irgendwelche Ideen, um Dixit Online zu verbessern? Sag es mir hier :)'],
      ['it', 'Qualche idea per migliorare Dixit Online? Dimmi qui :)'],
    ]),
  ],
  [
    'clue.being-the-storyteller',
    new Map([
      ['fr', "Vous avez donné l'indice : "],
      ['en', 'You gave the following clue: '],
      ['de', 'Sie gaben den folgenden Hinweis: '],
      ['it', 'Ha dato lindizio : '],
    ]),
  ],
  [
    'clue.being-a-player',
    new Map([
      ['fr', "{$} a donné l'indice : "],
      ['en', '{$} gave the following clue : '],
      ['de', '{$} gab den folgenden Hinweis : '],
      ['it', '{$} ha dato l’indizio : '],
    ]),
  ],
  [
    'titled-card-grid.your-hand',
    new Map([
      ['fr', 'Votre main'],
      ['en', 'Your hand'],
      ['de', 'Deine Hand'],
      ['it', 'Sua mano'],
    ]),
  ],
  [
    'titled-card-grid.chose-card',
    new Map([
      ['fr', 'Choisissez une carte'],
      ['en', 'Chose a card'],
      ['de', 'Wähle eine Karte'],
      ['it', 'Scegli una carta'],
    ]),
  ],
  [
    'titled-card-grid.chose-two-cards',
    new Map([
      ['fr', 'Choisissez deux cartes'],
      ['en', 'Chose two cards'],
      ['de', 'Wähle zwei Karten'],
      ['it', 'Scegli due carte'],
    ]),
  ],
  [
    'titled-card-grid.find-card',
    new Map([
      ['fr', 'Retrouvez la carte de {$}'],
      ['en', "Find {$}'s card"],
      ['de', 'Finde {$}s Karte'],
      ['it', 'Ritrova la carta di {$}'],
    ]),
  ],
  [
    'titled-card-grid.vote-results',
    new Map([
      ['fr', 'Résultat des votes'],
      ['en', 'Vote results'],
      ['de', 'Ergebnis der Stimmen'],
      ['it', 'Risultato dei votazioni'],
    ]),
  ],
  [
    'titled-card-grid.see-leaderboard',
    new Map([
      ['fr', 'Voir le classement final !'],
      ['en', 'See the leaderboard !'],
      ['de', 'Siehe die endgültige Rangliste !'],
      ['it', 'Vedere il risultato finale'],
    ]),
  ],
  [
    'titled-card-grid.go-to-next-turn',
    new Map([
      ['fr', 'Passer au prochain tour'],
      ['en', 'Go to next turn'],
      ['de', 'Siehe die endgültige Rangliste'],
      ['it', 'Passare al prossimo giro'],
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
