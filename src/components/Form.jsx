import propTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchExchangeThunk } from '../actions';
import styles from './Form.module.css';

class Form extends Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  componentDidMount() {
    const { expenses } = this.props;
    if (expenses.length > 0) {
      this.setState({
        id: expenses[expenses.length - 1].id + 1,
      });
    }
  }

  changeHandler = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  }

  addSpent = async () => {
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

  validInputs = () => {
    const { value, description } = this.state;
    const MIN_LENGTH = 1;

    if (value.length >= MIN_LENGTH && description.length >= MIN_LENGTH) {
      return false;
    }
    return true;
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies } = this.props;
    return (
      <form className={ styles.container }>
        <label htmlFor="amount">
          Valor:
          <input
            data-testid="value-input"
            type="number"
            name="value"
            id="amount"
            value={ value }
            onChange={ this.changeHandler }
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            data-testid="description-input"
            name="description"
            id="description"
            value={ description }
            onChange={ this.changeHandler }
          />
        </label>
        <label htmlFor="currencies">
          Moeda:
          <select
            data-testid="currency-input"
            name="currency"
            id="currencies"
            value={ currency }
            onChange={ this.changeHandler }
          >
            {currencies.map((coin, index) => <option key={ index }>{coin}</option>)}
          </select>
        </label>
        <label htmlFor="payout">
          Tipo de Pagamento:
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
          Categoria:
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
          disabled={ this.validInputs() }
          onClick={ this.addSpent }
        >
          Adicionar despesa

        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

Form.propTypes = {
  currencies: propTypes.arrayOf(propTypes.array),
  expenses: propTypes.arrayOf(propTypes.array),
}.isRequired;

export default connect(mapStateToProps)(Form);
