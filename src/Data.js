import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Data = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state?.data;
  const baseCurrency = location.state?.currencyCode || 'USD';

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatExchangeRate = (value) => {
    return value.toFixed(4);
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      padding: '24px',
      backgroundColor: '#f8f9fa'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        position: 'relative'
      }}>
        <button 
          onClick={() => navigate('/')}
          style={{
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            padding: '8px 16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '16px'
          }}
        >
          ← Back
        </button>

        <div style={{ paddingTop: '64px' }}>
          <h1 style={{ 
            fontSize: '28px', 
            fontWeight: 'bold', 
            marginBottom: '32px', 
            textAlign: 'center',
            color: '#333'
          }}>
            Exchange Rate Details
          </h1>

          {data ? (
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              {Object.entries(data.data).map(([currency, details]) => (
                <div key={currency} style={{
                  marginBottom: '20px',
                  padding: '20px',
                  borderRadius: '8px',
                  backgroundColor: '#f8f9fa'
                }}>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      marginBottom: '8px'
                    }}>
                      <div style={{
                        fontSize: '24px',
                        fontWeight: 'bold',
                        color: '#333'
                      }}>
                        1 {baseCurrency}
                      </div>
                      <div style={{
                        fontSize: '20px',
                        color: '#666'
                      }}>
                        =
                      </div>
                      <div style={{
                        fontSize: '24px',
                        color: '#007bff',
                        fontWeight: 'bold'
                      }}>
                        {formatExchangeRate(details.value)} {details.code}
                      </div>
                    </div>
                    
                    <div style={{
                      fontSize: '16px',
                      color: '#666',
                      textAlign: 'center'
                    }}>
                      Exchange rate from {baseCurrency} to {details.code}
                    </div>
                  </div>
                </div>
              ))}
              
              <div style={{
                marginTop: '24px',
                padding: '16px',
                borderTop: '1px solid #eee',
                color: '#666',
                fontSize: '14px'
              }}>
                <p>Last Updated: {formatDate(data.meta.last_updated_at)}</p>
              </div>
            </div>
          ) : (
            <div style={{
              textAlign: 'center',
              color: '#666',
              padding: '24px'
            }}>
              No exchange rate data available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Data;