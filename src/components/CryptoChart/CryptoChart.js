import React from 'react';
import { Line } from 'react-chartjs-2';
import './CryptoChart.css';

const CryptoChart = ({ data }) => {
    const chartData = {
        labels: data.map((_, index) => index),
        datasets: [
            {
                label: 'Preço',
                data: data,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            x: {
                type: 'linear',
            },
            y: {
                type: 'linear',
            },
        },
    };

    return (
        <div className="crypto-chart">
            <h2>Gráfico de Preço (7 dias)</h2>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default CryptoChart;