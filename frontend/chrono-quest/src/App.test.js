import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import App from './App';
import { act } from 'react-dom/test-utils';

// Mock the config module to provide a fake apiUrl
jest.mock('./config', () => ({
    apiUrl: 'http://localhost:3000', // Replace with your fake API URL
}));


// Mocking the fetch function
beforeEach(() => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve([{ id: 1, name: 'Rolex Submariner' }]), // Mock a response with 'Rolex'
        })
    );
});

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

test('performs a search for "Rolex" and displays results', async () => {
    render(<App />);

    // Find the search input and button
    const searchInput = screen.getByPlaceholderText('Enter a watch brand to begin quest....');
    fireEvent.change(searchInput, { target: { value: 'Rolex' } });

    // Trigger the search
    const searchButton = screen.getByAltText('Watch Logo');

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
        fireEvent.click(searchButton);
    });

    // Wait for the mocked fetch call to resolve
    await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    // Check if the search results are displayed
    const searchResults = screen.getByText('Search Results:');
    expect(searchResults).toBeInTheDocument();

    // Check if the result 'Rolex Submariner' is displayed
    const resultItem = screen.getByText('Rolex Submariner');
    expect(resultItem).toBeInTheDocument();
});
