// Espera que o conteúdo da página seja carregado
document.addEventListener("DOMContentLoaded", function() {
    const apiKey = 'e9a57d846568ca0221d7b3ad8f21d67e'; // Substitua pela sua chave da API
    const searchBtn = document.getElementById('search-btn');
    const cityInput = document.getElementById('city-input');
    const cityName = document.getElementById('city-name');
    const temperature = document.getElementById('temperature');
    const weatherDescription = document.getElementById('weather-description');
    const rainProbability = document.getElementById('rain-probability');
    const windSpeed = document.getElementById('wind-speed');
    const humidity = document.getElementById('humidity');
    const cloudiness = document.getElementById('cloudiness');

    // Função para converter a direção do vento em pontos cardeais
    function getWindDirection(degree) {
        const directions = ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO'];
        return directions[Math.round(((degree % 360) / 45)) % 8];
    }

    // Função para buscar a previsão do tempo
    function fetchWeather(city) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                // Atualiza o conteúdo na página com os dados da API
                cityName.textContent = data.name;
                temperature.textContent = `Temperatura: ${data.main.temp}°C`;
                weatherDescription.textContent = `Condição: ${data.weather[0].description}`;
                rainProbability.textContent = `Probabilidade de Chuva: ${data.rain ? data.rain['1h'] || 0 : 0}%`;
                windSpeed.textContent = `Velocidade do Vento: ${data.wind.speed} km/h (${getWindDirection(data.wind.deg)})`;
                humidity.textContent = `Umidade Relativa: ${data.main.humidity}%`;
                cloudiness.textContent = `Nubelosidade: ${data.clouds.all}%`;
            })
            .catch(error => {
                alert('Erro ao buscar a previsão. Verifique o nome da cidade e tente novamente.');
                console.error('Erro:', error);
            });
    }

    // Adiciona o evento de clique ao botão de busca
    searchBtn.addEventListener('click', function() {
        const city = cityInput.value;
        if (city) {
            fetchWeather(city);
        } else {
            alert('Por favor, digite o nome de uma cidade.');
        }
    });
});
