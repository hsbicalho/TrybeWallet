import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrency, updateEditChanges } from '../actions';

class WalletForm extends React.Component {
  constructor() {
    super();

    this.state = {
      outgoing: '',
      descrip: '',
      currencyType: 'USD',
      payment: 'Dinheiro',
      source: '',
    };
  }

  handleInputChange = ({ target: { id, value } }) => {
    this.setState({
      [id]: value,
    });
  }

  resetForms = () => {
    this.setState({
      outgoing: '',
      descrip: '',
      currencyType: 'USD',
      payment: 'Dinheiro',
      source: 'Alimentação',
    });
  }

  render() {
    const {
      currencyList,
      nextId,
      saveThisExpense,
      editMode,
      idToEdit,
      allExpenses,
      editChange,
    } = this.props;
    const {
      outgoing,
      descrip,
      currencyType,
      payment,
      source,
    } = this.state;

    return (
      <form>

        <label htmlFor="outgoing">
          Valor:
          <input
            id="outgoing"
            type="number"
            data-testid="value-input"
            value={ outgoing }
            onChange={ this.handleInputChange }
          />
        </label>

        <label htmlFor="descrip">
          Descrição:
          <input
            id="descrip"
            type="text"
            data-testid="description-input"
            value={ descrip }
            onChange={ this.handleInputChange }
          />
        </label>

        <label htmlFor="currencyType">
          Moeda:
          <select
            id="currencyType"
            value={ currencyType }
            onChange={ this.handleInputChange }
            data-testid="currency-input"
          >
            {currencyList
              .map((currency, index) => (
                <option key={ index } value={ currency }>
                  { currency }
                </option>))}
          </select>
        </label>

        <label htmlFor="payment">
          <select
            id="payment"
            data-testid="method-input"
            value={ payment }
            onChange={ this.handleInputChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="source">
          <select
            id="source"
            data-testid="tag-input"
            value={ source }
            onChange={ this.handleInputChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>

        <button
          type="button"
          onClick={
            editMode
              ? () => editChange(allExpenses, idToEdit, { value: outgoing,
                description: descrip,
                currency: currencyType,
                method: payment,
                tag: source })
              : (() => {
                saveThisExpense({
                  value: outgoing,
                  description: descrip,
                  currency: currencyType,
                  method: payment,
                  tag: source,
                }, nextId);
                this.resetForms();
              })
          }
        >
          { editMode ? 'Editar despesa' : 'Adicionar despesa'}
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencyList: state.wallet.currencies,
  nextId: state.wallet.expenses.length,
  editMode: state.wallet.editMode,
  allExpenses: state.wallet.expenses,
  idToEdit: state.wallet.idToEdit,
});

const mapDispatchToProps = (dispatch) => ({
  saveThisExpense: (formObject, id) => dispatch(fetchCurrency(formObject, id)),
  editChange: (oldExpensesArray, idToEdit, newValueObjects) => dispatch(
    updateEditChanges(oldExpensesArray, idToEdit, newValueObjects),
  ),
});

WalletForm.propTypes = {
  currencyList: propTypes.arrayOf(propTypes.string).isRequired,
  nextId: propTypes.number.isRequired,
  saveThisExpense: propTypes.func.isRequired,
  editMode: propTypes.bool,
  idToEdit: propTypes.number,
  allExpenses: propTypes.arrayOf(propTypes.shape()).isRequired,
  editChange: propTypes.func.isRequired,
};

WalletForm.defaultProps = {
  editMode: false,
  idToEdit: 0,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
