import React, {Component} from 'react';
import CurrencyInput from 'react-currency-masked-input'
import "../styles.css"
import rightArrow from '../images/right-arrow.png'

class CurrencyForm extends Component {
    state = {
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
    };

    handleSubmit = (e) => {
        e.preventDefault()
        const { exchangeCurrency, baseAmount, baseCurrency} = this.state
        const { updateBody } = this.props

        const input = {
            baseAmount,
            baseCurrency,
            exchangeCurrency,
        }
        updateBody(input)
    }

    handleAmount = (amount) => {
        //FE char limit including decimal
        if(amount.length > 12) return
        this.setState({baseAmount: amount})
    }

    handleCurrency(keyName, e) {
        const currency = this.props.currencyOptions.find(option => option.code === e.target.value)
        this.setState({
            [keyName] : currency
        })
    }

    //TODO this rerenders too much IMO
    getCurrencyOptions = () => {
        const { currencyOptions } = this.props
        return currencyOptions.map(value => <option key={value.code} value={value.code}>{`${value.name}: ${value.symbol}`}</option>)
    }

    render() {
        const { baseAmount, baseCurrency, exchangeCurrency } = this.state

        return <form onSubmit={this.handleSubmit} className="form">
            <div className="inputWrapper">
                <label className="label">
                    Base Amount
                </label>
                <div className="maskedInputWrapper">
                    <p className="inputPrefix">{baseCurrency.symbol}</p>
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
            </div>
            <div className="selectWrapper">
                <label className="label">
                    Base Currency
                </label>
                <select className="selectInput" value={baseCurrency.code} onChange={(e) => {this.handleCurrency("baseCurrency", e)}}>
                    {this.getCurrencyOptions()}
                </select>
            </div>
            <div className="selectWrapper">
                <label className="label">
                    Exchange Currency
                </label>
                <select className="selectInput" value={exchangeCurrency.code} onChange={(e) => {this.handleCurrency("exchangeCurrency", e)}}>
                    {this.getCurrencyOptions()}
                </select>
            </div>
            <div className="tooltipWrapper">
                <button
                    className="submitBtn"
                    type="submit"
                    onClick={e=>this.handleSubmit(e)}
                    disabled={ baseAmount === "0.00" || !baseAmount }
                > <img src={rightArrow} alt="right arrow"/> </button>
                {(baseAmount === "0.00" || !baseAmount) ? <span className="tooltiptext">Please enter an amount</span> : null}

            </div>
        </form>

    }
}

export default CurrencyForm