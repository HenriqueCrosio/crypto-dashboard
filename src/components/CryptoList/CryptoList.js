import React from 'react';
import './CryptoList.css';
import { FaChevronDown } from 'react-icons/fa'; // Importando o ícone de seta

const CryptoList = ({ cryptos, onCryptoSelect, selectedCryptoId }) => {
    if (!cryptos || cryptos.length === 0) {
        return <div className="loading-message">Carregando criptomoedas...</div>;
    }

    return (
        <div className="crypto-list">
            {cryptos.map((crypto) => (
                <div 
                    key={crypto.id} 
                    className={`crypto-item ${selectedCryptoId === crypto.id ? 'selected' : ''}`} 
                    onClick={() => onCryptoSelect(crypto)}
                >
                    <img src={crypto.image} alt={crypto.name} className="crypto-icon" />
                    <h2 className="crypto-name">
                        {crypto.name} 
                        <FaChevronDown className={`expand-icon ${selectedCryptoId === crypto.id ? 'rotated' : ''}`} />
                    </h2>
                </div>
            ))}
        </div>
    );
};

export default CryptoList;