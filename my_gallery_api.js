import { getPosts, createPost, updatePost, deletePost } from "/user_api.js";

document.addEventListener("DOMContentLoaded", async () => {
    const posts = await getPosts();
    displayPosts(posts);
    setupModal();
});


function filterCards() {
    const searchValue = document.getElementById("searchInput").value.toLowerCase();
    const filterValue = document.getElementById("filterSelect").value;
    
    const posts = document.querySelectorAll(".column"); 
  
    posts.forEach(post => {
        const title = post.querySelector("h3").textContent.toLowerCase();
        const category = post.getAttribute("data-category").toLowerCase();
  
        const matchesSearch = title.includes(searchValue);
        const matchesFilter = filterValue === "all" || category === filterValue;
  
        post.style.display = matchesSearch && matchesFilter ? "block" : "none";
    });
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("searchInput").addEventListener("keyup", filterCards);
    document.getElementById("filterSelect").addEventListener("change", filterCards);
  });
  


// Function to display posts
function displayPosts(posts) {
    const postList = document.querySelector('.row');
    postList.innerHTML = "";

    posts.forEach((post) => {
        const postContainer = document.createElement('div');
        postContainer.className = 'column';
        postContainer.setAttribute("data-category", post.tag);

        // Image Post
        const imgElement = document.createElement('img');
        imgElement.src = post.imageUrl;
        imgElement.alt = `${post.title} - ${post.description}`;
        imgElement.loading = "lazy";

        // overlay 
        const overlay = document.createElement('div');
        overlay.className = 'overlay';

        // Post title
        const titleElement = document.createElement('h3');
        titleElement.textContent = post.title;

        // Post tag
        const tagElement = document.createElement('span');
        tagElement.className = 'tag';
        tagElement.textContent = post.tag;

        // Share button
        const shareButton = document.createElement('button');
        shareButton.innerHTML = '<i class="fa-solid fa-share-nodes"></i>';
        shareButton.classList.add('share-btn');
        shareButton.addEventListener('click', () => { alert('Shared!'); });

        // Container for delete and update buttons
        const btnContainer = document.createElement('div');
        btnContainer.classList.add('btn-container');

        // Create the delete and update buttons
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
        deleteButton.classList.add('delete-btn');
        deleteButton.addEventListener('click', async () => {
            const isConfirmed = confirm("Are you sure you want to delete this post?");
            if (isConfirmed) {
                await deletePost(post.id);
                const updatedPosts = await getPosts();
                displayPosts(updatedPosts);
            }
        });

        const updateButton = document.createElement('button');
        updateButton.innerHTML = '<i class="fa-solid fa-pen"></i>';
        updateButton.classList.add('update-btn');
        updateButton.addEventListener('click', () => {
            openEditForm(post); 
        });

        postContainer.appendChild(deleteButton);
        postContainer.appendChild(updateButton);

        // Overlay Elements
        overlay.appendChild(titleElement);
        overlay.appendChild(shareButton);
        overlay.appendChild(btnContainer);

        // Image and overlay to post container
        postContainer.appendChild(imgElement);
        postContainer.appendChild(overlay);
        postList.appendChild(postContainer);
    });

}

function openEditForm(post) {
    const editFormContainer = document.getElementById("editFormContainer");
    const editForm = document.getElementById("editPostForm");
    
    document.getElementById("editTitle").value = post.title;
    document.getElementById("editDescription").value = post.description;
    document.getElementById("editImageUrl").value = post.imageUrl;
    document.getElementById("editTag").value = post.tag;
    
    editFormContainer.style.display = "flex";
    
    editForm.onsubmit = async function(e) {
        e.preventDefault();
        
        const updatedPost = {
            title: document.getElementById("editTitle").value,
            description: document.getElementById("editDescription").value,
            imageUrl: document.getElementById("editImageUrl").value,
            tag: document.getElementById("editTag").value,
            user: post.user
        };
        
        await updatePost(post.id, updatedPost);
        const updatedPosts = await getPosts();
        displayPosts(updatedPosts);
        editFormContainer.style.display = "none";
    };
    
    document.getElementById("cancelEdit").onclick = function() {
        editFormContainer.style.display = "none";
    };
}