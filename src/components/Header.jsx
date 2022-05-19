import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Header extends Component {
  updateSumTotal = () => {
    const { expenses } = this.props;
    const total = expenses
      .reduce((acc, curr) => (
        acc + (curr.value * curr.exchangeRates[curr.currency].ask)), 0);
    return total.toFixed(2);
  }

  render() {
    const { email } = this.props;
    return (
      <div>
        <span data-testid="email-field">{ email }</span>
        <span data-testid="total-field">{ this.updateSumTotal() }</span>
        <span data-testid="header-currency-field">R$ BRL</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: propTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
