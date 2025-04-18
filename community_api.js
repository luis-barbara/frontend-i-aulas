import { getPosts, createPost, updatePost, deletePost } from "./api.js";

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


function displayPosts(posts) {
  const postList = document.querySelector('.row');
  postList.innerHTML = "";

  posts.forEach((post) => {
    const postContainer = document.createElement('div');
    postContainer.className = 'column';
    postContainer.setAttribute("data-category", post.tag);

    // Card structure for the post
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
    shareButton.innerHTML = '<i class="fa-solid fa-share-nodes"></i>';
    shareButton.addEventListener('click', () => { alert('Shared!'); });


    buttonsContainer.appendChild(likeButton);
    buttonsContainer.appendChild(saveButton);
    buttonsContainer.appendChild(shareButton);



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
    overlay.appendChild(buttonsContainer);
    overlay.appendChild(userContainer);

    // Append image and overlay to the post container
    postContainer.appendChild(imgElement);
    postContainer.appendChild(overlay);
    postList.appendChild(postContainer);
  });
}

