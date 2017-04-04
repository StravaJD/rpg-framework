import { combineReducers } from 'redux';
import characters from './characterReducers';
import world from './worldReducers';

const reducers = combineReducers({
  characters,
  world
});

export default reducers;