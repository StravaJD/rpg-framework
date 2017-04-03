import { ATTACK, USE_SKILL,
  MOVE_UP, MOVE_RIGHT, MOVE_DOWN, MOVE_LEFT } from '../utils/actionTypes';

export function attack(attackerId, defenderId){
  return {
    type: ATTACK,
    attackerId,
    defenderId
  }
}

export function moveUp(characterId) {
  return {
    type: MOVE_UP,
    characterId
  }
}

export function moveRight(characterId) {
  return {
    type: MOVE_RIGHT,
    characterId
  }
}
export function moveDown(characterId) {
  return {
    type: MOVE_DOWN,
    characterId
  }
}
export function moveLeft(characterId) {
  return {
    type: MOVE_LEFT,
    characterId
  }
}