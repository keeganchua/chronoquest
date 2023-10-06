import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import App from './App';

test('renders App component', () => {
    render(<App />);
    const appTitle = screen.getByText('ChronoQuest');
    expect(appTitle).toBeInTheDocument();
});  

test('renders App component with search input and button', () => {
    render(<App />);
    
    // Check if the search input is present
    const searchInput = screen.getByPlaceholderText('Enter a watch brand to begin quest....');
    expect(searchInput).toBeInTheDocument();
    
    // Check if the search button is present (assuming the alt text is 'Watch Logo')
    const searchButton = screen.getByAltText('Watch Logo');
    expect(searchButton).toBeInTheDocument();
});
