document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';

    async function fetchCurrencyRates() {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            displayCurrencyRates(data);
        } catch (error) {
            console.error('Помилка при завантаженні даних:', error);
        }
    }

    function displayCurrencyRates(rates) {
        const tableBody = document.querySelector('#currencyTable tbody');
        tableBody.innerHTML = '';

        rates.forEach(rate => {
            const row = document.createElement('tr');
            const currencyCell = document.createElement('td');
            currencyCell.textContent = rate.cc;
            const rateCell = document.createElement('td');
            rateCell.textContent = rate.rate.toFixed(2);
            row.appendChild(currencyCell);
            row.appendChild(rateCell);
            tableBody.appendChild(row);
        });
    }

    fetchCurrencyRates();
    setInterval(fetchCurrencyRates, 3600000);
});
