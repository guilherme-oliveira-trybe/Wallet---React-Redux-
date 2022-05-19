// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import { GET_CURRENCIES, GET_EXPENSES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const walletReduce = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCIES:
    return {
      ...state,
      currencies: [...action.currencies],
    };
  case GET_EXPENSES:
    return {
      ...state,
      expenses: [...action.expenses],
    };
  default:
    return state;
  }
};

export default walletReduce;
