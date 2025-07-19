import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DelayBarChart = ({ data, translations, selectedAirline, theme }) => {
    const filteredData = selectedAirline === 'all'
        ? data
        : data.filter(item => item.airline === selectedAirline);

    // Calculate max delay from full dataset for consistent scaling
    const maxDelay = Math.max(...data.map(item => item.averageDelay));
    const yAxisMax = maxDelay + 5; // Add 5 minutes buffer above max

    // Get theme colors
    const getThemeColors = () => {
        if (theme === 'dark') {
            return {
                backgroundColor: 'rgba(78, 145, 249, 0.7)',
                borderColor: '#4e91f9',
                textColor: '#ced4da'
            };
        }
        return {
            backgroundColor: 'rgba(78, 145, 249, 0.7)',
            borderColor: '#4e91f9',
            textColor: '#343a40'
        };
    };

    const colors = getThemeColors();

    const chartData = {
        labels: filteredData.map(item => item.airline),
        datasets: [
            {
                label: translations.yAxisDelay,
                data: filteredData.map(item => item.averageDelay),
                backgroundColor: colors.backgroundColor,
                borderColor: colors.borderColor,
                borderWidth: 2,
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
                max: yAxisMax, // Set fixed maximum
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
                    text: translations.xAxisAirline,
                    font: { size: 12, weight: 'bold' },
                    color: colors.textColor
                },
                ticks: {
                    font: { size: 11 },
                    maxRotation: 45,
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
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default DelayBarChart;
