import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import CryptoList from './components/CryptoList/CryptoList';
import CryptoDetails from './components/CryptoDetails/CryptoDetails';
import Footer from './components/Footer/Footer';
import { getCryptoData } from './services/cryptoService';

function App() {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCrypto, setSelectedCrypto] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCryptoData(6);
        setCryptos(data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCryptoSelect = (crypto) => {
    setSelectedCrypto(prevSelected => prevSelected && prevSelected.id === crypto.id ? null : crypto);
  };

  return (
    <div className="App">
      <Header />
      <main className="App-main">
        {loading ? (
          <div className="loading-message">Carregando...</div>
        ) : (
          <>
            <CryptoList 
              cryptos={cryptos}
              onCryptoSelect={handleCryptoSelect}
              selectedCryptoId={selectedCrypto ? selectedCrypto.id : null}
            />
            {selectedCrypto && <CryptoDetails crypto={selectedCrypto} />}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
