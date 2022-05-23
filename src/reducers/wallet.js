// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import {
  GET_CURRENCIES, GET_EXPENSES, DELETE_SPENT, EDIT_SPENT, SAVE_CHANGES,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isEdit: false,
  editId: '',
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
      expenses: [...state.expenses, action.expenses],
    };
  case DELETE_SPENT:
    return {
      ...state,
      expenses: action.expenses,
    };
  case EDIT_SPENT:
    return {
      ...state,
      isEdit: true,
      editId: action.id,
    };
  case SAVE_CHANGES:
    return {
      ...state,
      expenses: [...action.expenses],
      isEdit: false,
    };
  default:
    return state;
  }
};

export default walletReduce;
