import { MOVE } from '../utils/actionTypes';

const defaultWorld = {
  dim: {
    overworld: [
      [{wall:false, character:{id: 'hero'}},{wall:true},{wall:true}],
      [{wall:false},{wall:false},{wall:false, action:{type:MOVE, from: {dim: 'overworld', x: 2, y: 1}, to: {dim:'place', x:1, y: 0}}}],
      [{wall:true},{wall:false, character:{id: 'farmer'}},{wall:true}]
    ],
    place: [[{wall: false, action:{type:MOVE, from: {dim: 'place', x: 0, y: 0}, to: {dim:'overworld', x:1, y: 1}}},{wall: false}]],
    nowhere: [[{wall: false}]]
  },
  characters: {
    hero: {dim: 'overworld', x: 0, y: 0},
    farmer: {dim: 'overworld', x: 1, y: 2}
  }
};

const defaultPosition = {dim:'nowhere', x:0, y: 0};

function move(id, from = defaultPosition, to, worldState){
  let world = Object.assign({}, worldState);
  let fromTile, toTile;
  
  try { //try to get the tiles we need, if they aren't there, then the move is invalid and we should just return the world
    fromTile = world.dim[from.dim][from.y][from.x];
    toTile = world.dim[to.dim][to.y][to.x];
  } catch(e) { return world; }
  
  if(!toTile.wall && !toTile.character) {
    delete fromTile.character;
    toTile.character = {id};
    world.characters[id] = to;
    return world;
  } else {
    return world;
  }
}

export default function world(world = defaultWorld, action) {
  switch (action.type) {
    case MOVE: {
      return move(action.characterId, action.from, action.to, world);
    }
    default:
      return world;
  }
}

export function getWorldPosition(state, characterId) {
 return state.world.characters[characterId]; 
}

export function getWorldTile(state, position) {
  return state.world.dim[position.dim][position.y][position.x];
}