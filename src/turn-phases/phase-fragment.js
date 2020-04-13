import gql from 'graphql-tag';

export const PhaseFragment = gql`
  fragment Phase on TurnPhase {
    id
    name
    storytellerId
    clue
    board {
      card {
        id
        url
      }
      playerId
      votes {
        id
        name
      }
    }
    hand {
      id
      src: url
    }
    players {
      id
      name
      readyForNextPhase
      score
    }
  }
`;
