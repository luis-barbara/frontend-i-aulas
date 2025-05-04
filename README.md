# frontend-i-aulas
Projeto aulas

# Título website: DAlI.ai

# Descrição do website:
### Githubpages:
https://luis-barbara.github.io/frontend-i-aulas/

### Repositório
https://github.com/luis-barbara/frontend-i-aulas


### **Titulo do website:** Projeto Exercicios Aulas

### **Descrição do website:** Demonstração das matérias dadas nas aulas

# Requisitos

1. Converter objecto javascript para json e vice versa - [api.js], [community_api.js], [user_api.js], [utils], [exercicios_aulas/08-04-2025]
2. Guardar e ler informação da local storage - [exercicios_aulas/07-04-2025], [exercicios_aulas/29-03-2025], [exercicios_aulas/storage.html]
3. Inserir informação através de formulário e mostrar informação após submeter - [exercicios_aulas/07-04-2025], [exercicios_aulas/29-03-2025], [exercicios_aulas/storage.html]
4. Fazer fetch de uma api e mostrar resultados no ecrã - [exercicios_aulas/08-04-2025]
5. Através de um input, inserir um termo de procura e apresentar resultados de uma API pública - [exercicios_aulas/10-04-2025]
6. Implementar pelo menos 2 apis nativas de javascript, por exemplo geolocation e clipboard - [my_gallery_api.js]:DateTime API (Date footer), [script.js]: File api (file upload chatbox), Web Speech Api (voice chatbox)
7. Desenhar 2 formas básicas no canvas api - [exercicios_aulas/22-04-2025]
8. Implementar um component de web components - [exercicios_aulas/23-04-2025]
9. Utilizar uma biblioteca externa, por exemplo, caroussel - [exercicios_aulas/24-04-2025]
10. Gerar report do Lighthouse e colocar screenshot no repositório do projeto. Ter pelo menos 90 de score em 2 das 4 métricas - [images/Captura_ecra_2025-04-30.png]
11. Pelo menos 1 exemplo de cada CRUD operation - [api.js], [my_gallery_api.js]


## Bonus

Implementação dos requisitos ao contexto do projeto em si

Apresentar projeto no portfolio desenvolvido em Web Pages
[https://luis-barbara.github.io/webpages-portfolio/]




# DALI.ai – AI Image Generator | Create Stunning Art Instantly

**DALI.ai** is a web-based platform that allows users to generate high-quality images through conversational interaction with an AI model. Inspired by surrealist creativity and powered by state-of-the-art machine learning, the platform provides an intuitive interface for users to transform text prompts into unique and visually stunning artwork.

The project integrates **advanced web technologies** for seamless, responsive design and interactive features that elevate the user experience.

---

## 🧠 **Core Features & Architecture:**

### 1. **Modern, Responsive User Interface**
- Developed using **HTML5**, **CSS3**, and **JavaScript**, ensuring a **clean** and **user-friendly** interface optimized for both desktop and mobile devices.
- **Custom Web Components**:
   - **`<dali-header>`** and **`<dali-footer>`**: These reusable web components maintain a modular and consistent layout structure across the site.
- **Design Aesthetic**: 
   - Dark-themed UI for better contrast and visual appeal.

### 2. **AI-Powered Image Generation**
- Users input text descriptions, and the AI model transforms them into creative, high-quality images.
- **Dynamic Text Animations**: An animated heading adds a touch of interactivity, making the website feel alive and engaging.

### 3. **Voice Command Integration**
- **Web Speech API**: Users can speak their prompts to generate images, adding an additional layer of convenience and accessibility to the experience.

### 4. **File Upload Capabilities**
- Users can upload images or reference files to enhance their image generation experience, allowing them to provide more context or inspiration.

---

## 🔧 **Technologies Used:**

- **Frontend Technologies**:  
   - **HTML5**, **CSS3**, **JavaScript** for the base structure and interactivity of the application.
   - **Web Speech API** for speech-to-text capabilities.
   - **File API** for handling file uploads.
   - **Web Components** using templates and **Shadow DOM** for efficient, reusable UI elements.

- **UI Enhancements**:  
   - **Animations**: Dynamic text and transitions to keep the user engaged.
   - **Responsive Design**: Ensures a smooth experience across devices, from desktop to mobile.
   - **Accessibility**: ARIA labels and descriptive placeholders for improved usability.

---

## 📸 **Gallery & Interactive Features:**

**DALI.ai** also features a dynamic gallery, **My Gallery**, where users can manage and interact with their AI-generated artwork:

### 1. **CRUD Operations for Posts**
- **Create, Update, and Delete**: Users can perform CRUD operations on their generated images, allowing for an interactive gallery experience.
- **Posts and Sharing**: Each post has buttons to **like**, **save**, or **share** with others.

### 2. **Advanced Search and Filtering**
- **Smart Search**: Users can search for posts by title.
- **Category Filters**: The posts can be filtered in real-time based on categories like "Character," "Scenario," or "Video."

### 3. **Interactive Post Management**
- **SweetAlert2**: For confirmation dialogs when deleting posts, preventing accidental deletions.
- **Post Editing**: An intuitive form that lets users edit their posts, with real-time validation and error messages.

---

## 🛠️ **Project Structure & Code Organization:**

- **API Integration**: Uses a **MockAPI** for backend operations, handling the asynchronous loading and manipulation of data.
- **Modular Codebase**

The project follows a well-organized modular structure with separate files for JavaScript, CSS, HTML, and images, ensuring maintainability and scalability. Below is an overview of the key files:

### JavaScript Files:
- **`api.js`**: Contains functions for interacting with the **MockAPI**. This file is responsible for performing CRUD (Create, Read, Update, Delete) operations related to community posts. It interacts with the API endpoint.
- **`community_api.js`**: Handles API functions specific to the community's interactions, such as fetching, creating, updating, and deleting posts. This file builds on the `api.js` functions, potentially adding any community-specific logic, and is typically used for managing user interactions with the community's content.
- **`user_api.js`**: Contains functions to interact with the MockAPI for CRUD operations on posts. It allows for fetching all posts, retrieving a specific post by ID, creating, updating, and deleting posts.
- **`script.js`**: Manages dynamic text display with a typing effect. Handles file uploads by triggering an alert with the file name upon selection. Utilizes the Web Speech API for voice recognition to transcribe speech to text and display it in an alert.
- **`my_gallery_api.js`**: This JavaScript file contains the frontend logic for displaying posts in a gallery format, with options to filter, search, edit, delete, and share posts. It interacts with the backend through `api.js` functions to update the displayed data dynamically

### CSS Files:
- **`chatbox.css`**: Styles the chatbox interface for the AI image generator, ensuring a clean and interactive design.
- **`community.css`**: Contains the styles for the community page, ensuring a visually appealing and user-friendly layout.
- **`my_gallery.css`**: Custom styles specific to the gallery section, maintaining a consistent look and feel across the user’s gallery.
- **`signin.css`**: Styles the sign-in page to create a user-friendly authentication interface.
- **`signup.css`**: Defines the styles for the sign-up page, ensuring an intuitive and visually engaging registration form.
- **`styles.css`**: General global styles for the entire project, ensuring a consistent design across all pages.

### HTML Files:
- **`community.html`**: The main HTML page for displaying community posts, with integrated search, filters, and dynamic content rendering.
- **`index.html`**: The landing page or homepage of the project, likely featuring the AI image generator interface and introductory content.
- **`my_gallery.html`**: HTML page dedicated to displaying the user’s AI-generated images in a gallery format with CRUD functionality.
- **`signin.html`**: Login page allowing users to sign in to their accounts.
- **`signup.html`**: Registration page where new users can create an account.

### Image Assets:
- **`images/`**: Contains image assets like the favicon and images used for the mock API data (such as my gallery, community post images, and other media for the gallery).

### Miscellaneous:
- **`license`**: The project’s licensing file, specifying the terms under which the code and assets can be used and distributed.
- **`Readme.md`**: Documentation file with essential details about the project, installation instructions, and usage guidelines.

---

This modular structure separates concerns effectively, improving the project’s scalability and ease of maintenance. Each component—whether it's the frontend UI, backend interactions, or data management—is encapsulated within its respective file or directory, making the codebase clean and manageable.

The use of reusable components (like `shared_components.js` for the header/footer), along with dedicated files for specific functionalities (e.g., `api.js` for handling data operations and `styles.css` for general styling), ensures that the project remains flexible for future extensions or updates.






#### **Code Best Practices**:  
- **Clean, Modular DOM Manipulation**: Clear structure for event handling and DOM updates.
- **Smooth Scrolling**: Enhances user experience during interactions (e.g., scrolling to form fields).
- **Loading States**: Use of spinners and loading indicators to provide feedback during asynchronous operations.

---

## 💡 **User Experience (UX) Enhancements**:

- **Clear & Accessible Buttons**: Each button (like, save, share) has an accompanying icon and text for better understanding.
- **Real-time Interactions**: Immediate feedback on search and filtering changes, keeping users engaged.
- **Smooth Transitions**: CSS animations for dynamic elements like text headings, improving the overall feel of the application.

---

## **DALI.ai - A Platform for the Future of Art**

**DALI.ai** not only lets users interact with AI to generate artwork but also provides them with an interactive and engaging community experience. Whether it’s generating artwork, managing posts in a personal gallery, or simply exploring creative prompts, this platform stands at the intersection of **art** and **technology**, offering an exciting glimpse into the future of AI-driven creativity.
