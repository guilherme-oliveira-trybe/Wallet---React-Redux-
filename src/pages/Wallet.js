import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from '../components/Header';
import { fetchCurrenciesThunk } from '../actions';
import Form from '../components/Form';
import Spent from '../components/Spent';

class Wallet extends React.Component {
  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrenciesThunk());
  }

  render() {
    return (
      <header>
        <Header />
        <Form />
        <Spent />
      </header>
    );
  }
}

Wallet.propTypes = {
  dispatch: propTypes.func,
}.isRequired;

export default connect()(Wallet);
