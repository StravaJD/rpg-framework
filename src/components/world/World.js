import React, { Component } from 'react';
import { connect } from 'react-redux';
import { moveUp, moveRight, moveDown, moveLeft } from '../../actions/characterActions';

const Tile = ({ x, y, wall }) => (
  <div>
   { wall }
  </div>
);

class World extends Component {
  
  handleMove(event) {
    switch(event.keyCode) {
      case 87: //w - up
        this.props.moveUp('hero');
        break;
      case 68: //d - right
        this.props.moveRight('hero');
        break;
      case 83: //s - down
        this.props.moveDown('hero');
        break;
      case 65: //a - left
        this.props.moveLeft('hero');
        break;
    }
  }
  
  render() {
    let { worldMap } = this.props;
    return <div tabIndex="0" keyUp={this.handleMove.bind(this)}>
      {
        worldMap.map((row, y) => row.map((tile, x) => (
          <Tile { ...tile } x={ x } y={ y } />
        )))
      }
    </div>;
  }
}

const mapStateToProps = state => {
  return {
    worldMap: state.world.overworld
  };
};

const mapDispatchToProps = dispatch => {
  return {
    moveUp: (id) => dispatch(moveUp(id)),
    moveRight: (id) => dispatch(moveRight(id)),
    moveDown: (id) => dispatch(moveDown(id)),
    moveLeft: (id) => dispatch(moveLeft(id)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(World);