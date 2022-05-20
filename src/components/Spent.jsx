import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Spent extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
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
        </thead>
        <tbody>
          {expenses.map(
            ({ id, description, tag, method, value, currency, exchangeRates }) => (
              <tr key={ id }>
                <td>{ description }</td>
                <td>{ tag }</td>
                <td>{method}</td>
                <td>{ Number(value).toFixed(2) }</td>
                <td>{ exchangeRates[currency].name }</td>
                <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
                <td>{ Number(value * exchangeRates[currency].ask).toFixed(2)}</td>
                <td> Real </td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Spent.propTypes = {
  expenses: propTypes.arrayOf(propTypes.array),
}.isRequired;

export default connect(mapStateToProps)(Spent);
