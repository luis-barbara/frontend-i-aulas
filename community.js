async function getCards() {
    try {
        const response = await fetch("community.json");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        window.allCards = data.cards; // Store all cards in a global variable
        updateCardsContent(data.cards);
    } catch (error) {
        console.error("Loading data error:", error);
    }
}

function updateCardsContent(cards) {
    const container = document.querySelector('.row');
    container.innerHTML = "";

    cards.forEach(card => {
        const cardContainer = document.createElement('div');
        cardContainer.className = 'column';
        cardContainer.setAttribute("data-category", card.tag); 

        const imgElement = document.createElement('img');
        imgElement.src = card.imageUrl; 
        imgElement.alt = `${card.title} - ${card.description}`;   
        imgElement.loading = "lazy";

        const overlay = document.createElement('div');
        overlay.className = 'overlay';

        const titleElement = document.createElement('h3');
        titleElement.textContent = card.title;

        const tagElement = document.createElement('span');
        tagElement.className = 'tag';
        tagElement.textContent = card.tag;

        // Buttons inside overlay
        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'buttons';
        
        const likeButton = document.createElement('button');
        likeButton.innerHTML = '<i class="fas fa-heart"></i>';
        likeButton.addEventListener('click', () => { alert('Liked!'); });

        const saveButton = document.createElement('button');
        saveButton.innerHTML = '<i class="fa-regular fa-bookmark"></i>';
        saveButton.addEventListener('click', () => { alert('Saved!'); });

        const shareButton = document.createElement('button');
        shareButton.innerHTML = '<i class="fas fa-share-alt"></i>';
        shareButton.addEventListener('click', () => { alert('Shared!'); });

        buttonsContainer.appendChild(likeButton);
        buttonsContainer.appendChild(saveButton);
        buttonsContainer.appendChild(shareButton);

        // Create the user container
        const userContainer = document.createElement('div');
        userContainer.className = 'user-info';

        // Create the user initials inside a circle
        const avatar = document.createElement('div');
        avatar.className = 'user-avatar';

        // Get initials (first letter of each name)
        const initials = card.user.split(" ").map(name => name[0]).join("");  // Get initials from user name
        avatar.textContent = initials;  // Display initials inside the circle

        // Create the user name
        const userName = document.createElement('span');
        userName.className = 'user-name';
        userName.textContent = card.user || "Unknown User";  

        // Add initials and name to the user container
        userContainer.appendChild(avatar);
        userContainer.appendChild(userName);

        // Append overlay elements
        overlay.appendChild(titleElement);
        overlay.appendChild(tagElement);
        overlay.appendChild(buttonsContainer);
        overlay.appendChild(userContainer);

        // Append image and overlay to the card container
        cardContainer.appendChild(imgElement);
        cardContainer.appendChild(overlay);
        container.appendChild(cardContainer);
    });
}

// Function to handle search input
function filterCards() {
    const searchValue = document.getElementById("searchInput").value.toLowerCase();
    const filterValue = document.getElementById("filterSelect").value;

    const filteredCards = window.allCards.filter(card => {
        const matchesSearch = card.title.toLowerCase().includes(searchValue);
        const matchesFilter = filterValue === "all" || card.tag === filterValue;
        return matchesSearch && matchesFilter;
    });

    updateCardsContent(filteredCards);
}

// Wait for the DOM to load before initializing
window.onload = () => {
    getCards();
    document.getElementById("searchInput").addEventListener("keyup", filterCards);
    document.getElementById("filterSelect").addEventListener("change", filterCards);
};


// localStorage.setItem("key", "value");


// sessionStorage.setItem("key", "value");