import propTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveChanges } from '../actions';

class EditForm extends Component {
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

  componentDidMount() {
    const { editId, expenses } = this.props;

    this.setState({
      id: editId,
      value: expenses[editId].value,
      description: expenses[editId].description,
      currency: expenses[editId].currency,
      method: expenses[editId].method,
      tag: expenses[editId].tag,
    });
  }

  changeHandler = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  }

  updateSpent = (editId) => {
    const { state } = this;
    const { expenses, dispatch } = this.props;
    const editSpent = {
      ...state,
      exchangeRates: expenses[editId].exchangeRates,
    };
    expenses[editId] = editSpent;
    dispatch(saveChanges(expenses));
  }

  validInputs = () => {
    const { value, description } = this.state;
    const MIN_LENGTH = 1;

    if (value >= MIN_LENGTH && description.length >= MIN_LENGTH) {
      return false;
    }
    return true;
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies, editId } = this.props;
    return (
      <form>
        <label htmlFor="amount">
          Valor
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
          disabled={ this.validInputs() }
          onClick={ () => this.updateSpent(editId) }
        >
          Editar despesa

        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editId: state.wallet.editId,
});

EditForm.propTypes = {
  currencies: propTypes.arrayOf(propTypes.array),
  expenses: propTypes.arrayOf(propTypes.array),
  editId: propTypes.number,
}.isRequired;

export default connect(mapStateToProps)(EditForm);
