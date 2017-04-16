import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectTool, selectDim, setTileOptions, addDim, removeDim, addTile, removeTile, setCanvasOptions } from '../../actions/worldBuilderActions';
import { getTools, getTiles, getDims, getTileArray } from '../../reducers/worldBuilderReducers';
import Dimensions from './Dimensions';
import TileOptions from './TileOptions';
import ToolBox from './ToolBox';
import CanvasContainer from './CanvasContainer';

import './WorldBuilder.css';

/*
TODO: allow adding more tile images through the ui
allow tile action to be specified in the tile options menu
add selecting / copy tool and pasting tool
 */

const WorldBuilder = (props) =>
  <div className="WorldBuilder">
    <ToolBox
      tools={ props.tools }
      selectedTool={ props.selectedTool }
      selectTool={ props.selectTool }
    />
    <TileOptions
      tileOptions={ props.tileOptions }
      setTileOptions={ props.setTileOptions }
    />
    <Dimensions
      selectedDim={ props.selectedDim }
      selectDim={ props.selectDim }
      addDim={ props.addDim }
      removeDim={ props.removeDim }
      dims={ getDims(props.tiles) }
    />
    <CanvasContainer
      tiles={ getTileArray(props.tiles, props.selectedDim) }
      selectedDim={ props.selectedDim }
      selectedTool={ props.selectedTool }
      tileOptions={ props.tileOptions }
      setTileOptions={ props.setTileOptions }
      addTile={ props.addTile }
      removeTile={ props.removeTile }
      setCanvasOptions={ props.setCanvasOptions }
      canvasOptions={ props.canvasOptions }
    />
  </div>;

const mapStateToProps = state => {
  return {
    tools: getTools(state),
    selectedTool: state.worldBuilder.selectedTool,
    selectedDim: state.worldBuilder.selectedDim,
    tileOptions: state.worldBuilder.tileOptions,
    tiles: getTiles(state),
    canvasOptions: state.worldBuilder.canvasOptions
  };
};

const mapDispatchToProps = {
  selectTool,
  selectDim,
  setTileOptions,
  addDim,
  removeDim,
  addTile,
  removeTile,
  setCanvasOptions
};

export default connect(mapStateToProps, mapDispatchToProps)(WorldBuilder);