// Coloque aqui suas actions
export const CHANGE_USER = 'CHANGE_USER';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const GET_EXPENSES = 'EXPENSES';

export const changeUser = (value) => ({
  type: CHANGE_USER,
  payload: value,
});

export const getCurrencies = (currencies) => ({
  type: GET_CURRENCIES,
  currencies,
});

export const getExpenses = (expenses) => ({
  type: GET_EXPENSES,
  expenses,
});

export const fetchCurrenciesThunk = () => async (dispatch) => {
  const apiCurrencies = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await apiCurrencies.json();
  delete data.USDT;
  const newData = Object.values(data);
  const currencies = newData.map(({ code }) => code);
  dispatch(getCurrencies(currencies));
};
