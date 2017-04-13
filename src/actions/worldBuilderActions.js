import { SELECT_TOOL, SELECT_DIM, SET_TILE_OPTIONS, ADD_DIM, REMOVE_DIM, ADD_TILE, REMOVE_TILE } from '../utils/actionTypes';

export function selectTool(tool){
  return{
    type: SELECT_TOOL,
    tool
  }
}

export function selectDim(dim) {
  return {
    type: SELECT_DIM,
    dim
  }
}

export function setTileOptions(tileOptions) {
  return {
    type: SET_TILE_OPTIONS,
    tileOptions: { ...tileOptions }
  }
}

export function addDim(dim) {
  return {
    type: ADD_DIM,
    dim
  }
}

export function removeDim(dim) {
  return {
    type: REMOVE_DIM,
    dim
  }
}

export function addTile( tile, dim, y, x, width = 0 , height = 0 ){
  return {
    type: ADD_TILE,
    dim,
    y,
    x,
    tile: { ...tile },
    width,
    height
  };
}

export function removeTile(tile, dim, y, x){
  return {
    type: REMOVE_TILE,
    dim,
    y,
    x,
    tile
  };
}