import React, { Component } from 'react';
import { connect } from 'react-redux';

import Scene from "../scene/Scene";
import Battlefield from "../battlefield/Battlefield";
import Party from "../party/Party";
import { BattleMenu } from "../menu/Menu";

import { attack } from '../../actions/characterActions';

import dune from "../../images/reddune.jpg";

class Encounter extends Component {
  render() {
    const { zoneImage, activeCharacter } = this.props;
    return (
      <Scene image={ zoneImage }>
        <Battlefield />
        <BattleMenu />
      </Scene>
    )
  }
}

const mapStateToProps = state => {
  return {
    zoneImage: dune
  };
};

const mapDispatchToProps = dispatch => {
  return {
    attack: (attackerId, defenderId) => {
      dispatch(attack(attackerId, defenderId));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Encounter);
