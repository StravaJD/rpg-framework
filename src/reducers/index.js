import { combineReducers } from 'redux';
import characters from './characterReducers';

const appReducers = combineReducers({
  characters
});

export default appReducers;