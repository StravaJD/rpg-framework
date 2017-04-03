import React, { Component } from 'react';
import { attack } from '../../actions/characterActions';

import './game.css';

class BattleMenuComponent extends Component {
  render() {
    return (
      <div>
        <div className="action sword" title="Sword Attack" onClick={ this.props.attack } />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    attack: dispatch(attack('hero', 'farmer'))
  }
}

export const BattleMenu = connect(null, mapDispatchToProps)(BattleMenuComponent);