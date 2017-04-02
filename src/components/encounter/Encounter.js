import React, { Component } from 'react';
import { connect } from 'react-redux';

import Scene from "../scene/Scene";
import Battlefield from "../battlefield/Battlefield";
import Party from "../party/Party";
import Menu from "../menu/Menu";

import { attack } from '../../actions/characterActions';

import dune from "../../images/reddune.jpg";

class Encounter extends Component {
  render() {
    return (
      <Scene image={dune} onClick={this.props.attack("hero", "farmer")}>
        <Battlefield>
          <Party />
          <Party />
        </Battlefield>
        <Menu />
      </Scene>
    )
  }
}

const mapStateToProps = state => {
  
}

const mapDispatchToProps = dispatch => {
  return {
    attack: (attackerId, defenderId) => {
      dispatch(attack(attackerId, defenderId));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Encounter);
