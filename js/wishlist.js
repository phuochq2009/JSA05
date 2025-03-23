const API_KEY = 'd81ce92c1bcd4d74bba38ee005e26d8c'; // Replace with your RAWG API Key
const BASE_URL = `https://api.rawg.io/api/games`;

async function fetchGameDetails(gameId) {
    const response = await fetch(`${BASE_URL}/${gameId}?key=${API_KEY}`);
    const data = await response.json();
    return data;
}

function getUserName() {
    const userName = localStorage.getItem("userName");
    return userName;
  }

function displayWishlist() {
    const wishlistContainer = document.getElementById('wishlistContainer');
    wishlistContainer.innerHTML = '';

    const userName = getUserName();
  let wishlistKey = `wishlist-${userName}`;
  let wishlist = JSON.parse(localStorage.getItem(wishlistKey)) || [];
  

    if (wishlist.length === 0) {
        wishlistContainer.innerHTML = '<p>Your wishlist is empty.</p>';
        return;
    }

    wishlist.forEach(async (gameId) => {
        const game = await fetchGameDetails(gameId);

        const gameElement = document.createElement('div');
        gameElement.classList.add('wishlist-game');
        gameElement.innerHTML = ` 
        <div class="result">           
                    <a class="left" href="./detail.html?id=${game.id}" target="_blank" style="text-decoration: none;">
                        <div class="result-game">
                            <div class="">
                                <img class="result-img" src="${game.background_image}" alt="Image not found">
                            </div>
                            <div class="result-text">
                                <h3>${game.name}</h3>
                            
                                <p>Tags: ${game.tags.map(tag => tag.name).slice(0, 5).join(', ') || 'No tags available'}</p>
                            
                                <p>${game.released}</p>


                            </div>
                            
                        </div>

                    </a>
                                            <button class="remove-btn btn btn-danger" onclick="removeFromWishlist(${game.id})">Remove</button>

        </div>
                    `;

        wishlistContainer.appendChild(gameElement);
    });
}

function removeFromWishlist(gameId) {
    const userName = getUserName();
  let wishlistKey = `wishlist-${userName}`;
  let wishlist = JSON.parse(localStorage.getItem(wishlistKey)) || [];
  
    let removeIndex = wishlist.findIndex((item) => item === gameId);
    wishlist.splice(removeIndex, 1);

    console.log(wishlist);
    localStorage.setItem(wishlistKey, JSON.stringify(wishlist));
    displayWishlist();
}

document.addEventListener('DOMContentLoaded', displayWishlist);

function checkLoginStatus() {
    const isLogin = localStorage.getItem("isLogin");
        const userName = localStorage.getItem("userName");
    if (isLogin) {
      document.getElementById('textt').innerHTML= `
      
      <div class=" dropdown"> 
      <p class="nav-link">
      ${userName} <i class="fa-solid fa-caret-down"><button class="drop-content" onclick="logout()">Log Out</button></i>
       
      </p> 
      
    </div>
      `;
    } else {
      document.getElementById('textt').innerHTML = `
      <a class="nav-link" href="login.html">Log in</a>`
    }
  }
  
  checkLoginStatus()
  
  function logout() {
    localStorage.removeItem("isLogin");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    location.reload();

  }