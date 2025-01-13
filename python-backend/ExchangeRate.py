import React, { useState } from 'react';
import './App.css';

function App() {
  const [currencyCode, setCurrencyCode] = useState('');
  const [targetCurrency, setTargetCurrency] = useState('');
  const [date, setDate] = useState('');

  const fetchCurrencyData = async () => {
    try {
      const query = new URLSearchParams({
        target_currency: targetCurrency || undefined,
        date: date || undefined,
      }).toString();

      const response = await fetch(`http://localhost:5000/currency/${currencyCode}?${query}`);
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
        <h1>Currency Data Fetcher</h1>
        <div style={{ margin: '20px 0' }}>
          <input
            type="text"
            placeholder="Base currency code (e.g., USD)"
            value={currencyCode}
            onChange={(e) => setCurrencyCode(e.target.value)}
            style={{ padding: '10px', fontSize: '16px', width: '300px', marginBottom: '10px' }}
          />
        </div>
        <div style={{ margin: '20px 0' }}>
          <input
            type="text"
            placeholder="Target currency code (e.g., EUR)"
            value={targetCurrency}
            onChange={(e) => setTargetCurrency(e.target.value)}
            style={{ padding: '10px', fontSize: '16px', width: '300px', marginBottom: '10px' }}
          />
        </div>
        <div style={{ margin: '20px 0' }}>
          <input
            type="date"
            placeholder="Date (YYYY-MM-DD)"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={{ padding: '10px', fontSize: '16px', width: '300px', marginBottom: '10px' }}
          />
        </div>
        <button
          onClick={fetchCurrencyData}
          style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', borderRadius: '5px', backgroundColor: '#007BFF', color: 'white', border: 'none' }}
        >
          Fetch Currency Data
        </button>
      </header>
    </div>
  );
}

export default App;
