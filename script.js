document.addEventListener('DOMContentLoaded', () => {
    let allCountries = [];
    const container = document.getElementById('data-container');
    const searchBar = document.getElementById('search-bar');

    async function fetchCountries() {
        try {
            const url = 'https://restcountries.com/v3.1/all?fields=name,capital,flags';
            const response = await fetch(url);
            allCountries = await response.json();
            displayCountries(allCountries);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    function displayCountries(countries) {
        if (!container) return;
        container.innerHTML = '';
        countries.forEach(country => {
            const div = document.createElement('div');
            div.className = 'country-card';
            div.innerHTML = `
                <img src="${country.flags.svg}" alt="Flag of ${country.name.common}" style="width:100px;">
                <h3>${country.name.common}</h3>
                <p>Capital: ${country.capital}</p>
            `;
            container.appendChild(div);
        });
    }

    // This ensures we only add the listener if the search bar exists
    if (searchBar) {
        searchBar.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filtered = allCountries.filter(country => 
                country.name.common.toLowerCase().includes(searchTerm)
            );
            displayCountries(filtered);
        });
    }

    fetchCountries();
});