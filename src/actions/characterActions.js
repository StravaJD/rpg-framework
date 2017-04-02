import { ATTACK, USE_SKILL } from '../utils/actionTypes';

export function attack(attackerId, defenderId){
  return {
    type: ATTACK,
    attackerId,
    defenderId
  }
}