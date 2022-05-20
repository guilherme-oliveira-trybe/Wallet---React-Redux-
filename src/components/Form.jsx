import propTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchExchangeThunk } from '../actions';

class Form extends Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    };
  }

  changeHandler = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  }

  onClick = async () => {
    const { state } = this;
    const { dispatch } = this.props;
    dispatch(fetchExchangeThunk(state));
    this.updateStatus();
  }

  updateStatus = () => {
    this.setState(({ id }) => ({
      id: id + 1,
      value: '',
    }));
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies } = this.props;
    return (
      <form>
        <label htmlFor="amount">
          Valor
          <input
            data-testid="value-input"
            name="value"
            id="amount"
            value={ value }
            onChange={ this.changeHandler }
          />
        </label>
        <label htmlFor="description">
          Descrição
          <input
            data-testid="description-input"
            name="description"
            id="description"
            value={ description }
            onChange={ this.changeHandler }
          />
        </label>
        <label htmlFor="currencies">
          Moeda
          <select
            name="currency"
            id="currencies"
            value={ currency }
            onChange={ this.changeHandler }
          >
            { currencies.map((coin, index) => <option key={ index }>{coin}</option>)}
          </select>
        </label>
        <label htmlFor="payout">
          Tipo de Pagamento
          <select
            data-testid="method-input"
            name="method"
            id="payout"
            value={ method }
            onChange={ this.changeHandler }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="category">
          Categoria
          <select
            data-testid="tag-input"
            name="tag"
            id="category"
            value={ tag }
            onChange={ this.changeHandler }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <button
          type="button"
          onClick={ this.onClick }
        >
          Adicionar despesa
        </button>
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
