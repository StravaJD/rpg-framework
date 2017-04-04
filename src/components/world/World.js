import React, { Component } from 'react';
import { connect } from 'react-redux';
import { moveUp, moveRight, moveDown, moveLeft } from '../../actions/worldActions';
import { getWorldPosition } from '../../reducers/worldReducers';

import images from '../../images';
import './World.css';

const Tile = ({ x, y, wall, character }) => {
  let style = {
    backgroundColor: wall ? 'gray' : 'lightgray',
    width: '64px',
    height: '64px',
    display: 'inline-block'
  };
  
  return (
    <span style={ style }>
      { character && <img src={ images[character.id] } className="Map-Character-Image" /> }
    </span>
  );
};

class World extends Component {
  
  handleMove(from, event) {
    switch(event.keyCode) {
      case 87: //w - up
        this.props.moveUp('hero', from);
        break;
      case 68: //d - right
        this.props.moveRight('hero', from);
        break;
      case 83: //s - down
        this.props.moveDown('hero', from);
        break;
      case 65: //a - left
        this.props.moveLeft('hero', from);
        break;
    }
  }
  
  render() {
    let { worldMap, position } = this.props;
    return <div tabIndex="0" className='Map' onKeyUp={this.handleMove.bind(this, position)}>
      {
        worldMap.map((row, y) => (
          <div className='Map-Row'>
          { row.map((tile, x) => <Tile { ...tile } x={ x } y={ y } /> ) }
          </div>
        ))
      }
    </div>;
  }
}

const mapStateToProps = state => {
  let position = getWorldPosition(state, 'hero');
  return {
    worldMap: state.world.dim[position.dim],
    position
  };
};

const mapDispatchToProps = dispatch => {
  return {
    moveUp: (id, from) => dispatch(moveUp(id, from)),
    moveRight: (id, from) => dispatch(moveRight(id, from)),
    moveDown: (id, from) => dispatch(moveDown(id, from)),
    moveLeft: (id, from) => dispatch(moveLeft(id, from)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(World);