import React, { Component } from 'react';
import { connect } from 'react-redux';
import { attack } from '../../actions/characterActions';
import { selectOption } from '../../actions/menuActions';
import { selectedMenu } from '../../reducers/menuReducers';

import '../game/game.css';

class BattleMenuComponent extends Component {
  render() {
    return (
      <div>
        {
          this.props.menu.subOptions.map((option, index) => (
            <div key={ index } onClick={ () => this.props.selectOption(this.props.currentMenu, option) }>
              <img src={ this.props.options[option].icon } />
              { this.props.options[option].description }
            </div>
          ))
        }
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    options: state.menu.options,
    currentMenu: state.menu.selectedOption,
    menu: selectedMenu(state)
  }
}
const mapDispatchToProps = dispatch => {
  return {
    selectOption: (currentMenu, nextMenu) => {dispatch(selectOption(currentMenu, nextMenu))},
    attack: () => {dispatch(attack('hero', 'farmer'))}
  }
}

export const BattleMenu = connect(mapStateToProps, mapDispatchToProps)(BattleMenuComponent);