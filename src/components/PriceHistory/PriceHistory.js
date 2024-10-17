import React from 'react';
import './PriceHistory.css';

const PriceHistory = ({ data }) => {
    return (
        <div className="price-history">
            <h2>Histórico de Preços</h2>
            <table>
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Preço</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((point, index) => (
                        <tr key={index}>
                            <td>{point.date}</td>
                            <td>${point.price.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PriceHistory;