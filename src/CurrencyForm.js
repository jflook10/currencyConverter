import React, {Component} from 'react';

import "./styles.css";

class CurrencyForm extends Component {
    state = {
        loadedCurrency: false,
        baseCurrency: "",
        baseAmount: 0,
        exchangeCurrency: "",
        exchangedAmount: 0,
    };
    handleSubmit = () => {
        console.log("Hello")
    }

    handleChange(keyName, event) {
        this.setState({[keyName]: event.target.value});
    }

    getCurrencyOptions = () => {
        const { currencyOptions } = this.props
        console.log({currencyOptions})
        return currencyOptions.map(value => <option key={value.name} value={value.name}>{`${value.name}: ${value.symbol}`}</option>)
    }

    render() {
        const { baseAmount, baseCurrency, exchangeCurrency } = this.state
        return <form onSubmit={this.handleSubmit} className="form">
            <label className="label">
                Base Amount
            </label>
            <input
        className="input"
        type="number"
        name="base amount"
        value={baseAmount}
        onChange={(e) => {this.handleChange("baseAmount", e)}}
        placeholder="1.60"
        autoComplete="off"
        minLength={3}
        required
        />
        <label className="label">
            Base Currency
        </label>
        <select value={baseCurrency} onChange={(e) => {this.handleChange("baseCurrency", e)}}>
            {this.getCurrencyOptions()}
        </select>
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
        </form>

    }
}

export default CurrencyForm