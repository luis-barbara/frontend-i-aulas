const hamburgerMenu = document.querySelector(".hamburger-menu");
const sidebar = document.querySelector(".sidebar");

// Function to toggle the sidebar and hamburger menu
function toggleMenu() {
    hamburgerMenu.classList.toggle("change");
    sidebar.classList.toggle("open");
}

hamburgerMenu.addEventListener("click", toggleMenu);

// Close menu when clicking outside
document.querySelectorAll(".sidebar a").forEach(link => {
    link.addEventListener("click", () => {
        sidebar.classList.remove("open");
        hamburgerMenu.classList.remove("change");
    });
});

