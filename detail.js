const API_KEY = 'd81ce92c1bcd4d74bba38ee005e26d8c'; // Replace with your RAWG API Key
const BASE_URL = `https://api.rawg.io/api/games`;
const id = '3498'; // Replace with the specific game slug
let currentScreenshot = 0; // Initialize currentScreenshot

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
            const firstDetail = document.getElementById('firstDetail');
            firstDetail.innerHTML = `
                <h2>${game.name}</h2>
                <h2>About</h2>
                ${game.description} 
                <p>Released: ${game.released}</p>
                <p>Rating: ${game.rating}</p>
                <p>Tags: ${game.tags.map(tag => tag.name).slice(0, 3).join(', ') || 'No tags available'}</p>
            `;
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