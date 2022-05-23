export const SAVE_EMAIL = 'SAVE_EMAIL';
export const FETCH_CURRENCIES = 'REQUEST_CURRENCIES';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const SAVE_EXPENSES = 'SAVE_EXPENSES';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const EXPENSE_BUTTON = 'EXPENSE_BUTTON';
export const UPDATE_WALLET = 'UPDATE_WALLET';

export const saveEmail = (emailAdress) => ({ type: SAVE_EMAIL, payload: emailAdress });

export const fetchCurrencies = () => ({ type: FETCH_CURRENCIES });

export const getCurrencies = (currencyArray) => ({
  type: GET_CURRENCIES, payload: currencyArray });

export function fetchCurrencyFromAPI() {
  return async (dispatch) => {
    dispatch(fetchCurrencies());

    const apiReturn = await fetch('https://economia.awesomeapi.com.br/json/all');
    const apiData = await apiReturn.json();
    const allCurrArray = Object.keys(apiData);

    dispatch(getCurrencies(allCurrArray));
  };
}

const saveExpenses = (formObject, id, exchangeRates) => ({
  type: SAVE_EXPENSES,
  payload: {
    id,
    ...formObject,
    exchangeRates,
  },
});

export function fetchCurrency(formObject, id) {
  return async (dispatch) => {
    dispatch(fetchCurrencies());
    const apiReturn = await fetch('https://economia.awesomeapi.com.br/json/all');
    const apiData = await apiReturn.json();
    dispatch(saveExpenses(formObject, id, apiData));
  };
}

export const removeExpense = (expenseToDeleteID) => (
  {
    type: REMOVE_EXPENSE,
    payload: expenseToDeleteID,
  });

export const buttonEditMode = (idToEdit) => (
  {
    type: EXPENSE_BUTTON,
    payload: idToEdit,
  });

export const updateWallet = (newExpenseArray) => (
  {
    type: UPDATE_WALLET,
    payload: newExpenseArray,
  });

export function updateEditChanges(oldExpensesArray, idToEdit, newValueObjects) {
  return (dispatch) => {
    const objectToBeChanged = oldExpensesArray[idToEdit];
    const newObject = {
      id: idToEdit,
      ...newValueObjects,
      exchangeRates: objectToBeChanged.exchangeRates };
    const newExpenses = oldExpensesArray
      .map((expenseObj) => (expenseObj.id === idToEdit ? newObject : expenseObj));
    dispatch(updateWallet(newExpenses));
  };
}
