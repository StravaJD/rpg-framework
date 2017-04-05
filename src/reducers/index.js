import { combineReducers } from 'redux';
import characters from './characterReducers';
import world from './worldReducers';
import menu from './menuReducers';

const reducers = combineReducers({
  characters,
  world,
  menu
});

export default reducers;