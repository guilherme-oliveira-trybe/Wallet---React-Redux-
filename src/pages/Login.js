import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { changeUser } from '../actions';
import styles from './Login.module.css';
import walletImg from '../img/Wallet.png';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      emailInput: '',
      passwordInput: '',
      disable: true,
    };
  }

  changeHandler = ({ target }) => {
    const { name, value } = target;

    this.setState(({
      [name]: value,
    }), () => this.inputValidation());
  }

  inputValidation = () => {
    const email = this.validEmail();
    const password = this.validPassword();

    if (email && password) {
      return (
        this.setState({
          disable: false,
        })
      );
    }
    return (
      this.setState({
        disable: true,
      })
    );
  }

  validPassword = () => {
    const { passwordInput } = this.state;
    const MIN_LENGTH = 6;
    let disable = false;

    if (passwordInput.length >= MIN_LENGTH) {
      disable = true;
    } else {
      disable = false;
    }
    return disable;
  }

  validEmail = () => {
    const { emailInput } = this.state;
    const regExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/i;

    return regExp.test(emailInput);
  }

  render() {
    const { emailInput, passwordInput, disable } = this.state;
    const { saveEmail } = this.props;
    return (
      <main className={ styles.container }>
        <img src={ walletImg } alt="imagem de carteira" />
        <div>
          <input
            data-testid="email-input"
            type="email"
            name="emailInput"
            placeholder="Email"
            value={ emailInput }
            onChange={ this.changeHandler }
          />
          <input
            data-testid="password-input"
            type="password"
            name="passwordInput"
            placeholder="Senha"
            value={ passwordInput }
            onChange={ this.changeHandler }
          />
        </div>
        <Link to="/carteira">
          <button
            type="button"
            disabled={ disable }
            onClick={ () => saveEmail(emailInput) }
          >
            Entrar

          </button>
        </Link>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveEmail: (email) => {
    dispatch(changeUser(email));
  },
});

Login.propTypes = {
  saveEmail: propTypes.string,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
