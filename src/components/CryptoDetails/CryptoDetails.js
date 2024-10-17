import React from 'react';
import './CryptoDetails.css';

const CryptoDetails = ({ crypto }) => {
    if (!crypto) return null;

    return (
        <div className="crypto-details">
            <h2>{crypto.name}</h2>
            <img src={crypto.image} alt={crypto.name} className="crypto-icon" />
            <div className="crypto-info">
                <p>Preço Atual: <span className="highlight">${crypto.current_price.toFixed(2)}</span></p>
                <p>Variação (24h): <span className={`highlight ${crypto.price_change_percentage_24h >= 0 ? 'positive' : 'negative'}`}>
                    {crypto.price_change_percentage_24h.toFixed(2)}%
                </span></p>
                <p>Capitalização de Mercado: <span className="highlight">${crypto.market_cap.toLocaleString()}</span></p>
                <p>Volume (24h): <span className="highlight">${crypto.total_volume.toLocaleString()}</span></p>
                <p>Rank: <span className="highlight">{crypto.market_cap_rank}</span></p>
                <p>Símbolo: <span className="highlight">{crypto.symbol.toUpperCase()}</span></p>
            </div>
        </div>
    );
};

export default CryptoDetails;