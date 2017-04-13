import { SELECT_TOOL, SELECT_DIM, SET_TILE_OPTIONS, ADD_DIM, REMOVE_DIM, ADD_TILE, REMOVE_TILE } from '../utils/actionTypes';
import { set, remove } from '../utils/objUtil';
const defaultWorldBuilder = {
  tools: [
    {id:'brush'},
    {id:'rectangle'}
  ],
  selectedTool: {id:'brush'},
  selectedDim: undefined,
  tileOptions: {
    wall: false
  },
  tiles: {}
};

export default function worldBuilder(worldBuilder = defaultWorldBuilder, action) {
  switch(action.type) {
    case SELECT_TOOL:
      return set(`selectedTool`, {...worldBuilder}, action.tool);
    case SELECT_DIM:
      return set(`selectedDim`, {...worldBuilder}, action.dim);
    case ADD_DIM:
      return set(`tiles.${action.dim.name}`, set(`selectedDim`, {...worldBuilder}, action.dim), {});
    case REMOVE_DIM:
      return remove(`tiles.${action.dim.name}`, {...worldBuilder});
    case SET_TILE_OPTIONS:
      return set(`tileOptions`, {...worldBuilder}, action.tileOptions);
    case ADD_TILE:
      let newState = { ...worldBuilder };
      for(let offsetY = 0; offsetY <= action.height; offsetY++)
        for(let offsetX = 0; offsetX <= action.width; offsetX++)
          newState = set(`tiles.${action.dim.name}.${action.y + offsetY}.${action.x + offsetX}`, newState, action.tile);
      return newState;
    case REMOVE_TILE:
      return remove(`tiles.${action.dim.name}.${action.y}.${action.x}`, { ...worldBuilder });
    default:
      return worldBuilder;
  }
}

export function getTools(state) {
  return state.worldBuilder.tools;
}

export function getTiles(state) {
  return state.worldBuilder.tiles;
}

export const getDims = (tiles) => Object.keys(tiles).map(dim => ({name: dim}));
export const getTileArray = (tiles, selectedDim) => {
  let tileArray = [];
  if(selectedDim && tiles[selectedDim.name]){
    Object.keys(tiles[selectedDim.name]).forEach(y => Object.keys(tiles[selectedDim.name][y]).forEach(x =>
      tileArray.push({
        dim: selectedDim.name,
        y,
        x,
        tile: tiles[selectedDim.name][y][x]
      })
    ))
  }
  return tileArray;
};