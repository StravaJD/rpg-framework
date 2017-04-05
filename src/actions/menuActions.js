import { SELECT_OPTION } from '../utils/actionTypes';

export function selectOption(currentOption, nextOption) {
  return {
    type: SELECT_OPTION,
    currentOption,
    nextOption
  };
}