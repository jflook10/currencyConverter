import React, {Component} from 'react';
import fx from "money";

import "../styles.css"
import CurrencyForm from "./CurrencyForm";
import ExchangeResults from "./ExchangeResults";
import {currenciesURL, exchangeRateURL} from "../utils/currencies";

class ExchangeBody extends Component {
    state = {
        loadedCurrency: false,
        loadedExchangeRates: false,
        currencyOptions: null,
        exchangeRates: null,

        baseAmount: null,
        baseCurrency: {
            symbol: "$",
            name: "US Dollar",
            code: "USD"
        },
        exchangeCurrency: {
            symbol: "€",
            name: "Euro",
            code: "EUR"
        },
        equivalentValue: null,
    };

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
                }
            ).catch(error => {
                this.setState({
                    loadedCurrency: true,
                });
                console.log(error)
        })
        fetch(exchangeRateURL)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        loadedExchangeRates: true,
                        exchangeRates: result.rates,
                    });
                },
            ).catch((error) => {
            console.log(error)
        })
    }

    handleChange(input) {
        const value = fx.convert(input.baseAmount, {from: input.baseCurrency.code, to: input.exchangeCurrency.code});

        this.setState({
            baseAmount: input.baseAmount,
            baseCurrency: input.baseCurrency,
            exchangeCurrency: input.exchangeCurrency,
            equivalentValue: value,
        });
    }

    render(){
        const { loadedCurrency, loadedExchangeRates, currencyOptions, exchangeRates, baseAmount, baseCurrency, exchangeCurrency, equivalentValue } = this.state
        const exchangeRateKeys = loadedExchangeRates ? Object.keys(exchangeRates) : []
        const filterCurrencyOptions =  (loadedExchangeRates && loadedCurrency) ? currencyOptions.filter(option => exchangeRateKeys.includes(option.code)) : null;

        fx.base = "USD"
        fx.rates = this.state.exchangeRates

        return <div data-testid={"exchangeBody"}>
            { ( loadedExchangeRates && loadedCurrency) ? <CurrencyForm  currencyOptions={filterCurrencyOptions} exchangeRates={exchangeRates} updateBody={(input) => this.handleChange(input)}/>: null}
            {  equivalentValue ? <ExchangeResults  baseAmount={baseAmount} baseCurrency={baseCurrency} exchangeCurrency={exchangeCurrency} equivalentValue={equivalentValue} /> : null}
        </div>
    }
}

export default ExchangeBody