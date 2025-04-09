// my_gallery.js

async function getCards() {
    try {
        const response = await fetch("my_gallery.json");
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

// Exibir as fotos na galeria
function displayPhotos(photos) {
    const photoList = document.getElementById('photo-list');
    photoList.innerHTML = ""; // Limpar conteúdo existente

    photos.forEach(photo => {
        const photoElement = document.createElement('div');
        photoElement.className = 'photo-item';
        
        const imgElement = document.createElement('img');
        imgElement.src = photo.imageUrl;
        imgElement.alt = photo.title;
        
        const titleElement = document.createElement('h3');
        titleElement.textContent = photo.title;

        const categoryElement = document.createElement('span');
        categoryElement.textContent = `Category: ${photo.category}`;

        const actionsContainer = document.createElement('div');
        actionsContainer.className = 'actions';

        const editButton = document.createElement('button');
        editButton.textContent = "Edit";
        editButton.onclick = () => openEditModal(photo);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = "Delete";
        deleteButton.onclick = () => deletePhoto(photo.id);

        actionsContainer.appendChild(editButton);
        actionsContainer.appendChild(deleteButton);

        photoElement.appendChild(imgElement);
        photoElement.appendChild(titleElement);
        photoElement.appendChild(categoryElement);
        photoElement.appendChild(actionsContainer);

        photoList.appendChild(photoElement);
    });
}

// Função para abrir o modal de edição
function openEditModal(photo) {
    document.getElementById('photoModal').style.display = 'block';
    document.getElementById('modalTitle').textContent = 'Edit Photo';
    document.getElementById('photoTitle').value = photo.title;
    document.getElementById('photoDescription').value = photo.description;
    document.getElementById('photoImageUrl').value = photo.imageUrl;
    document.getElementById('photoCategory').value = photo.category;

    // Alterar o botão para "Salvar" ao invés de "Adicionar"
    const saveButton = document.querySelector('#photoForm button');
    saveButton.textContent = 'Save Changes';
    
    // Ao enviar o formulário, atualizar a foto
    const form = document.getElementById('photoForm');
    form.onsubmit = (event) => {
        event.preventDefault();
        updatePhoto(photo.id);
    };
}

// Função para excluir foto
function deletePhoto(photoId) {
    const confirmation = confirm("Are you sure you want to delete this photo?");
    if (confirmation) {
        deletePost(photoId);
        alert("Photo deleted successfully!");
        location.reload();
    }
}

// Função para salvar as alterações ou adicionar nova foto
async function updatePhoto(photoId) {
    const updatedPhoto = {
        title: document.getElementById('photoTitle').value,
        description: document.getElementById('photoDescription').value,
        imageUrl: document.getElementById('photoImageUrl').value,
        category: document.getElementById('photoCategory').value,
    };
    await updatePost(photoId, updatedPhoto); // Chama o método para atualizar a foto na API/JSON
    document.getElementById('photoModal').style.display = 'none';
    location.reload();
}

// Função para abrir a modal de adicionar nova foto
document.getElementById('addPhotoBtn').onclick = () => {
    openEditModal({}); // Passa um objeto vazio para adicionar uma nova foto
};
