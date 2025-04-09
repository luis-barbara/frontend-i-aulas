import { getPosts, createPost } from "/mockapi.js"; 

document.addEventListener("DOMContentLoaded", async () => {
  const posts = await getPosts();
  displayPosts(posts);
  setupModal();
});


function displayPosts(posts) {
  const postList = document.querySelector('.row');  
  postList.innerHTML = "";

  posts.forEach((post) => {
    const postContainer = document.createElement('div');
    postContainer.className = 'column';
    postContainer.setAttribute("data-category", post.tag); 

    // Create the card structure for the post
    const imgElement = document.createElement('img');
    imgElement.src = post.imageUrl; 
    imgElement.alt = `${post.title} - ${post.description}`;
    imgElement.loading = "lazy";  

    // Overlay for additional content
    const overlay = document.createElement('div');
    overlay.className = 'overlay';

    const titleElement = document.createElement('h3');
    titleElement.textContent = post.title;  

    const tagElement = document.createElement('span');
    tagElement.className = 'tag';
    tagElement.textContent = post.tag;  

    // Buttons inside the overlay
    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'buttons';

    const likeButton = document.createElement('button');
    likeButton.innerHTML = '<i class="fa-regular fa-heart"></i>';
    likeButton.addEventListener('click', () => { alert('Liked!'); });

    const saveButton = document.createElement('button');
    saveButton.innerHTML = '<i class="fa-regular fa-bookmark"></i>';
    saveButton.addEventListener('click', () => { alert('Saved!'); });

    const shareButton = document.createElement('button');
    shareButton.innerHTML = '<i class="fa-regular fa-share-from-square"></i>';
    shareButton.addEventListener('click', () => { alert('Shared!'); });

    
    buttonsContainer.appendChild(likeButton);
    buttonsContainer.appendChild(saveButton);
    buttonsContainer.appendChild(shareButton);

    
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
      
      const updatedPost = {  
        title: prompt("Enter new title:", post.title),
        description: prompt("Enter new description:", post.description),
        imageUrl: prompt("Enter new image URL:", post.imageUrl),
        tag: post.tag,
        user: post.user
      };
      if (updatedPost.title && updatedPost.description && updatedPost.imageUrl) {
        updatePost(post.id, updatedPost);  
      }
    });

    postContainer.appendChild(deleteButton);
    postContainer.appendChild(updateButton);

    // Create the user info container
    const userContainer = document.createElement('div');
    userContainer.className = 'user-info';

    // Create the avatar with user initials
    const avatar = document.createElement('div');
    avatar.className = 'user-avatar';

    // Get initials from the user name
    const initials = post.user.split(" ").map(name => name[0]).join(""); 
    avatar.textContent = initials;

    // User name
    const userName = document.createElement('span');
    userName.className = 'user-name';
    userName.textContent = post.user || "Unknown User";

    // Add initials and user name to the user container
    userContainer.appendChild(avatar);
    userContainer.appendChild(userName);

    // Append overlay elements to the post container
    overlay.appendChild(titleElement);
    overlay.appendChild(tagElement);
    overlay.appendChild(buttonsContainer);
    overlay.appendChild(userContainer);

    // Append image and overlay to the post container
    postContainer.appendChild(imgElement);
    postContainer.appendChild(overlay);
    postList.appendChild(postContainer);
  });
}

// Modal setup function (for adding posts)
function setupModal() {
  const modal = document.getElementById("add-post-modal");
  const openModalBtn = document.getElementById("open-modal-btn");
  const closeModal = document.querySelector(".close-modal");
  const addPostForm = document.getElementById("add-post-form");

  // Open the modal to add a new post
  openModalBtn.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  // Close the modal
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
    addPostForm.reset();
  });

  // Close the modal if clicking outside of it
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
      addPostForm.reset();
    }
  });

  // Form submission to create a new post
  addPostForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const newPost = {
      title: document.getElementById("post-title").value,
      description: document.getElementById("post-description").value,
      imageUrl: document.getElementById("post-image").value,
      tag: document.getElementById("post-tag").value,
      user: document.getElementById("post-user").value,
    };

    try {
      const createdPost = await createPost(newPost);  
      const updatedPosts = await getPosts();  
      displayPosts(updatedPosts);  
      modal.style.display = "none";  
      addPostForm.reset();  
    } catch (error) {
      console.error("Error adding post:", error);
      alert("Failed to add post. Please try again.");
    }
  });
}
