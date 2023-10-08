import React, { useState } from 'react';
import './App.css'; // Import your CSS file
import config from './config'; // Import your configuration file

function App() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await fetch(`${config.apiUrl}/search?query=${searchQuery}`);
            console.log(response);

            if (!response.ok) {
                throw new Error(`Network response was not ok (status ${response.status})`);
            }

            const data = await response.json();
            console.log('Data received from backend:', data);
            setSearchResults(data); // Assuming the backend returns search results in JSON format
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1 className="App-title">ChronoQuest</h1>
                <p className="App-subtitle">
                    An adventurous journey through the world of watches and brands
                </p>
                {/* Add a search bar below the subtitle */}
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Enter a watch brand to begin quest...."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        data-cy="search-input" // Add this attribute 
                    />
                    <button onClick={handleSearch} data-cy="search-button">
                        <img src={process.env.PUBLIC_URL + '/watch_logo1.png'} alt="Watch Logo" />
                    </button>
                </div>
                <div className="search-results">
                    <h2>Search Results:</h2>
                    <ul>
                        {searchResults.map((result) => (
                            <li key={result.id}>{result.name}</li>
                            // Assuming each result has a unique 'id' and 'name' property
                        ))}
                    </ul>
                </div>
            </header>
            {/* Add your other components and content here */}
        </div>
    );
}

export default App;