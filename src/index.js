import React, {Component} from 'react';
import ReactDOM from "react-dom";
import "./styles.css";
import Header from "./components/Header";
import ExchangeBody from "./components/ExchangeBody";

class App extends Component {
    render() {
        return <div className="app">
            <Header />
            <ExchangeBody/>
        </div>;
    }
}

ReactDOM.render( <App />, document.getElementById("root"));