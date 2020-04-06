import React from 'react';

import "../styles.css"

//TODO fix the var declarations
const ExchangeResults = ({baseAmount, baseCurrency, exchangeCurrency, equivalentValue}) => {
        return (<div className="resultsWrapper">
                    <div className="convertRegularSize">
                        {baseCurrency.symbol} {baseAmount} {baseCurrency.code} =
                    </div>
                    <div className="resultsToWrapper">
                        <span className="convertRegularSize">{exchangeCurrency.symbol}</span>
                        <span className="convertLargeSize"> {equivalentValue} </span>
                        <span className="convertRegularSize">{exchangeCurrency.code}</span>
                    </div>
                </div>
        )
    }

export default ExchangeResults