import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { saveEmail } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      userEmail: '',
      userPassword: '',
      isButtonDisabled: true,
    };
  }

  handleInputChange = ({ target: { name, value } }) => {
    this.setState(
      () => ({ [name]: value }),
      () => this.validateInputs(),
    );
  }

  validateInputs = () => {
    const { userEmail, userPassword } = this.state;
    const validatePassword = 6;
    const validateEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const isLoginTrue = (validateEmail.test(userEmail)
      && userPassword.length >= validatePassword);

    this.setState({
      isButtonDisabled: !isLoginTrue,
    });
  }

  render() {
    const { userEmail, userPassword, isButtonDisabled } = this.state;
    const { emailProp, history } = this.props;
    return (
      <>
        <div>Login</div>
        <label htmlFor="userEmail">
          E-mail:
          <input
            type="email"
            name="userEmail"
            data-testid="email-input"
            value={ userEmail }
            onChange={ this.handleInputChange }
          />
        </label>
        <label htmlFor="userPassword">
          Senha:
          <input
            type="password"
            name="userPassword"
            data-testid="password-input"
            value={ userPassword }
            onChange={ this.handleInputChange }
          />
        </label>
        <button
          type="button"
          disabled={ isButtonDisabled }
          onClick={ () => {
            emailProp(userEmail);
            history.push('/carteira');
          } }
        >
          Entrar

        </button>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  emailProp: (emailToSave) => dispatch(saveEmail(emailToSave)),
});

Login.propTypes = {
  emailProp: propTypes.func.isRequired,
  history: propTypes.shape().isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
