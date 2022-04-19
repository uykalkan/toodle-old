import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './';

test('renders create a job button', () => {
    render(<App />);
    const linkElement = screen.getByText(/Create a Job/i);
    expect(linkElement).toBeInTheDocument();
});
