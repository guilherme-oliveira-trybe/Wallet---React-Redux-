import propTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Form extends Component {
  render() {
    const { currencies } = this.props;
    return (
      <form>
        <label htmlFor="amount">
          Valor
          <input data-testid="value-input" name="amount" />
        </label>
        <label htmlFor="description">
          Descrição
          <input data-testid="description-input" name="description" />
        </label>
        <label htmlFor="currencies">
          Moeda
          <select
            name="currencies"
            id="currencies"
          >
            { currencies.map((coin, index) => <option key={ index }>{coin}</option>)}
          </select>
        </label>
        <label htmlFor="payout">
          Tipo de Pagamento
          <select data-testid="method-input" name="payout">
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="category">
          Categoria
          <select data-testid="tag-input" name="category">
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

Form.propTypes = {
  currencies: propTypes.arrayOf(propTypes.array),
}.isRequired;

export default connect(mapStateToProps)(Form);
