import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { monthNamesFR } from '../data';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const DelayLineChart = ({ data, translations, language, theme }) => {
    const getMonthName = (month) => {
        return language === 'fr' ? monthNamesFR[month] || month : month;
    };

    // Get theme colors
    const getThemeColors = () => {
        if (theme === 'dark') {
            return {
                borderColor: '#bd93f9',
                backgroundColor: 'rgba(189, 147, 249, 0.1)',
                pointColor: '#bd93f9',
                textColor: '#ced4da'
            };
        }
        return {
            borderColor: '#8e44ad',
            backgroundColor: 'rgba(142, 68, 173, 0.1)',
            pointColor: '#8e44ad',
            textColor: '#343a40'
        };
    };

    const colors = getThemeColors();

    const chartData = {
        labels: data.map(item => getMonthName(item.month)),
        datasets: [
            {
                label: translations.yAxisDelay,
                data: data.map(item => item.averageDelay),
                borderColor: colors.borderColor,
                backgroundColor: colors.backgroundColor,
                borderWidth: 3,
                pointBackgroundColor: colors.pointColor,
                pointBorderColor: colors.pointColor,
                pointBorderWidth: 2,
                pointRadius: 5,
                tension: 0.2,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    font: { size: 12 },
                    padding: 15,
                    color: colors.textColor
                }
            },
            title: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `${context.parsed.y} ${translations.delayUnit}`;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: translations.yAxisDelay,
                    font: { size: 12, weight: 'bold' },
                    color: colors.textColor
                },
                ticks: {
                    font: { size: 11 },
                    color: colors.textColor
                },
                grid: {
                    color: theme === 'dark' ? '#2a2e35' : '#d1d5db'
                }
            },
            x: {
                title: {
                    display: true,
                    text: translations.xAxisMonth,
                    font: { size: 12, weight: 'bold' },
                    color: colors.textColor
                },
                ticks: {
                    font: { size: 11 },
                    color: colors.textColor
                },
                grid: {
                    color: theme === 'dark' ? '#2a2e35' : '#d1d5db'
                }
            }
        },
    };

    return (
        <div style={{ height: '350px' }}>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default DelayLineChart;
