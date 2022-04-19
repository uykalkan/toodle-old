import React from 'react';
import {fireEvent, getByText, render, screen} from '@testing-library/react';
import App from './';
import AppProvider from "../providers/AppProvider";

window.matchMedia = window.matchMedia || function() {return {matches: false,addListener: function() {},removeListener: function() {}};};

test('renders Create a Job button', () => {
    render(<AppProvider><App /></AppProvider>)
    const linkElement = screen.getByText(/Create a Job/i)
    expect(linkElement).toBeInTheDocument()
})

test('open modal and render Save button', () => {
    render(<AppProvider><App /></AppProvider>)
    const linkElement = screen.getByText(/Create a Job/i)

    fireEvent.click(linkElement)

    const modalElement = screen.getByText(/Save/i)

    expect(modalElement).toBeInTheDocument()
});