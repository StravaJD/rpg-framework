import React, { Component } from 'react';


class Scene extends Component {
  render(){
    return <img className="Scene-Background" src={this.props.image} />
  }
}

export default Scene;