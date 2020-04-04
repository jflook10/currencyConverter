import React, {Component} from 'react';
import ReactDOM from "react-dom";
import CurrencyForm from './CurrencyForm'
import "./styles.css";
import {currenciesURL} from "./utils/currencies";

class App extends Component {
    state = {
        loadedCurrency: false,
        currencyOptions: null,
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
                    console.log({arrResult})
                },
                (error) => {
                    this.setState({
                        loadedCurrency: true,
                    });
                    console.log(error)
                }
            )
    }
    render() {
        return <div>
            { this.state.currencyOptions ? <CurrencyForm currencyOptions={this.state.currencyOptions.slice(0,10)}/> : null }
        </div>;
    }
}

ReactDOM.render( <App />, document.getElementById("root"));
