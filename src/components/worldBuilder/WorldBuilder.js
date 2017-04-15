import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectTool, selectDim, setTileOptions, addDim, removeDim, addTile, removeTile, setCanvasOptions } from '../../actions/worldBuilderActions';
import { getTools, getTiles, getDims, getTileArray } from '../../reducers/worldBuilderReducers';
import tools from '../../utils/Tools';
import { get } from '../../utils/objUtil';
import tileImages from '../../images/tiles';

import './WorldBuilder.css';

/*
TODO: Add pan and zoom features
abstract the tools a bit more to make them easier to write
 */

const tileImageElements = Object.keys(tileImages)
  .map(imageName => {
    let imageElement = new Image();
    imageElement.src = tileImages[imageName];
    return {imageElement, imageName}
  }).reduce((acc, image) => {
    acc[image.imageName] = image.imageElement;
    return acc;
  }, {});

class CanvasContainer extends Component {
  constructor(props){
    super(props);
  }

  drawTile(tile, ctx){
    let {panX=0, panY=0, tileSize} = this.props.canvasOptions;
    let x = (tile.x * tileSize) - panX;
    let y = (tile.y * tileSize) - panY;
    if(!tile.tile.icon || tile.tile.icon === ""){
      ctx.fillStyle = tile.tile.wall ? '#444444' : '#DDDDDD';
      ctx.fillRect(x, y, tileSize, tileSize);
    } else {
      ctx.drawImage(tileImageElements[tile.tile.icon], x, y, tileSize, tileSize);
    }
  }

  getPositions(event) {
    let {panX=0, panY=0, tileSize} = this.props.canvasOptions;
    let x = event.pageX - event.target.offsetLeft;
    let y = event.pageY - event.target.offsetTop;
    let tileX = Math.floor((x + panX) / tileSize);
    let tileY = Math.floor((y + panY) / tileSize);
    return { x, y, tileX, tileY };
  }

  registerCanvas(el) {
    if(el) {
      let {panX=0, panY=0, tileSize} = this.props.canvasOptions;
      el.height = 500;
      el.width = 500;
      this.ctx = el.getContext('2d');
      this.ctx.clearRect(0, 0, el.width, el.height);
      this.props.tiles.forEach(tile => this.drawTile(tile, this.ctx));
      
      let xGridOffset = -((panX%tileSize)+tileSize)%tileSize;
      let yGridOffset = -((panY%tileSize)+tileSize)%tileSize;
      let gridWidth = el.width + xGridOffset + tileSize;
      let gridHeight = el.height + yGridOffset + tileSize;
      for(let x=xGridOffset, y=yGridOffset; x<gridWidth || y<gridHeight; x += tileSize, y+= tileSize) {
        this.ctx.fillStyle = '#fff';
        this.ctx.fillRect(x, 0, 1, el.height);
        this.ctx.fillRect(0, y, el.width, 1);
      }
    }
  }

  handleMouseDown(event){
    let {x, y, tileX, tileY} = this.getPositions(event);

    if(tools[this.props.selectedTool.id].onMouseDown) {
      tools[this.props.selectedTool.id]
        .onMouseDown({ ...this.props, ...this.props.canvasOptions, tileX, tileY, x, y });
    }
    
    this.props.setCanvasOptions({ ...this.props.canvasOptions, isMouseDown: true, startX: tileX, startY: tileY});
  }

  handleMouseMove(event){
    let {x, y, tileX, tileY} = this.getPositions(event);
    
    if(tools[this.props.selectedTool.id].onMouseMove) {
      tools[this.props.selectedTool.id]
        .onMouseMove({ ...this.props, ...this.props.canvasOptions, tileX, tileY, x, y });
    }
  }

  handleMouseUp(event){
    let {x, y, tileX, tileY} = this.getPositions(event);
    if(tools[this.props.selectedTool.id].onMouseUp) {
      tools[this.props.selectedTool.id]
        .onMouseUp({ ...this.props, ...this.props.canvasOptions, tileX, tileY, x, y });
    }
    this.props.setCanvasOptions({ ...this.props.canvasOptions, isMouseDown: false, startX: undefined, startY: undefined});
  }

  handleScroll(event) {
    event.preventDefault();
    let tileSize = this.props.canvasOptions.tileSize + (event.nativeEvent.deltaY > 0 ? 1 : -1);
    if(tileSize >= 1) {
      this.props.setCanvasOptions({...this.props.canvasOptions, tileSize});
    }
  }

  render(){
    return <canvas
      ref={ this.registerCanvas.bind(this) }
      onMouseDown={ this.handleMouseDown.bind(this) }
      onMouseMove={ this.handleMouseMove.bind(this) }
      onMouseUp={ this.handleMouseUp.bind(this) }
      onWheel={ this.handleScroll.bind(this) }
    />
  }
}

const ToolBox = ({ tools, selectedTool, selectTool }) =>
  <div className="ToolBox">
    {
      tools.map((tool, index) =>
        <div
          className={`ToolBox-Tool ${selectedTool && selectedTool.id === tool.id ? 'is-selected' : '' }`}
          title={ tool.description }
          onClick={ () => selectTool(tool) }
        >
          { tool.id }
        </div>
      )
    }
  </div>;

const TileOptions = ({ tileOptions, setTileOptions }) =>
  <div className="TileOptions">
    <label>
      is wall?
      <input
        type="checkbox"
        onChange={(e) => {
          tileOptions.wall = e.target.checked;
          setTileOptions(tileOptions);
        }}
        checked={ tileOptions.wall || false }
      />
    </label>
    <label>
      <img src={ get(`${tileOptions.icon}.src`, tileImageElements) }/>
      <select
        onChange={(e) => {
          tileOptions.icon = e.target.value;
          setTileOptions(tileOptions);
        }}
      >
        <option value="">Select a tile image</option>
        {
          Object.keys(tileImages).map(imageName => <option value={ imageName } selected={imageName === tileOptions.icon}>{ imageName }</option> )
        }
      </select>
    </label>
  </div>;

const Dimensions = ({ selectedDim, selectDim, addDim, removeDim, dims }) =>
  <div className="Dimensions">
    <AddDimension addDim={ addDim }/>
    {
      dims.map((dim, index) =>
        <div
          key={ index }
          className={`Dimension ${selectedDim && selectedDim.name === dim.name ? 'is-selected' : '' }`}
          onClick={ () => selectDim(dim) }
        >
          { dim.name }
          <span className="RemoveDimension" onClick={ () => removeDim(dim) }>X</span>
        </div>
      )
    }
  </div>;

class AddDimension extends Component {
  constructor(props){
    super(props);
    this.state = {
      adding: false
    }
  }
  
  handleBlur(){
    if(this.input.value){
      this.props.addDim({name:this.input.value});
    }
    this.setState({adding: false});
  }
  
  handleKeyDown(event){
    if(event.keyCode === 13){
      if(this.input.value){
        this.props.addDim({name:this.input.value});
      }
      this.setState({adding: false});
    }
  }
  
  startAdding(){
    this.setState({adding: true});
  }
  
  render(){
    return this.state.adding
    ? ( <div className="Dimensions-AddDimension">
      <input
        ref={(el)=>{this.input = el; el && el.focus();}}
        onBlur={ this.handleBlur.bind(this)}
        onKeyDown={this.handleKeyDown.bind(this)}
      /></div> ) 
    : ( <div className="Dimensions-AddDimension SwitchToAdding" onClick={this.startAdding.bind(this)} >Add Dimension</div>)
  }
}

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