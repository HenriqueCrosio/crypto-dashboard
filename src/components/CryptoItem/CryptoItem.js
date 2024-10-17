import React from 'react';
import './CardItem.css';

const CardItem = ({ crypto, onCryptoSelect, onAddFavorite }) => {
    return (
        <div className="card-item" onClick={() => onCryptoSelect(crypto)}>
            <h3>{crypto.name}</h3>
            <img src={crypto.image} alt={crypto.name} />
            <p>Preço: ${crypto.current_price.toFixed(2)}</p>
            <p>Variação (24h): {crypto.price_change_percentage_24h.toFixed(2)}%</p>
            <button onClick={(e) => { e.stopPropagation(); onAddFavorite(crypto); }}>Adicionar aos Favoritos</button>
        </div>
    );
};

export default CardItem;