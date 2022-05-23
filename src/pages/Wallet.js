import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from '../components/Header';
import { fetchCurrenciesThunk } from '../actions';
import Form from '../components/Form';
import EditForm from '../components/EditForm';
import Spent from '../components/Spent';

class Wallet extends React.Component {
  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrenciesThunk());
  }

  render() {
    const { isEdit } = this.props;
    return (
      <header>
        <Header />
        {
          !isEdit ? <Form /> : <EditForm />
        }
        <Spent />
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  isEdit: state.wallet.isEdit,
});

Wallet.propTypes = {
  dispatch: propTypes.func,
  isEdit: propTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Wallet);
