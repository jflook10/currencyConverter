import React from 'react';
import PropTypes from "prop-types";

import accounting from 'accounting'
import "../styles.css"

const ExchangeResults = ({baseAmount, baseCurrency, exchangeCurrency, equivalentValue}) => {
    const formattedBaseAmount = accounting.formatNumber(baseAmount, 2)
    const formattedEquivalent = accounting.formatNumber(equivalentValue, 3)
        return (<div className="resultsWrapper" data-testid="exchangeResults-wrapper">
                    <div className="convertRegularSize" data-testid="exchangeResults-baseCurrency">
                        {baseCurrency.symbol} {formattedBaseAmount} {baseCurrency.code} =
                    </div>
                    <div className="resultsToWrapper" data-testid="exchangeResults-exchangeCurrency">
                        <span className="convertRegularSize">{exchangeCurrency.symbol}</span>
                        <span className="convertLargeSize"> {formattedEquivalent} </span>
                        <span className="convertRegularSize">{exchangeCurrency.code}</span>
                    </div>
                </div>
        )
    }

ExchangeResults.propTypes ={
    baseAmount: PropTypes.string.isRequired,
    baseCurrency: PropTypes.object.isRequired,
    exchangeCurrency: PropTypes.object.isRequired,
    equivalentValue: PropTypes.number.isRequired,
}

export default ExchangeResults