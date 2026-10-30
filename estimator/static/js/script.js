function syncFromRange(key) {
    const rangeVal = document.getElementById('rng_' + key).value;
    document.getElementById('num_' + key).value = rangeVal;
}

function syncFromNumber(key) {
    const numVal = document.getElementById('num_' + key).value;
    document.getElementById('rng_' + key).value = numVal;
}

function adjustValue(key, delta, min, max, decimals) {
    const numInput = document.getElementById('num_' + key);
    let current = parseFloat(numInput.value) || min;
    let next = current + delta;
    if (next < min) next = min;
    if (next > max) next = max;
    
    numInput.value = next.toFixed(decimals);
    document.getElementById('rng_' + key).value = next.toFixed(decimals);
}

function initHousingVisuals(featuresData) {
    const chartElement = document.getElementById('housingChart');
    if (chartElement) {
        const ctx = chartElement.getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['MedInc (x10)', 'House Age', 'Rooms (x10)', 'Occupancy (x15)', 'Pop. Index'],
                datasets: [
                    {
                        label: 'Property Factors',
                        data: featuresData,
                        backgroundColor: [
                            'rgba(59, 130, 246, 0.75)',  // Soft Blue
                            'rgba(124, 58, 237, 0.75)',  // Soft Purple
                            'rgba(16, 185, 129, 0.75)',  // Emerald Green
                            'rgba(244, 63, 94, 0.75)',   // Coral Rose
                            'rgba(245, 158, 11, 0.75)'   // Amber Peach
                        ],
                        borderRadius: 8,
                        borderWidth: 1,
                        borderColor: 'rgba(255, 255, 255, 0.9)'
                    },
                    {
                        label: 'Cal. Benchmark',
                        data: [38.7, 28.6, 54.2, 45.0, 47.5],
                        type: 'line',
                        borderColor: '#64748b',
                        borderWidth: 2,
                        borderDash: [4, 4],
                        fill: false,
                        pointRadius: 3,
                        pointBackgroundColor: '#334155'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 1000,
                    easing: 'easeOutQuart'
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        grid: { color: 'rgba(148, 163, 184, 0.2)' },
                        ticks: { color: '#64748b', font: { family: 'Plus Jakarta Sans', size: 10, weight: '500' } }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { color: '#334155', font: { family: 'Plus Jakarta Sans', size: 10, weight: '600' } }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top',
                        labels: { color: '#334155', font: { family: 'Plus Jakarta Sans', size: 10, weight: '600' }, boxWidth: 10 }
                    }
                }
            }
        });
    }
}