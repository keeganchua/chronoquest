import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import App from './App';

test('renders App component', () => {
    render(<App />);
    const appTitle = screen.getByText('ChronoQuest');
    expect(appTitle).toBeInTheDocument();
});

test('searching for a brand updates the search results', async () => {
    render(<App />);

    const searchInput = screen.getByPlaceholderText('Enter a watch brand to begin quest...');
    const searchButton = screen.getByAltText('Watch Logo');

    fireEvent.change(searchInput, { target: { value: 'Rolex' } });
    fireEvent.click(searchButton);

    // Use waitFor to wait for the search results to appear
    await waitFor(() => {
        const searchResults = screen.getByText('Search Results:');
        expect(searchResults).toBeInTheDocument();
    });

    // Use separate expect statements to check individual conditions
    const searchResultItem = screen.getByText('Rolex'); // Assuming 'Rolex' is in the search results
    expect(searchResultItem).toBeInTheDocument();
});
