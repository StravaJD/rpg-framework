import { SELECT_TOOL, SELECT_DIM, SET_TILE_OPTIONS, ADD_DIM, REMOVE_DIM, ADD_TILE, REMOVE_TILE, SET_CANVAS_OPTIONS } from '../utils/actionTypes';
import { set, remove, get } from '../utils/objUtil';
import tools from '../utils/Tools';
const defaultWorldBuilder = {
  tools: Object.keys(tools).map(toolName => ({id: toolName})),
  selectedTool: {id:'brush'},
  selectedDim: undefined,
  tileOptions: {
    wall: false
  },
  canvasOptions: {
    tileSize: 32
  },
  tiles: {}
};

export default function worldBuilder(worldBuilder = defaultWorldBuilder, action) {
  let newState;
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
      if(action.tileOptions.x !== undefined && action.tileOptions.y !== undefined) {
        return set(
          `tileOptions`,
          {...worldBuilder},
          get(`tiles.${action.tileOptions.dim.name}.${action.tileOptions.y}.${action.tileOptions.x}`, { ...worldBuilder })
        );
      } else {
        return set(`tileOptions`, {...worldBuilder}, action.tileOptions);
      }
    case ADD_TILE:
      newState = { ...worldBuilder };
      for(let offsetY = 0; offsetY <= action.height; offsetY++)
        for(let offsetX = 0; offsetX <= action.width; offsetX++)
          newState = set(`tiles.${action.dim.name}.${action.y + offsetY}.${action.x + offsetX}`, newState, action.tile);
      return newState;
    case REMOVE_TILE:
      newState = { ...worldBuilder };
      for(let offsetY = 0; offsetY <= action.height; offsetY++)
        for(let offsetX = 0; offsetX <= action.width; offsetX++)
          newState = remove(`tiles.${action.dim.name}.${action.y}.${action.x}`, newState);
      return newState;
    case SET_CANVAS_OPTIONS:
      return set(`canvasOptions`, {...worldBuilder}, action.canvasOptions);
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
        y: parseInt(y),
        x: parseInt(x),
        tile: tiles[selectedDim.name][y][x]
      })
    ))
  }
  return tileArray;
};