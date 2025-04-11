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

        // Options Menu
        const optionsMenu = document.createElement('div');
        optionsMenu.className = 'options-menu';
        
        const optionsButton = document.createElement('button');
        optionsButton.className = 'options-btn';
        optionsButton.innerHTML = '<i class="fa-solid fa-ellipsis-v"></i>';

        const menuDropdown = document.createElement('div');
        menuDropdown.className = 'menu-dropdown';

        const editButton = document.createElement('button');
        editButton.className = 'edit-btn';
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', (event) => {
            openEditForm(post);
        });

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-btn';
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', async () => {
            const isConfirmed = confirm("Are you sure you want to delete this post?");
            if (isConfirmed) {
                await deletePost(post.id);
                const updatedPosts = await getPosts();
                displayPosts(updatedPosts);
            }
        });

        const shareButton = document.createElement('button');
        shareButton.className = 'share-btn';
        shareButton.textContent = 'Share';
        shareButton.addEventListener('click', () => { alert('Shared!'); });

        const publishButton = document.createElement('button');
        publishButton.className = 'publish-btn';
        publishButton.textContent = 'Publish';
        publishButton.addEventListener('click', async () => {
            const isConfirmed = confirm("Do you want to publish this post?");
            if (isConfirmed) {
                await updatePost(post.id, { ...post, status: 'published' }); 
                const updatedPosts = await getPosts();
                displayPosts(updatedPosts);
            }
        });

        menuDropdown.append(editButton, deleteButton, shareButton, publishButton);
        optionsMenu.append(optionsButton, menuDropdown);
        
        overlay.appendChild(titleElement);
        overlay.appendChild(optionsMenu);
        
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
    document.getElementById("editUser").value = post.user; // ✅ Include the user field

    editFormContainer.style.display = "flex";

    editForm.onsubmit = async function (e) {
        e.preventDefault();
        
        const updatedPost = {
            title: document.getElementById("editTitle").value,
            description: document.getElementById("editDescription").value,
            imageUrl: document.getElementById("editImageUrl").value,
            tag: document.getElementById("editTag").value,
            user: document.getElementById("editUser").value 
        };

        try {
            await updatePost(post.id, updatedPost);
            const updatedPosts = await getPosts();
            displayPosts(updatedPosts);
            editFormContainer.style.display = "none";
        } catch (error) {
            console.error("Update failed:", error);
        }
    };

    document.getElementById("cancelEdit").onclick = function () {
        editFormContainer.style.display = "none";
    };
}





// Toggle options menu
document.addEventListener("click", (event) => {
    const isOptionsButton = event.target.closest(".options-btn");
    const isMenu = event.target.closest(".menu-dropdown");
    const isColumn = event.target.closest(".column");

    // Toggle menu visibility when clicking the options button
    if (isOptionsButton) {
        event.stopPropagation(); 
        const menu = isOptionsButton.nextElementSibling;
        const isVisible = menu.classList.contains("show-menu");

        // Close all other menus
        document.querySelectorAll(".menu-dropdown").forEach(m => {
            m.classList.remove("show-menu");
        });

        // Toggle visibility of the clicked menu
        menu.classList.toggle("show-menu", !isVisible);
    } else if (!isMenu && !isColumn) {
        // Close the menu if clicked outside the column or menu
        document.querySelectorAll(".menu-dropdown").forEach(menu => {
            menu.classList.remove("show-menu");
        });
    }
});




