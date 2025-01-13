import React, { useState } from 'react';
import './App.css';

function App() {
  const [currencyCode, setCurrencyCode] = useState('');
  
  const handleInputChange = (e) => {
    setCurrencyCode(e.target.value);
  };

  const fetchCurrencyData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/currency/${currencyCode}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      console.log('Currency Data:', data);
    } catch (error) {
      console.error('Error fetching currency data:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Currency Converter</h1>
        <input
          type="text"
          placeholder="Enter currency code (e.g., USD)"
          value={currencyCode}
          onChange={handleInputChange}
        />
        <button onClick={fetchCurrencyData}>Fetch Currency Data</button>
      </header>
    </div>
  );
}

export default App;
