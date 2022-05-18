// Esse reducer será responsável por tratar as informações da pessoa usuária

import { CHANGE_USER } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const userReduce = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CHANGE_USER:
    return {
      email: action.payload,
    };
  default:
    return state;
  }
};

export default userReduce;
