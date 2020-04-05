import React, {Component} from 'react';
import CurrencyInput from 'react-currency-masked-input'
import fx from 'money'

import "../styles.css"

class CurrencyForm extends Component {
    state = {
        baseAmount: null,
        exchangeCurrency: "USD",
        equivalentValue: null,
    };
    handleSubmit = (e) => {
        e.preventDefault()
        const { exchangeCurrency, baseAmount} = this.state

        const value = fx.convert(baseAmount, {from: "USD", to: exchangeCurrency});
        this.setState({
            equivalentValue:  value
        })
    }

    handleChange(keyName, event) {
        this.setState({[keyName]: event.target.value});
    }

    handleAmount = (value) => {
        this.setState({baseAmount: value})
    }

    //TODO this rerenders too much IMO
    getCurrencyOptions = () => {
        const { currencyOptions } = this.props
        return currencyOptions.map(value => <option key={value.code} value={value.code}>{`${value.name}: ${value.symbol}`}</option>)
    }

    render() {
        const { baseAmount, exchangeCurrency, equivalentValue } = this.state
        fx.base = "USD"
        fx.rates = this.props.exchangeRates

        return <form onSubmit={this.handleSubmit} className="form">
            <label className="label">
                Base Amount
            </label>
            <div className="currencyDiv">
                <span className="inputPrefix">$</span>
                <CurrencyInput
                    name="base amount"
                    placeholder="0.00"
                    value={baseAmount}
                    onChange={ (e, value) => this.handleAmount(value)}
                    type="text"
                    autoComplete="off"
                    className="currencyInput"
                />
            </div>

        <label className="label">
            Exchange Currency
        </label>
        <select value={exchangeCurrency} onChange={(e) => {this.handleChange("exchangeCurrency", e)}}>
            {this.getCurrencyOptions()}
        </select>
        <button
        className="submitBtn"
        type="submit"
        onClick={e=>this.handleSubmit(e)}
        >Exchange currency</button>
        { equivalentValue > 0 ?
            <div>
                The equivalent value is {equivalentValue}
            </div> : null
        }
        </form>

    }
}

export default CurrencyForm