import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { fetchCurrencyFromAPI } from '../actions';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import WalletTable from '../components/WalletTable';

class Wallet extends React.Component {
  componentDidMount() {
    const { saveCurrenciesRedux } = this.props;
    saveCurrenciesRedux();
  }

  render() {
    return (
      <>
        <Header />
        <WalletForm />
        <WalletTable />
        <div>TrybeWallet</div>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveCurrenciesRedux: () => dispatch(fetchCurrencyFromAPI()),
});

Wallet.propTypes = {
  saveCurrenciesRedux: propTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Wallet);
