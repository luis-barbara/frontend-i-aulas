// shared_components.js


// dali-header
const template_header = document.createElement("template");
template_header.innerHTML = `
    <style>
    @import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css");

* {
    box-sizing: border-box;
}

.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px 50px;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    background-color: #212121; 
}

.navbar nav {
    display: flex;
    align-items: center;
    gap: 20px;
    order: 2; 
}


.dali-button {
    font-size: 30px;
    font-weight: bold;
    text-decoration: none;
    color: white;
    order: 3;
    position: absolute;
    margin-left: 70px;
}


.dali-button:hover {
    color: #c9d1d9; 
}



.signin-button {
    font-size: 16px;
    text-align: center;
    text-decoration: none;
    color: white;
    transition: background-color 0.3s ease, color 0.3s ease;
}

.signin-button:hover {
    color: #c9d1d9;
}


.signup-button {
    font-size: 16px;
    text-align: center;
    text-decoration: none;
    background-color: #212121;
    color: white;
    border: 1px solid white;
    padding: 5px 10px 8px 10px;
    border-radius: 5px;
    transition: background-color 0.3s ease, color 0.3s ease;
}

.signup-button:hover {
    background-color: #c9d1d9;
    color: #212121;
}



.sidebar {
    position: fixed;
    top: 0;
    left: -250px;
    width: 250px;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    transition: left 0.3s;
    padding-top: 60px;
    z-index: 100;
}

.sidebar ul {
    list-style: none;
    padding: 0;
}

.sidebar li {
    padding: 15px;
}

.sidebar a {
    color: white;
    text-decoration: none;
    display: block;
    font-size: 18px;
    padding: 10px;
    transition: background 0.3s;
}

.sidebar a:hover {
    background: #3c3d43;
    border-radius: 5px;
}

/* Sidebar aberta */
.sidebar.open {
    left: 0;
}

.sidebar .close-btn {
    color: white;
    font-size: 36px;
    position: absolute;
    top: 10px;
    right: 20px;
    border: none;
    background: transparent;
    cursor: pointer;
}


/* Botão de hambúrguer */
.hamburger-menu {
    display: flex;
    flex-direction: column;
    cursor: pointer;
    gap: 6px;
    order: 1; 
}

.bar1, .bar2, .bar3 {
    width: 35px;
    height: 5px;
    background-color: white;
    transition: 0.4s;
}

.change .bar1 {
    transform: translate(0, 11px) rotate(-45deg);
}

.change .bar2 {
    opacity: 0;
}

.change .bar3 {
    transform: translate(0, -11px) rotate(45deg);
}

 </style>

<header>
    <div class="container">
        <div class="navbar">
            <a class="dali-button" href="./index.html">DALI.ai</a>
            <div class="hamburger-menu">
                <div class="bar1"></div>
                <div class="bar2"></div>
                <div class="bar3"></div>
            </div>
            <nav>
                <a class="signin-button" href="./signin.html">Signin</a>
                <a class="signup-button" href="./signup.html">Signup</a>
            </nav>
        </div>
    </div>
    <aside id="sidebar" class="sidebar">
        <button class="close-btn">&times;</button> <!-- Close button inside the sidebar -->
        <ul class="menu">
            <li><a href="./index.html"><i class="fas fa-home"></i> Home</a></li>
            <li><a href="./my_gallery.html"><i class="fas fa-image"></i> My Gallery</a></li>
            <li><a href="#"><i class="fas fa-user"></i> Character</a></li>
            <li><a href="#"><i class="fa-solid fa-mountain-sun"></i> Scenario</a></li>
            <li><a href="#"><i class="fas fa-video"></i> Video</a></li>
            <li><a href="./community.html"><i class="fas fa-users"></i> Community</a></li>
            <li><a href="#"><i class="fas fa-sign-out-alt"></i> Sign Out</a></li>
        </ul>
    </aside>
</header>

<style>
@media (max-width: 550px) {
  .dali-button {
    display: none;
  }

  .signup-button {
    display: none;
  }

  .signin-button {
    display: inline-block;
  }

  .hamburger-menu {
    display: flex;
  }
}
</style>
`;

class DaliHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template_header.content.cloneNode(true));
    }

    connectedCallback() {
        // hamburger menu and sidebar functionality
        const hamburgerMenu = this.shadowRoot.querySelector(".hamburger-menu");
        const sidebar = this.shadowRoot.querySelector(".sidebar");
        const closeButton = this.shadowRoot.querySelector(".sidebar .close-btn");

        // Function to toggle the sidebar and hamburger menu
        const toggleMenu = () => {
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
            const isClickInside = this.contains(event.target) || sidebar.contains(event.target);
            if (!isClickInside) {
                sidebar.classList.remove("open");
                hamburgerMenu.classList.remove("change");
            }
        });
    }
}

customElements.define('dali-header', DaliHeader);



// dali-footer
const template_footer = document.createElement("template");
template_footer.innerHTML = `
    <style>

footer {
    flex-shrink: 0;
    color: #c9d1d9;
    text-align: center;
    padding: 20px 0;
    position: relative;
    margin-top: 20px;
}

footer p {
    margin: 0;
    font-size: 14px;
    color: #c9d1d9;
}
 </style>

<footer>
    <div class="container">
        <p>&copy;<span id="year"></span> DALI.ai - all rights reserved</p>
    </div>
</footer>
`;


class DaliFooter extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template_footer.content.cloneNode(true));
    }

    connectedCallback() {
        const yearElement = this.shadowRoot.querySelector("#year");
        yearElement.textContent = new Date().getFullYear();
    }
}

customElements.define('dali-footer', DaliFooter);

