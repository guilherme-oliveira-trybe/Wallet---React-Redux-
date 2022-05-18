// Coloque aqui suas actions
export const CHANGE_USER = 'CHANGE_USER';
export const CHANGE_WALLET = 'CHANGE_WALLET';

export const changeUser = (value) => ({
  type: CHANGE_USER,
  payload: value,
});

export const changeWallet = (currencies, expenses) => ({
  type: CHANGE_WALLET,
  currencies,
  expenses,
});
