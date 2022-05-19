import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from '../components/Header';
import { fetchCurrenciesThunk } from '../actions';

class Wallet extends React.Component {
  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrenciesThunk());
  }

  render() {
    return (
      <header>
        <Header />
      </header>
    );
  }
}

Wallet.propTypes = {
  dispatch: propTypes.func,
}.isRequired;

export default connect()(Wallet);
