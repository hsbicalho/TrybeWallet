import {
  FETCH_CURRENCIES,
  GET_CURRENCIES,
  SAVE_EXPENSES,
  REMOVE_EXPENSE,
  EXPENSE_BUTTON,
  UPDATE_WALLET,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_CURRENCIES:
    return { ...state, currencies: action.payload };
  case FETCH_CURRENCIES:
    return state;
  case SAVE_EXPENSES:
    return { ...state, expenses: [...state.expenses, action.payload] };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter(({ id }) => id !== action.payload),
    };
  case EXPENSE_BUTTON:
    return { ...state, editMode: true, idToEdit: action.payload };
  case UPDATE_WALLET:
    return { ...state, expenses: action.payload };
  default:
    return state;
  }
}

export default wallet;
