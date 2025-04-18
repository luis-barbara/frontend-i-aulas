import { getPosts, createPost, updatePost, deletePost } from "./user_api.js";

document.addEventListener("DOMContentLoaded", async () => {
    const posts = await getPosts();
    displayPosts(posts);
    setupModal();

    document.getElementById("searchInput").addEventListener("keyup", filterCards);
    document.getElementById("filterSelect").addEventListener("change", filterCards);
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
        optionsButton.innerHTML = '<i class="fa-solid fa-ellipsis-vertical"></i>';
        optionsButton.setAttribute('aria-label', 'Post options');

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
    // Get form elements
    const editFormContainer = document.getElementById("editFormContainer");
    const editForm = document.getElementById("editPostForm");

    // Validate form elements exist
    if (!editFormContainer || !editForm) {
        console.error("Form elements not found in DOM");
        return;
    }

    // Display the edit form with smooth scroll
    editFormContainer.style.display = "flex";
    editFormContainer.scrollIntoView({ behavior: 'smooth' });

    // Populate form fields with existing post data (with empty fallbacks)
    document.getElementById("editTitle").value = post.title || '';
    document.getElementById("editDescription").value = post.description || '';
    document.getElementById("editImageUrl").value = post.imageUrl || '';
    document.getElementById("editTag").value = post.tag || '';

    // Clear any existing event listeners to prevent duplicates
    editForm.onsubmit = null;
    document.getElementById("cancelEdit").onclick = null;

    // Handle form submission
    editForm.onsubmit = async (e) => {
        e.preventDefault();
        
        // Get submit button and set loading state
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';

        try {
            // Prepare updated post data (ONLY fields that exist in MockAPI schema)
            const updatedPost = {
                title: document.getElementById("editTitle").value.trim(),
                description: document.getElementById("editDescription").value.trim(),
                imageUrl: document.getElementById("editImageUrl").value.trim(),
                tag: document.getElementById("editTag").value.trim(),
                user: post.user
            };

            console.log("Prepared update data:", updatedPost); 

            // Validate required fields
            if (!updatedPost.title) throw new Error("Title is required");
            if (!updatedPost.tag) throw new Error("Tag is required");
            if (!updatedPost.user) throw new Error("User is required");

            // Send update request
            const response = await updatePost(post.id, updatedPost);
            
            // Verify response contains expected data
            if (!response || !response.id) {
                throw new Error("Server returned invalid response format");
            }

            // Update UI with fresh data
            const updatedPosts = await getPosts();
            displayPosts(updatedPosts);
            
            // Hide form and show success
            editFormContainer.style.display = "none";
            alert("Post updated successfully!");
            
        } catch (error) {
            console.error("Post update failed:", error);
            
            // Show user-friendly error message
            let errorMessage = error.message;
            if (errorMessage.includes("Invalid request")) {
                errorMessage = "Server rejected the update data. Please check your inputs.";
            }
            alert(`Update failed: ${errorMessage}`);
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
    };

    // Handle cancel button click
    document.getElementById("cancelEdit").onclick = () => {
        editFormContainer.style.display = "none";
    };
}


// Toggle options menu
document.addEventListener("click", (event) => {
    const optionsBtn = event.target.closest(".options-btn");
    const menuDropdown = event.target.closest(".menu-dropdown");
    const optionsMenu = event.target.closest(".options-menu");

    if (optionsBtn) {
        event.preventDefault();
        event.stopPropagation();

        // Close all other menus first
        document.querySelectorAll(".menu-dropdown.show-menu").forEach(menu => {
            if (menu !== optionsBtn.nextElementSibling) {
                menu.classList.remove("show-menu");
            }
        });

        // Toggle the visibility of the current menu (show or hide)
        const currentMenu = optionsBtn.nextElementSibling;
        currentMenu.classList.toggle("show-menu");
    } 
    else if (!menuDropdown) {
        document.querySelectorAll(".menu-dropdown.show-menu").forEach(menu => {
            menu.classList.remove("show-menu");
        });
    }
});



