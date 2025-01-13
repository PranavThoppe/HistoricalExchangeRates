import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Data from './Data'; // Import your Data component
import './App.css';

function InputField({ label, type = 'text', placeholder, value, onChange }) {
  return (
    <div className="input-field">
      <label className="input-label">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="input-box"
      />
    </div>
  );
}

function Home() {
  const navigate = useNavigate();
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
  
      // Pass both the data and the currency code
      navigate('/data', { 
        state: { 
          data,
          currencyCode: currencyCode.toUpperCase() 
        }
      });
    } catch (error) {
      console.error('Error fetching currency data:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Currency Data Fetcher</h1>
        <InputField
          label="Base Currency Code"
          placeholder="e.g., USD"
          value={currencyCode}
          onChange={(e) => setCurrencyCode(e.target.value)}
        />
        <InputField
          label="Target Currency Code"
          placeholder="e.g., EUR"
          value={targetCurrency}
          onChange={(e) => setTargetCurrency(e.target.value)}
        />
        <InputField
          label="Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button
          onClick={fetchCurrencyData}
          className="fetch-button"
        >
          Fetch Currency Data
        </button>
      </header>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/data" element={<Data />} /> {/* Use the imported Data component */}
    </Routes>
  );
}

export default App;