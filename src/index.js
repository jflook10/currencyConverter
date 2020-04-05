import React, {Component} from 'react';
import ReactDOM from "react-dom";
import CurrencyForm from './components/CurrencyForm'
import "./styles.css";
import {currenciesURL, exchangeRateURL} from "./utils/currencies";
import Header from "./components/Header";

class App extends Component {
    state = {
        loadedCurrency: false,
        loadedExchangeRates: false,
        currencyOptions: null,
        exchangeRates: null,
    }

    componentDidMount() {
        fetch(currenciesURL)
            .then(res => res.json())
            .then(
                (result) => {
                    const arrResult = Object.keys(result).map(function(key) {
                        return  result[key];
                    });
                    this.setState({
                        loadedCurrency: true,
                        currencyOptions: arrResult
                    });
                },
                (error) => {
                    this.setState({
                        loadedCurrency: true,
                    });
                    console.log(error)
                }
            )
        fetch(exchangeRateURL)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        loadedExchangeRates: true,
                        exchangeRates: result.rates,
                    });
                },
                (error) => {
                    console.log(error)
                }
            )
    }

    render() {
        const { loadedExchangeRates, loadedCurrency, currencyOptions, exchangeRates} = this.state
        const exchangeRateKeys = loadedExchangeRates ? Object.keys(exchangeRates) : []
        const filterCurrencyOptions =  (loadedExchangeRates && loadedCurrency) ? currencyOptions.filter(option => exchangeRateKeys.includes(option.code)) : null;

        return <div>
            <Header />
            { (loadedExchangeRates && loadedCurrency) ? <CurrencyForm currencyOptions={filterCurrencyOptions} exchangeRates={exchangeRates}/> : null }
        </div>;
    }
}

ReactDOM.render( <App />, document.getElementById("root"));
