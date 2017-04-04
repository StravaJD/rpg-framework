import { MOVE } from '../utils/actionTypes';

export function moveUp(characterId, from) {
  let to = Object.assign({}, from);
  to.y--;
  return moveTo(characterId, from, to);
}

export function moveRight(characterId, from) {
  let to = Object.assign({}, from);
  to.x++;
  return moveTo(characterId, from, to);
}
export function moveDown(characterId, from) {
  let to = Object.assign({}, from);
  to.y++;
  return moveTo(characterId, from, to);
}
export function moveLeft(characterId, from) {
  let to = Object.assign({}, from);
  to.x--;
  return moveTo(characterId, from, to);
}

export function moveTo(characterId, from, to) {
  return {
    type: MOVE,
    characterId,
    from,
    to
  }
}