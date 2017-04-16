import React, { Component } from 'react';
import tools from '../../utils/Tools';
import { tileImageElements } from '../../images/tiles';

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

export default CanvasContainer;