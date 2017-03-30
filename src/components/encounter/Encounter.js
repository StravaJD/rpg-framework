import React, { Component } from 'react';

import Scene from "../scene/Scene";
import Battlefield from "../battlefield/Battlefield";
import Party from "../party/Party";
import Menu from "../menu/Menu";

import dune from "../../images/reddune.jpg";

class Encounter extends Component {
  render() {
    return (
      <Scene image={dune}>
        <Battlefield>
          <Party />
          <Party />
        </Battlefield>
        <Menu />
      </Scene>
    )
  }
}

export default Encounter;
