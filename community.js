async function getCards() {
    try {
        const response = await fetch("community.json");
        const data = await response.json();
        updateCardsContent(data.cards);
    }   catch (error) {
        console.error("Erro ao carregar os dados:", error);
    }
}

function updateCardsContent(cards) {
    const container = document.querySelector('.row');

    cards.forEach(card => {
        const cardContainer = document.createElement('div');
        cardContainer.className = 'column'; 

        const imgElement = document.createElement('img');
        imgElement.src = card.imageUrl; 
        imgElement.alt = card.title;    
        imgElement.style.width = '100%'; 

        cardContainer.appendChild(imgElement); 

        container.appendChild(cardContainer);
    });
}

getCards();