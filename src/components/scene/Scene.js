import React, { Component } from 'react';


class Scene extends Component {
  render(){
    return (
      <div>
        <img className="Scene-Background" src={this.props.image} />
        { this.props.children }
      </div>
    )
  }
}

export default Scene;