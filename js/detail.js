const API_KEY = 'd81ce92c1bcd4d74bba38ee005e26d8c'; // Replace with your RAWG API Key
const BASE_URL = `https://api.rawg.io/api/games`;
const id = new URLSearchParams(window.location.search).get("id"); // Replace with the specific game slug
let currentScreenshot = 0; // Initialize currentScreenshot
console.log(id);
// Fetch game details from RAWG API
async function fetchGameDetails() {
    try {
        const response = await fetch(`${BASE_URL}?key=${API_KEY}`);
        const data = await response.json();
        displayGameDetails(data);
        const response2 = await fetch(`${BASE_URL}/${id}?key=${API_KEY}`);
        const data2 = await response2.json();
        displayGameDetail(data2);
    } catch (error) {
        console.error('Error fetching game details:', error);
    }
}

// Display game details on the page
function displayGameDetails(data) {
    const games = data.results;
    games.forEach((game, index) => {
        if (game.id == id) {
            const gameDetail = document.getElementById('gameDetail');
            const screenshots = game.short_screenshots;
            if (screenshots.length === 0) {
                gameDetail.innerHTML = '<p>No screenshots available.</p>';
                return;
            }
            gameDetail.innerHTML = `
                <div class="carousel">
                    <div id="carouselInner" class="carousel-inner">
                        ${screenshots.map((screenshot, index) => `
                            <div class="carousel-item ${index === 0 ? 'active' : ''}">
                                <img src="${screenshot.image}" alt="Screenshot">
                            </div>
                        `).join('')}
                    </div>
                </div>
                
            `;
           
        }
    });}
function displayGameDetail(data2) {
    const game = data2;
    console.log(game);
    const firstDetail = document.getElementById('firstDetail');
    let minimum;
    if (game.platforms[0].requirements && game.platforms[0].requirements.minimum) {
        minimum = game.platforms[0].requirements.minimum.replace('Minimum:', '');
    } else {
        minimum = "No system requirements available";
    }   
            
            firstDetail.innerHTML = `
                <h2 class="game-header">${game.name}</h2>
                <h3>About</h2>
                ${game.description} 
                <div class="row">
                    <div class="col-6">
                        <h4>Platforms</h2>
                        <p>${game.platforms.map(platform => platform.platform.name).join(', ')}</p>
                    </div>
                    <div class="col-6">
                        <h4>Metascore</h2>
                        <p>${game.metacritic || 'No metascrore available'}</p>
                    </div>
                    <div class="col-6">
                        <h4>Genres</h2>
                        <p>${game.genres.map(genre => genre.name).join(', ')}</p>
                    </div>
                    <div class="col-6">
                        <h4>Release date</h2>
                        <p>${game.released}</p>
                    </div>
                    <div class="col-6">
                        <h4>Developer</h2>
                        <p>${game.developers.map(developer => developer.name).join(', ')}</p>
                    </div>
                    <div class="col-6">
                        <h4>Publisher</h2>
                        <p>${game.publishers.map(publisher => publisher.name).join(', ')}</p>
                    </div>
                    <div class="col-6">
                        <h4>Age rating</h2>
                        <p>${game.esrb_rating.name || 'No age rating available'}</p>
                    </div>
                    <div class="col-12">
                        <h4>Tags</h2>
                        <p>${game.tags.map(tag => tag.name).join(', ') || 'No tags available'}</p>
                    </div>
                    <div class="col-12">
                        <h4>Website</h2>
                        <p><a target="blank" class="link" href="${game.website}">${game.website}</a></p>
                    </div>
                </div>
                <h3>System Requirements</h3>
                <h4>Minimum</h4>
                <p>${minimum}</p>
                
                `;
                const secondDetail = document.getElementById('secondDetail');
                secondDetail.innerHTML = `
                <h3>Where to buy</h3>
                <div class="row">${game.stores.map(st => `<div class="col-6 btn-link-container  "><a target="blank" class="link btn-link" href="http://${st.store.domain}">${st.store.name}</a></div>`).join('')}</div>`;

        }
// Change screenshot
function changeScreenshot(direction) {
    const screenshots = document.querySelectorAll('.carousel-item');
    if (screenshots.length === 0) return; // Handle case where there are no screenshots
    screenshots[currentScreenshot].classList.remove('active');
    currentScreenshot = (currentScreenshot + direction + screenshots.length) % screenshots.length;
    screenshots[currentScreenshot].classList.add('active');
}

// Example usage
fetchGameDetails();