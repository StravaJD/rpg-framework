import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectTool, selectDim, setTileOptions, addDim, removeDim, addTile, removeTile } from '../../actions/worldBuilderActions';
import { getTools, getTiles, getDims, getTileArray } from '../../reducers/worldBuilderReducers';
import tools from '../../utils/Tools';
import tileImages from '../../images/tiles';

import './WorldBuilder.css';

/*
TODO: implement tile options; wall is done, now add images
Add an eraser tool
Add pan and zoom features
abstract the tools a bit more to make them easier to write
 */

class CanvasContainer extends Component {
  constructor(props){
    super(props);
    this.state = {

    };
    this.tileSize = 64;
  }

  drawTile(tile, ctx){
    if(!tile.tile.icon || tile.tile.icon === ""){
      ctx.fillStyle = tile.tile.wall ? '#444444' : '#DDDDDD';
      ctx.fillRect(tile.x*this.tileSize, tile.y*this.tileSize, this.tileSize, this.tileSize);
    } else {
      let tileImage = new Image();
      tileImage.src = tile.tile.icon;
      ctx.drawImage(tileImage, tile.x*this.tileSize, tile.y*this.tileSize, this.tileSize, this.tileSize);
    }
  }

  registerCanvas(el) {
    if(el) {
      el.height = 500;
      el.width = 500;
      this.ctx = el.getContext('2d');
      this.ctx.clearRect(0, 0, el.width, el.height);
      this.props.tiles.forEach(tile => this.drawTile(tile, this.ctx));

      for(let i=0; i<el.width; i+= this.tileSize){
        this.ctx.fillStyle = '#fff';
        this.ctx.fillRect(i, 0, 1, el.height);
        this.ctx.fillRect(0, i, el.width, 1);
      }
    }
  }

  handleMouseDown(event){
    let x = Math.floor((event.pageX - event.target.offsetLeft) / this.tileSize);
    let y = Math.floor((event.pageY - event.target.offsetTop) / this.tileSize);

    if(tools[this.props.selectedTool.id].onMouseDown) {
      tools[this.props.selectedTool.id]
        .onMouseDown(this.props.tileOptions, this.props.selectedDim, y, x, this.props.addTile);
    }
    this.setState({isMouseDown: true, startX: x, startY: y});
  }

  handleMouseMove(event){
    let x = Math.floor((event.pageX - event.target.offsetLeft) / this.tileSize);
    let y = Math.floor((event.pageY - event.target.offsetTop) / this.tileSize);

    if(x !== this.state.currentX || y !== this.state.currentY) {
      if(tools[this.props.selectedTool.id].onMouseMove) {
        tools[this.props.selectedTool.id]
          .onMouseMove(this.props.tileOptions, this.props.selectedDim, y, x, this.state.isMouseDown, this.props.addTile);
      }
      this.setState({currentX: x, currentY: y});
    }
  }

  handleMouseUp(event){
    let x = Math.floor((event.pageX - event.target.offsetLeft) / this.tileSize);
    let y = Math.floor((event.pageY - event.target.offsetTop) / this.tileSize);
    if(tools[this.props.selectedTool.id].onMouseUp) {
      tools[this.props.selectedTool.id]
        .onMouseUp({
          tile: this.props.tileOptions,
          dim: this.props.selectedDim,
          y,
          x,
          startX: this.state.startX,
          startY: this.state.startY,
          addTile: this.props.addTile
        });
    }
    this.setState({isMouseDown: false, startX: undefined, startY: undefined});
  }

  render(){
    return <canvas
      ref={ this.registerCanvas.bind(this) }
      onMouseDown={ this.handleMouseDown.bind(this) }
      onMouseMove={ this.handleMouseMove.bind(this) }
      onMouseUp={ this.handleMouseUp.bind(this) }
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
      />
    </label>
    <label>
      <img src={tileOptions.icon}/>
      <select
        onChange={(e) => {
          tileOptions.icon = e.target.value;
          setTileOptions(tileOptions);
        }}
      >
        <option value="">Select a tile image</option>
        {
          Object.keys(tileImages).map(imageName => <option value={ tileImages[imageName] }>{ imageName }</option> ) 
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

const WorldBuilder = ({ tools, selectTool, selectedTool, tileOptions, setTileOptions, selectDim, selectedDim, addDim, removeDim, tiles, addTile, removeTile }) =>
  <div className="WorldBuilder">
    <ToolBox
      tools={ tools }
      selectedTool={ selectedTool }
      selectTool={ selectTool }
    />
    <TileOptions
      tileOptions={ tileOptions }
      setTileOptions={ setTileOptions }
    />
    <Dimensions
      selectedDim={ selectedDim }
      selectDim={ selectDim }
      addDim={ addDim }
      removeDim={ removeDim }
      dims={getDims(tiles)}
    />
    <CanvasContainer
      tiles={ getTileArray(tiles, selectedDim) }
      selectedDim={ selectedDim }
      selectedTool={ selectedTool }
      tileOptions={ tileOptions }
      addTile={ addTile }
      removeTile={ removeTile }
    />
  </div>;

const mapStateToProps = state => {
  return {
    tools: getTools(state),
    selectedTool: state.worldBuilder.selectedTool,
    selectedDim: state.worldBuilder.selectedDim,
    tileOptions: state.worldBuilder.tileOptions,
    tiles: getTiles(state)
  };
};

const mapDispatchToProps = {
    selectTool,
    selectDim,
    setTileOptions,
    addDim,
    removeDim,
    addTile,
    removeTile
};

export default connect(mapStateToProps, mapDispatchToProps)(WorldBuilder);