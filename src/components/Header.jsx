import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import walletImg from '../img/imgWalletPage.png';
import styles from './Header.module.css';

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
      <header className={ styles.container }>
        <div className={ styles.contentEmail }>
          <img src={ walletImg } alt="imagem da carteira" />
          <span data-testid="email-field">{ email }</span>
        </div>
        <div className={ styles.contentValues }>
          <span data-testid="total-field">{`R$ ${this.updateSumTotal()}` }</span>
          <p data-testid="header-currency-field">BRL</p>
        </div>
      </header>
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
