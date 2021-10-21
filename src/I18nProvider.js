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
      ['es', '🙌 Nueva actualización ! 🙌'],
    ]),
  ],
  [
    'info.message',
    new Map([
      ['fr', 'Dark mode !'],
      ['en', 'Dark mode !'],
      ['de', 'Dark mode !'],
      ['it', 'Dark mode !'],
      ['es', 'Dark mode !'],
    ]),
  ],
  [
    'welcome.home',
    new Map([
      ['fr', 'Bienvenue'],
      ['en', 'Welcome'],
      ['de', 'Herzlich Willkommen'],
      ['it', 'Benvenuto'],
      ['es', 'Bienvenido'],
    ]),
  ],
  [
    'lobby-infos.no-waiting-games',
    new Map([
      ['fr', 'Aucune partie en attente de joueurs'],
      ['en', 'No games waiting for players'],
      ['de', 'Keine Spiele warten auf Spieler'],
      ['it', 'No partita aspettando giocatori'],
      ['es', 'No hay partidas esperando jugadores'],
    ]),
  ],
  [
    'lobby-infos.no-connected-players',
    new Map([
      ['fr', 'Aucun joueur prêt à jouer'],
      ['en', 'No players ready to play'],
      ['de', 'Kein Spieler bereit zu spielen'],
      ['it', 'No giocatore pronto a giocare'],
      ['es', 'No hay jugadores esperando para jugar'],
    ]),
  ],
  [
    'lobby-infos.game',
    new Map([
      ['fr', 'partie'],
      ['en', 'game'],
      ['de', 'Spiel'],
      ['it', 'Partita'],
      ['es', 'Partida'],
    ]),
  ],
  [
    'lobby-infos.waiting-players',
    new Map([
      ['fr', 'en attente de joueurs'],
      ['en', 'waiting for players'],
      ['de', 'Warten auf Spieler'],
      ['it', 'Aspettando giocatori'],
      ['es', 'Esperando jugadores'],
    ]),
  ],
  [
    'lobby-infos.connected-player',
    new Map([
      ['fr', 'joueur prêt à jouer'],
      ['en', 'player ready to play'],
      ['de', 'Spieler spielbereit'],
      ['it', 'Giocatore pronto a giocare'],
      ['es', 'Jugador listo para jugar'],
    ]),
  ],
  [
    'lobby-infos.connected-players',
    new Map([
      ['fr', 'joueurs prêts à jouer'],
      ['en', 'players ready to play'],
      ['de', 'spielbereite Spieler'],
      ['it', 'Giocatori pronto a giocare'],
      ['es', 'Jugadores listos para jugar'],
    ]),
  ],
  [
    'lobby-infos.games',
    new Map([
      ['fr', 'parties'],
      ['en', 'games'],
      ['de', 'Spiele'],
      ['it', 'Partite'],
      ['es', 'Partidas'],
    ]),
  ],
  [
    'lobby-infos.no-players-connected',
    new Map([
      ['fr', 'Aucun joueur prêt à jouer'],
      ['en', 'No players ready to play'],
      ['de', 'Kein Spieler bereit zu spielen'],
      ['it', 'No giocatore pronto a giocare'],
      ['es', 'Sin jugadores para jugar'],
    ]),
  ],
  [
    'game-configuration.ending-condition',
    new Map([
      ['fr', 'Condition de fin de partie'],
      ['en', 'End of game condition'],
      ['de', 'Spielende Bedingung'],
      ['it', 'Condizioni di fine della partita'],
      ['es', 'Condiciones para el fin de la partida'],
    ]),
  ],
  [
    'game-configuration.value-label',
    new Map([
      ['fr', 'Valeur'],
      ['en', 'Value'],
      ['de', 'Wert'],
      ['it', 'Valore'],
      ['es', 'Valor'],
    ]),
  ],
  [
    'game-configuration.default',
    new Map([
      ['fr', 'Par défaut'],
      ['en', 'Default'],
      ['de', 'Standardmäßig'],
      ['it', 'Di default'],
      ['es', 'Por defecto'],
    ]),
  ],
  [
    'game-configuration.x-times-storyteller',
    new Map([
      ['fr', 'Nombre de fois conteur'],
      ['en', 'Number of times being storyteller'],
      ['de', 'Häufigkeit, Geschichtenerzähler zu sein'],
      ['it', 'Numero di volte Narratore'],
      ['es', 'Número de veces siendo Narrador'],
    ]),
  ],
  [
    'game-configuration.points-limit',
    new Map([
      ['fr', 'Limite de points'],
      ['en', 'Points limit'],
      ['de', 'Punktbegrenzung'],
      ['it', 'Punteggio limite'],
      ['es', 'Límite de puntos'],
    ]),
  ],
  [
    'game-configuration.value-error',
    new Map([
      ['fr', 'La valeur doit être supérieure à zéro'],
      ['en', 'The value must be superior to zero'],
      ['de', 'Der Wert muss größer als Null sein'],
      ['it', 'Il valore deve essere maggiore di zero'],
      ['es', 'El valor debe ser mayor de cero'],
    ]),
  ],
  [
    'game-choice.play-now',
    new Map([
      ['fr', 'JOUER !'],
      ['en', 'PLAY!'],
      ['de', 'SPIELEN!'],
      ['it', 'GIOCARE!'],
      ['es', 'A JUGAR!'],
    ]),
  ],
  [
    'game-choice.title',
    new Map([
      ['fr', 'Choix de partie'],
      ['en', 'Game choice'],
      ['de', 'Spielwahl'],
      ['it', 'Scelta di partita'],
      ['es', 'Opciones de partida'],
    ]),
  ],
  [
    'game-choice.create-new-game',
    new Map([
      ['fr', 'Créer une nouvelle partie privée'],
      ['en', 'Create a new private game'],
      ['de', 'Erstelle ein neues privates Spiel'],
      ['it', 'Creare una nuova partita'],
      ['es', 'Crear una nueva partida'],
    ]),
  ],
  [
    'game-choice.or',
    new Map([
      ['fr', 'ou'],
      ['en', 'or'],
      ['de', 'oder'],
      ['it', 'o'],
      ['es', 'o'],
    ]),
  ],
  [
    'game-choice.join-game',
    new Map([
      ['fr', 'Rejoindre une partie :'],
      ['en', 'Join a game :'],
      ['de', 'Mach mit bei einem Spiel :'],
      ['it', 'Unirsi una partita'],
      ['es', 'Unirse a una partida'],
    ]),
  ],
  [
    'game-choice.code-error-empty',
    new Map([
      ['fr', 'Le code ne peut pas être vide'],
      ['en', 'The code cannot be empty'],
      ['de', 'Der Code darf nicht leer sein'],
      ['it', 'Il codice non puo essere vuoto'],
      ['es', 'El código no puede estar vacío'],
    ]),
  ],
  [
    'game-choice.join',
    new Map([
      ['fr', 'rejoindre'],
      ['en', 'join'],
      ['de', 'teilnehmen'],
      ['it', 'Unirsi'],
      ['es', 'Unirse'],
    ]),
  ],
  [
    'footer.created-by',
    new Map([
      ['fr', 'Créé par'],
      ['en', 'Created by'],
      ['de', 'Erstellt von'],
      ['it', 'Creato per'],
      ['es', 'Creado por'],
    ]),
  ],
  [
    'footer.dixit-world-coming',
    new Map([
      ['fr', 'le jeu officiel, arrive bientôt !'],
      ['en', 'the official game, is coming soon !'],
      ['de', 'Das offizielle Spiel, kommt bald'],
      ['it', 'il gioco ufficiale, arriverà presto'],
      ['es', 'El juego oficial llegará pronto'],
    ]),
  ],
  [
    'footer.dixit-world-register-beta',
    new Map([
      ['fr', 'Inscrivez-vous pour la beta'],
      ['en', 'Register for the beta'],
      ['de', 'Registrieren Sie sich für die Beta'],
      ['it', 'Registrati per la beta'],
      ['es', 'Regístrate para la beta'],
    ]),
  ],
  [
    'game.cant-start-game',
    new Map([
      ['fr', 'Impossible de lancer la partie :('],
      ['en', "Can't start the game :("],
      ['de', 'Es ist unmöglich, das Spiel zu starten :('],
      ['it', 'Impossibile avviare la partita'],
      ['es', 'No se puede iniciar la partida'],
    ]),
  ],
  [
    'an-error-has-occured',
    new Map([
      ['fr', 'Une erreur est survenue :('],
      ['en', 'An error has occurred :('],
      ['de', 'Ein Fehler ist aufgetreten :('],
      ['it', 'E verificato un errore :('],
      ['es', 'Ha ocurrido un error :('],
    ]),
  ],
  [
    'refresh-page',
    new Map([
      ['fr', 'Essayez de rafraîchir la page'],
      ['en', 'Try to refresh the page'],
      ['de', 'Versuchen Sie, die Seite zu aktualisieren'],
      ['it', 'Provate a aggiornare la pagina'],
      ['es', 'Trata de recargar la página'],
    ]),
  ],
  [
    'game.last-turn',
    new Map([
      ['fr', 'Dernier tour !'],
      ['en', 'Last turn!'],
      ['de', 'Letzte Windung!'],
      ['it', 'Ultimo giro'],
      ['es', 'Último turno!'],
    ]),
  ],
  [
    'game.remaining-turns',
    new Map([
      ['fr', 'Tours restants : '],
      ['en', 'Remaining turns: '],
      ['de', 'Verbleibende Spielrunden: '],
      ['it', 'Round rimasti: '],
      ['es', 'Turnos restantes: '],
    ]),
  ],
  [
    'game.restart-game',
    new Map([
      ['fr', 'Relancer la partie'],
      ['en', 'Relaunch the game'],
      ['de', 'Starten Sie das Spiel neu'],
      ['it', 'Riavvia il gioco'],
      ['es', 'Relanzar la partida'],
    ]),
  ],
  [
    'error.oops',
    new Map([
      ['fr', 'Oups...'],
      ['en', 'Oops...'],
      ['de', 'Hoppla...'],
      ['it', 'Oups...'],
      ['es', 'Ups...'],
    ]),
  ],
  [
    'error.punish-me',
    new Map([
      ['fr', 'Il va falloir punir le développeur...'],
      ['en', 'The developer has to be punished...'],
      ['de', 'Wir müssen den Entwickler bestrafen...'],
      ['it', 'Dovremo punire il deveolper...'],
      ['es', 'Vamos a castigar al desarrollador...'],
    ]),
  ],
  [
    'game.does-not-exist',
    new Map([
      ['fr', "Aucune partie n'existe pour ce code !"],
      ['en', 'No game was found for this code'],
      ['de', 'Für diesen Code wurde kein Spiel gefunden'],
      ['it', 'No partita per questo codice'],
      ['es', 'No se ha encontrado una partida con este código'],
    ]),
  ],
  [
    'game.error-not-in-game',
    new Map([
      ['fr', "Vous n'êtes pas dans cette partie"],
      ['en', "You're not in that game"],
      ['de', 'Sie sind nicht in diesem Spiel'],
      ['it', 'Non è in questa partita'],
      ['es', 'No estás en esa partida'],
    ]),
  ],
  [
    'game.error-game-full',
    new Map([
      ['fr', 'Ce jeu est déjà complet'],
      ['en', 'This game is full'],
      ['de', 'Dieses Spiel ist bereits voll'],
      ['it', 'Questo gioco è già pieno'],
      ['es', 'Esta partida está completa'],
    ]),
  ],
  [
    'game.accessing-game',
    new Map([
      ['fr', 'Accès au jeu...'],
      ['en', 'Accessing the game...'],
      ['de', 'Zugang zum Spiel...'],
      ['it', 'Accesso al gioco...'],
      ['es', 'Acceso al juego...'],
    ]),
  ],
  [
    'game.click-if-not-redirected',
    new Map([
      ['fr', "Cliquez ici si vous n'êtes pas redirigés"],
      ['en', "Click here if you're not redirected"],
      ['de', 'Klicken Sie hier, wenn Sie nicht weitergeleitet werden'],
      ['it', 'Fare clic qui se non è rediretta'],
      ['es', 'Haz clic aquí si no te redirige'],
    ]),
  ],
  [
    'turn.waiting-for-other-players',
    new Map([
      ['fr', 'En attente des autres joueurs...'],
      ['en', 'Waiting for the other players...'],
      ['de', 'Warten auf die anderen Spieler...'],
      ['it', 'In attesa degli altri giocatori...'],
      ['es', 'Esperando a otros jugadores...'],
    ]),
  ],
  [
    'turn.you-are-the-storyteller',
    new Map([
      ['fr', 'Vous êtes le conteur !'],
      ['en', 'You are the storyteller!'],
      ['de', 'Du bist die Geschichtenerzähler*in!'],
      ['it', 'Lei è il narratore'],
      ['es', 'Eres el Narrador!'],
    ]),
  ],
  [
    'turn.waiting-for-storyteller',
    new Map([
      ['fr', 'En attente du conteur...'],
      ['en', 'Waiting for the storyteller...'],
      ['de', 'Warten auf die Geschichtenerzähler*in...'],
      ['it', 'Aspettando il narratore...'],
      ['es', 'Esperando al Narrador...'],
    ]),
  ],
  [
    'turn.other-players-voting',
    new Map([
      ['fr', 'Les autres joueurs sont en train de voter...'],
      ['en', 'Other players are voting...'],
      ['de', 'Andere Spieler stimmen ab...'],
      ['it', 'Gli altri giocatori stanno votando...'],
      ['es', 'Los otros jugadores están votando...'],
    ]),
  ],
  [
    'turn.error-cant-vote-for-own-card',
    new Map([
      ['fr', 'Vous ne pouvez pas voter pour votre propre carte !'],
      ['en', "You can't vote for your own card !"],
      ['de', 'Sie können nicht für Ihre eigene Karte stimmen !'],
      ['it', 'Non può votare per la propria carta !'],
      ['es', 'No puedes votar por tu propia carta !'],
    ]),
  ],
  [
    'turn.cards-exposed-to-vote',
    new Map([
      ['fr', 'Cartes soumises au vote'],
      ['en', 'Exposed cards'],
      ['de', 'Karten zur Abstimmung gestellt'],
      ['it', 'Carte sottoposte al voto'],
      ['es', 'Cartas mandadas a votación'],
    ]),
  ],
  [
    'card.owner',
    new Map([
      ['fr', 'Carte de {$}'],
      ['en', "{$}'s card"],
      ['de', '{$} Karte'],
      ['it', 'Carta di {$}'],
      ['es', 'Carta de {$}'],
    ]),
  ],
  [
    'card-modal.clue',
    new Map([
      ['fr', "Définir l'indice pour cette carte"],
      ['en', 'Define a clue for this card'],
      ['de', 'Definieren Sie einen Hinweis für diese Karte'],
      ['it', 'Definire l’indizio'],
      ['es', 'Definir una pista para esta carta'],
    ]),
  ],
  [
    'card-modal.clue-placeholder',
    new Map([
      ['fr', 'indice'],
      ['en', 'clue'],
      ['de', 'Hinweis'],
      ['it', 'indizio'],
      ['es', 'índice'],
    ]),
  ],
  [
    'card-modal.validate',
    new Map([
      ['fr', 'VALIDER'],
      ['en', 'VALIDATE'],
      ['de', 'BESTÄTIGEN'],
      ['it', 'CONVALIDARE'],
      ['es', 'VALIDAR'],
    ]),
  ],
  [
    'card-modal.chose-card',
    new Map([
      ['fr', 'CHOISIR CETTE CARTE'],
      ['en', 'CHOOSE THIS CARD'],
      ['de', 'WÄHLEN SIE DIESE KARTE'],
      ['it', 'SCEGLIERE QUESTA CARTA'],
      ['es', 'ESCOGE ESTA CARTA'],
    ]),
  ],
  [
    'card-modal.vote-card',
    new Map([
      ['fr', 'VOTER POUR CETTE CARTE'],
      ['en', 'VOTE FOR THIS CARD'],
      ['de', 'ABSTIMMUNG FÜR DIESE KARTE'],
      ['it', 'VOTARE PER QUESTA CARTA'],
      ['es', 'VOTAR POR ESTA CARTA'],
    ]),
  ],
  [
    'card-modal.vote-result',
    new Map([
      ['fr', 'Joueur(s) ayant voté pour cette carte :'],
      ['en', 'Players who voted for this card:'],
      ['de', 'Spieler, die für diese Karte gestimmt haben:'],
      ['it', 'Giocatore(i) avendo votato per questa carta:'],
      ['es', 'Jugador(es) que ha(n) votado por esta carta:'],
    ]),
  ],
  [
    'card-modal.no-votes',
    new Map([
      ['fr', "Personne n'a voté pour cette carte."],
      ['en', 'Nobody voted for this card.'],
      ['de', 'Niemand hat für diese Karte gestimmt.'],
      ['it', 'Nessuno ha votato per questa carta'],
      ['es', 'Nadie ha votado por esta carta'],
    ]),
  ],
  [
    'username.chose-username',
    new Map([
      ['fr', 'Choisissez un pseudo'],
      ['en', 'Choose a username'],
      ['de', 'Wähle ein Pseudo'],
      ['it', 'Scegliete un pseudonimo'],
      ['es', 'Escoge un nombre de usuario'],
    ]),
  ],
  [
    'username.placeholder',
    new Map([
      ['fr', 'pseudo'],
      ['en', 'username'],
      ['de', 'pseudo'],
      ['it', 'pseudonimo'],
      ['es', 'nombre de usuario'],
    ]),
  ],
  [
    'username.error-cant-be-empty',
    new Map([
      ['fr', 'Le pseudo ne peut pas être vide'],
      ['en', "The username can't be empty"],
      ['de', 'Das Pseudo kann nicht leer sein'],
      ['it', 'Il pseudonimo non può essere vuoto'],
      ['es', 'El nombre de usuario no puede estar en blanco'],
    ]),
  ],
  [
    'game-waiting.can-be-started',
    new Map([
      ['fr', 'Vous pouvez maintenant lancer la partie'],
      ['en', 'You can now start the game'],
      ['de', 'Sie können jetzt das Spiel starten'],
      ['it', 'Adesso puo avviare la partita'],
      ['es', 'Ya puedes comenzar la partida'],
    ]),
  ],
  [
    'game-waiting.waiting-to-be-started',
    new Map([
      ['fr', 'En attente du lancement de la partie'],
      ['en', 'Waiting for the game to start'],
      ['de', 'Warten auf den Start des Spiels'],
      ['it', 'Aspettando di avviare la partita'],
      ['es', 'Esperando que comience la partida'],
    ]),
  ],
  [
    'game-waiting.waiting-for-players',
    new Map([
      ['fr', 'En attente de joueurs... (3 joueurs minimum, 8 maximum)'],
      ['en', 'Waiting for other players... (3 players min, 8 max)'],
      ['de', 'Warten auf andere Spieler... (3 Spieler min, 8 max)'],
      ['it', 'Aspettando i giocari... (3 giocatori min, 8 max)'],
      ['es', 'Esperando que se unan más jugadores... (3 jugadores min, 8 max)'],
    ]),
  ],
  [
    'game-waiting.start-game',
    new Map([
      ['fr', 'Lancer la partie !'],
      ['en', 'Start the game!'],
      ['de', 'Starte das Spiel!'],
      ['it', 'Avviare la partita!'],
      ['es', 'Empezar la partida!'],
    ]),
  ],
  [
    'game-ended.ranking.first',
    new Map([
      ['fr', '1er'],
      ['en', '1st'],
      ['de', '1'],
      ['it', '1°'],
      ['es', '1º'],
    ]),
  ],
  [
    'game-ended.ranking.other',
    new Map([
      ['fr', '{$}ème'],
      ['en', '{$}'],
      ['de', '{$}'],
      ['it', '{$}°'],
      ['es', '{$}º'],
    ]),
  ],
  [
    'game-ended.thanks',
    new Map([
      ['fr', "🎉 Merci d'avoir joué 🙌 !"],
      ['en', '🎉 Thanks for playing 🙌 !'],
      ['de', '🎉 Danke fürs Spielen 🙌 !'],
      ['it', '🎉 Grazie per aver giocato 🙌 !'],
      ['es', '🎉 Gracias por jugar 🙌 !'],
    ]),
  ],
  [
    'game-ended.survey',
    new Map([
      ['fr', 'Des idées pour améliorer Dixit Online ? Dites-le moi ici :)'],
      ['en', 'Any ideas to improve Dixit online ? Tell me here :)'],
      ['de', 'Irgendwelche Ideen, um Dixit Online zu verbessern? Sag es mir hier :)'],
      ['it', 'Qualche idea per migliorare Dixit Online? Dimmi qui :)'],
      ['es', 'Tienes alguna idea para mejorar Dixit online? Dímela aquí :)'],
    ]),
  ],
  [
    'clue.being-the-storyteller',
    new Map([
      ['fr', "Vous avez donné l'indice : "],
      ['en', 'You gave the following clue: '],
      ['de', 'Sie gaben den folgenden Hinweis: '],
      ['it', 'Hai dato il seguente indizio: '],
      ['es', 'Has dado la siguiente pista: '],
    ]),
  ],
  [
    'clue.being-a-player',
    new Map([
      ['fr', "{$} a donné l'indice : "],
      ['en', '{$} gave the following clue : '],
      ['de', '{$} gab den folgenden Hinweis : '],
      ['it', '{$} ha dato il seguente indizio: '],
      ['es', '{$} ha dado la siguiente pista: '],
    ]),
  ],
  [
    'titled-card-grid.your-hand',
    new Map([
      ['fr', 'Votre main'],
      ['en', 'Your hand'],
      ['de', 'Deine Hand'],
      ['it', 'Sua mano'],
      ['es', 'Tu mano'],
    ]),
  ],
  [
    'titled-card-grid.chose-card',
    new Map([
      ['fr', 'Choisissez une carte'],
      ['en', 'Choose a card'],
      ['de', 'Wähle eine Karte'],
      ['it', 'Scegli una carta'],
      ['es', 'Escoge una carta'],
    ]),
  ],
  [
    'titled-card-grid.chose-two-cards',
    new Map([
      ['fr', 'Choisissez deux cartes'],
      ['en', 'Choose two cards'],
      ['de', 'Wähle zwei Karten'],
      ['it', 'Scegli due carte'],
      ['es', 'Escoge dos cartas'],
    ]),
  ],
  [
    'titled-card-grid.find-card',
    new Map([
      ['fr', 'Retrouvez la carte de {$}'],
      ['en', "Find {$}'s card"],
      ['de', 'Finde {$}s Karte'],
      ['it', 'Ritrova la carta di {$}'],
      ['es', 'Encuentra la carta de {$}'],
    ]),
  ],
  [
    'titled-card-grid.vote-results',
    new Map([
      ['fr', 'Résultat des votes'],
      ['en', 'Vote results'],
      ['de', 'Ergebnis der Stimmen'],
      ['it', 'Risultato dei votazioni'],
      ['es', 'Resultado de las votaciones'],
    ]),
  ],
  [
    'titled-card-grid.see-leaderboard',
    new Map([
      ['fr', 'Voir le classement final !'],
      ['en', 'See the leaderboard !'],
      ['de', 'Siehe die endgültige Rangliste !'],
      ['it', 'Vedere il risultato finale'],
      ['es', 'Ver la tabla de clasificación'],
    ]),
  ],
  [
    'titled-card-grid.go-to-next-turn',
    new Map([
      ['fr', 'Passer au prochain tour'],
      ['en', 'Go to next turn'],
      ['de', 'Siehe die endgültige Rangliste'],
      ['it', 'Passare al prossimo giro'],
      ['es', 'Pasar al siguiente turno'],
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
