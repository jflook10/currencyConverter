import React from 'react'
import '@testing-library/jest-dom/extend-expect'

import CurrencyForm from "../CurrencyForm";
import {currencyOptions, exchangeRates } from "./mocks";

const props = {
  currencyOptions,
    exchangeRates,
    updateBody: jest.fn()
}

describe('Currency Form', () => {
    it('starts adding chars from the right-most decimal', () => {
        const { getByTestId } = render(<CurrencyForm {...props} />)
        const input = getByTestId('currencyForm-currencyInput')
        // fireEvent.change(input, { target: { value: 'edited yo' } })
        fireEvent.keyPress(input, { key: '1' })
        fireEvent.keyPress(input, { key: '2' })
        expect(input.value).toBe(0.12)
    })
    it.todo('shows disabled submit button on load or 0 base value', () => {})
    it.todo('tooltip only shows up when disabled', () => {})
})