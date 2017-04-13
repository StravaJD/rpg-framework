import { combineReducers } from 'redux';
import characters from './characterReducers';
import world from './worldReducers';
import menu from './menuReducers';
import worldBuilder from './worldBuilderReducers';

const reducers = combineReducers({
  characters,
  world,
  menu,
  worldBuilder
});

export default reducers;