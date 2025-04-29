// Dynamic text effect
const dynamicText = document.getElementById("dynamic-text");
const text = "What should I create for you today?";
let index = 0;

function typeEffect() {
    if (dynamicText && index < text.length) {
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
        alert(`File "${file.name}" uploaded successfully!`);
      }
    });
});


// Web speech API (nativa javascript)
document.addEventListener("DOMContentLoaded", () => {
    const recordButton = document.querySelector(".record-button");

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.lang = 'pt-PT';  
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
