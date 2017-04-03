import { ATTACK, USE_SKILL, MOVE_UP, MOVE_LEFT, MOVE_DOWN, MOVE_RIGHT } from '../utils/actionTypes';

const defaultCharacters = {
    hero: {
      stats: {
        attack: 10,
        defense: 5,
        health: 40
      },
      position: {x:0, y:0, dim: 'overworld'}
    },
    farmer: {
      stats: {
        attack: 10,
        defense: 5,
        health: 40
      },
      position: {x:1, y:2, dim: 'overworld'}
    }
};

const defaultWorld = {
  overworld: [
    [{wall:false},{wall:true},{wall:true}],
    [{wall:false},{wall:false},{wall:false}],
    [{wall:true},{wall:false},{wall:true}]
  ]
};

const initialState = {
  characters: defaultCharacters,
  world: defaultWorld
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case ATTACK: {
      let damage = state.characters[action.attackerId].stats.attack - state.characters[action.defenderId].stats.defense;
      let newState = Object.assign({}, state);
      newState.characters[action.defenderId].stats.health -= damage;
      return newState;
    }
    case USE_SKILL: {
      return state;
    }
    case MOVE_UP: {
      let position = getCharacter(state, action.characterId).position;
      position.y--;
      let tileToMoveTo = getTile(state, position)
      if(!tileToMoveTo.wall) {
        let newState = Object.assign({}, state);
        newState.characters[action.characterId].position = position;
        return newState;
      } else {
        return state;
      }
    }
    case MOVE_RIGHT: {
      let position = getCharacter(state, action.characterId).position;
      position.x++;
      let tileToMoveTo = getTile(state, position)
      if(!tileToMoveTo.wall) {
        let newState = Object.assign({}, state);
        newState.characters[action.characterId].position = position;
        return newState;
      } else {
        return state;
      }
    }
    case MOVE_DOWN: {
      let position = getCharacter(state, action.characterId).position;
      position.y++;
      let tileToMoveTo = getTile(state, position)
      if(!tileToMoveTo.wall) {
        let newState = Object.assign({}, state);
        newState.characters[action.characterId].position = position;
        return newState;
      } else {
        return state;
      }
    }
    case MOVE_LEFT: {
      let position = getCharacter(state, action.characterId).position;
      position.x--;
      let tileToMoveTo = getTile(state, position)
      if(!tileToMoveTo.wall) {
        let newState = Object.assign({}, state);
        newState.characters[action.characterId].position = position;
        return newState;
      } else {
        return state;
      }
    }
    default:
      return state;
  }
};

export const getTile = (state, position) => {
  return Object.assign({}, state.world[position.dim][position.y][position.x]);
}

export const getCharacter = (state, id) => {
  return Object.assign({}, state.characters[id]);
}