import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import App from './App';

test('renders App component', () => {
    render(<App />);
    const appTitle = screen.getByText('ChronoQuest');
    expect(appTitle).toBeInTheDocument();
});

