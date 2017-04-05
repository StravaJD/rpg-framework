import { SELECT_OPTION } from '../utils/actionTypes';
import images from '../images';

const defaultMenu = {
  selectedOption: 'main',
  options: {
    main: {
      subOptions: ['attack', 'skill', 'item', 'run']
    },
    attack: {
      subOptions: [],
      icon: images.sword2,
      description: 'Attack'
    },
    skill: {
      subOptions: [],
      icon: images.magic2,
      description: 'Skill'
    },
    item: {
      subOptions: [],
      icon: images.knapsack2,
      description: 'Item'
    },
    run: {
      icon: images.run2,
      description: 'Run'
    }
  }
}

export default function menu(menu = defaultMenu, action) {
  switch(action.type) {
    case SELECT_OPTION: {
      console.log('in menu reducer, action: ', action);
      let newMenu = Object.assign({}, menu);
      newMenu.selectedOption = action.nextOption;
      return newMenu;
    }
    default:
      return menu;
  }
}

export const selectedMenu = (state) => {
  return state.menu.options[state.menu.selectedOption];
}