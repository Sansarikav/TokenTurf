document.addEventListener('DOMContentLoaded', async function () {

    const ctx = document.getElementById('marketTrendsChart').getContext('2d');

    // Fetch market trends data from backend
    fetch('http://localhost:3000/api/market-trends')
    .then(response => response.json())
    .then(data => {
        // Create the chart with dynamic data
        new Chart(ctx, {
            type: 'line', // Line chart for trends
            data: {
                labels: data.labels, // Dynamic labels (e.g., months)
                datasets: [{
                    label: 'Property Token Price ($)',
                    data: data.prices, // Dynamic price data
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: false,
                        ticks: {
                            stepSize: 20
                        }
                    }
                }
            }
        });
    })
    .catch(error => {
        console.error('Error fetching market trends data:', error);
    });

    // Mock Data Fetching from Backend for other sections
    async function fetchDashboardData() {
        try {
            const portfolioResponse = await fetch('http://localhost:3000/portfolio');
            const portfolioData = await portfolioResponse.json();
            document.getElementById('portfolio-value').innerText = `$${portfolioData.totalValue}`;
            document.getElementById('total-tokens').innerText = portfolioData.totalTokens;

            const marketResponse = await fetch('http://localhost:3000/market-trends');
            const marketData = await marketResponse.json();
            document.getElementById('token-price').innerText = `$${marketData.tokenPrice}`;
            document.getElementById('price-trend').innerText = marketData.priceTrend;

            const investmentResponse = await fetch('http://localhost:3000/investment-opportunities');
            const investmentData = await investmentResponse.json();
            const investmentList = document.getElementById('investment-list');
            investmentList.innerHTML = investmentData.map(investment => `<li>${investment.property}: $${investment.price} - ${investment.tokensAvailable} tokens available</li>`).join('');

            const transactionsResponse = await fetch('http://localhost:3000/transaction-history');
            const transactionsData = await transactionsResponse.json();
            const transactionList = document.getElementById('transactions');
            transactionList.innerHTML = transactionsData.map(transaction => `<li>${transaction.description}</li>`).join('');

            const accountResponse = await fetch('http://localhost:3000/account-management');
            const accountData = await accountResponse.json();
            document.getElementById('account-name').innerText = accountData.name;
            document.getElementById('account-email').innerText = accountData.email;

            const analyticsResponse = await fetch('http://localhost:3000/analytics');
            const analyticsData = await analyticsResponse.json();
            document.getElementById('roi').innerText = `${analyticsData.roi}%`;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    fetchDashboardData();
});
