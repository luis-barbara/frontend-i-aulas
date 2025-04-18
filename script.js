
// hamburger menu and sidebar functionality
const hamburgerMenu = document.querySelector(".hamburger-menu");
const sidebar = document.querySelector(".sidebar");
const closeButton = document.querySelector(".sidebar .close-btn");

// Function to toggle the sidebar and hamburger menu
function toggleMenu() {
    hamburgerMenu.classList.toggle("change");
    sidebar.classList.toggle("open");
}

// Close the sidebar when the close button is clicked
closeButton.addEventListener("click", () => {
    sidebar.classList.remove("open");
    hamburgerMenu.classList.remove("change");
});

// Open/Close sidebar when hamburger menu is clicked
hamburgerMenu.addEventListener("click", toggleMenu);

// Close sidebar if clicked outside
document.addEventListener("click", (event) => {
    if (!sidebar.contains(event.target) && !hamburgerMenu.contains(event.target)) {
        sidebar.classList.remove("open");
        hamburgerMenu.classList.remove("change");
    }
});


// Dynamic text
const text = "What should we create today?";
    const dynamicText = document.getElementById("dynamic-text");
    let index = 0;

    function typeEffect() {
        if (index < text.length) {
            dynamicText.textContent += text.charAt(index);
            index++;
            setTimeout(typeEffect, 60); 
        }
    }

    typeEffect();