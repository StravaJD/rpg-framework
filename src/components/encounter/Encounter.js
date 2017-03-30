import React, { Component } from 'react';
import Scene from "../scene/Scene";
import dune from "../../images/reddune.jpg";

class Encounter extends Component {
  render() {
    return (
      <Scene image={dune}>
      </Scene>
    )
  }
}

export default Encounter;
