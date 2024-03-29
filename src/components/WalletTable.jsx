import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeExpense, buttonEditMode } from '../actions';

class ExpenseTable extends React.Component {
  render() {
    const { allExpenses, deleteThisExpense, turnEditModeOn } = this.props;
    return (
      <table>
        <tbody>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
          {allExpenses
            .map(({ currency, description, id, method, tag, value, exchangeRates }) => (
              <tr key={ id }>
                <td>{ description }</td>
                <td>{ tag }</td>
                <td>{ method }</td>
                <td>{ Number(value).toFixed(2) }</td>
                <td>{ exchangeRates[currency].name.split('/')[0]}</td>
                <td>{ Number(exchangeRates[currency].ask).toFixed(2) }</td>
                <td>{ (value * exchangeRates[currency].ask).toFixed(2) }</td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => turnEditModeOn(id) }
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => deleteThisExpense(id) }
                  >
                    Excluir

                  </button>
                </td>
              </tr>))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  allExpenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteThisExpense:
  (idToDelete) => dispatch(removeExpense(idToDelete)),
  turnEditModeOn: (id) => dispatch(buttonEditMode(id)),
});

ExpenseTable.propTypes = {
  allExpenses: propTypes.arrayOf(propTypes.shape()).isRequired,
  deleteThisExpense: propTypes.func.isRequired,
  turnEditModeOn: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTable);
