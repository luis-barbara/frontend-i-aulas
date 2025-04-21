
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


// File input API (nativa javascript)
document.addEventListener("DOMContentLoaded", () => {
    const attachBtn = document.getElementById("attachBtn");
    const fileInput = document.getElementById("fileInput");
  
    attachBtn.addEventListener("click", () => {
      fileInput.click();  
    });
  
    fileInput.addEventListener("change", () => {
      const files = fileInput.files;
  
      if (files.length > 0) {
        const file = files[0];
        alert(`Ficheiro "${file.name}" carregado com sucesso!`);
      }
    });
});


// Web speech API (nativa javascript)
document.addEventListener("DOMContentLoaded", () => {
    const recordButton = document.querySelector(".record-button");

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';  
        recognition.continuous = false;  
        recognition.interimResults = false;  

        recordButton.addEventListener("click", () => {
            recognition.start();
            console.log("🎙️ Voice recording started...");
        });

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;  
            console.log("📝 Recognized text:", transcript);

            // Display success message with recognized text
            alert(`Recording completed successfully! Recognized text: "${transcript}"`);
        };

        recognition.onerror = (event) => {
            console.error("❌ Voice recognition error:", event.error);
            alert("Error recognizing voice: " + event.error);
        };

        recognition.onend = () => {
            console.log("🛑 Recording ended");
        };
    } else {
        alert("⚠️ Your browser does not support voice recognition.");
    }
});
