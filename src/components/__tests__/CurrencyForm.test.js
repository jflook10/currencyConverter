import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import CurrencyForm from "../CurrencyForm";
import {currencyOptions, exchangeRates } from "../../mocks/mocks";

const props = {
    currencyOptions,
    exchangeRates,
    updateBody: jest.fn()
}

describe('Currency Form', () => {
    it('starts adding chars from the right-most decimal', () => {
        const { getByTestId } = render(<CurrencyForm {...props} />)
        const input = getByTestId('currencyForm-currencyInput')
        fireEvent.change(input, { target: { value: '12' } })
        expect(input.value).toBe("0.12")
    })
    it('shows disabled submit button on load or 0 base value', () => {
        const { getByTestId } = render(<CurrencyForm {...props} />)
        const submitButton = getByTestId('currencyForm-submitBtn')
        const input = getByTestId('currencyForm-currencyInput')

        //initial load
        expect(submitButton.disabled).toBe(true)

        //onChange with data
        fireEvent.change(input, { target: { value: '12' } })
        expect(submitButton.disabled).toBe(false)

        //cleared input, 0 base value
        fireEvent.change(input, { target: { value: '' } })
        expect(submitButton.disabled).toBe(true)

    })
    it('tooltip only shows up when disabled', async() => {
        const { getByTestId, queryByTestId } = render(<CurrencyForm {...props} />)
        const tooltip = queryByTestId('currencyForm-tooltip')
        const input = getByTestId('currencyForm-currencyInput')

        //initial load shows tooltip
        expect(tooltip).toBeTruthy()

        //no tooltip when value entered
        fireEvent.change(input, { target: { value: '12' } })
        expect(queryByTestId('currencyForm-tooltip')).toBeNull()

        //cleared input shows tooltip
        fireEvent.change(input, { target: { value: '' } })
        expect(tooltip).toBeTruthy()
    })
})