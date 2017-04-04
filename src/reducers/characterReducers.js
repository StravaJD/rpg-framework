import { ATTACK, USE_SKILL } from '../utils/actionTypes';

const defaultCharacters = {
    hero: {
      stats: {
        attack: 10,
        defense: 5,
        health: 40
      }
    },
    farmer: {
      stats: {
        attack: 10,
        defense: 5,
        health: 40
      }
    }
};

export default function characters(characters = defaultCharacters, action) {
  switch(action.type) {
    case ATTACK: {
      let damage = characters[action.attackerId].stats.attack - characters[action.defenderId].stats.defense;
      let newCharacters = Object.assign({}, characters);
      newCharacters[action.defenderId].stats.health -= damage;
      return newCharacters;
    }
    case USE_SKILL: {
      return characters;
    }
    default:
      return characters;
  }
}