async function getCards() {
    try {
        const response = await fetch("community.json");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

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

        const imgElement = document.createElement('img');
        imgElement.src = card.imageUrl; 
        imgElement.alt = `${card.title} - ${card.description}`;   
        imgElement.loading = "lazy";

        const tagElement = document.createElement('span');
        tagElement.className = 'tag';
        tagElement.textContent = card.tag;

        cardContainer.appendChild(imgElement); 
        container.appendChild(cardContainer);
        cardContainer.appendChild(tagElement);
    });
}

window.onload = () => {
    getCards();
};




// localStorage.setItem("key", "value");


// sessionStorage.setItem("key", "value");