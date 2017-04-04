import { getWorldPosition, getWorldTile } from '../reducers/worldReducers';
import { MOVE } from '../utils/actionTypes';

const tileTrigger = store => next => action => {
  let result = next(action);
  if(action.type === MOVE) {
    //if the character id in the action has moved to the action.to position, then we should trigger the tile action
    let characterPos = getWorldPosition(store.getState(), action.characterId);
    let toTile = getWorldTile(store.getState(), action.to);
    if( toTile.action &&
    characterPos.dim === action.to.dim &&
    characterPos.y === action.to.y &&
    characterPos.x === action.to.x ) {
      let tileAction = Object.assign({}, toTile.action);
      tileAction.characterId = action.characterId;
      store.dispatch(tileAction);
    }
  }
  return result;
}

export default tileTrigger;