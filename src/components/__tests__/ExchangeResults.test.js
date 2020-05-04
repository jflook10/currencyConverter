import React from 'react'
import ExchangeResults from "../ExchangeResults";
import {fireEvent, render} from "@testing-library/react";
import {currencyOptions} from "../../mocks/mocks";

const props = {
    baseAmount: "1.22",
    baseCurrency: currencyOptions[0],
    exchangeCurrency:  currencyOptions[1],
    equivalentValue: 2.4438909034
}

describe('Exchange Results', () => {
    it('properly formats the base amount', () => {
        const { getByText } = render(<ExchangeResults {...props} />)
        const base = getByText(`${props.baseCurrency.symbol} 1.22 ${props.baseCurrency.code} =`)
        expect(base).toBeTruthy()

    })
    it('properly formats the equivalent value', () => {
        const { getByText } = render(<ExchangeResults {...props} />)
        const equivalent = getByText(`2.444`)
        expect(equivalent).toBeTruthy()

    })})