//breed_api.js

document.getElementById("dogForm").addEventListener("submit", async function(event) {
    event.preventDefault(); 

    const breed = document.getElementById("breedInput").value.toLowerCase();
    const resultDiv = document.getElementById("result");
    const errorMessage = document.getElementById("errorMessage");

    resultDiv.innerHTML = ""; 
    errorMessage.textContent = "";

    const url = `https://dog.ceo/api/breed/${breed}/images/random`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === "success") {
            const img = document.createElement("img");
            img.src = data.message;
            img.alt = "Dog image";
            img.style.width = "300px";
            resultDiv.appendChild(img);
        } else {
            errorMessage.textContent = "Breed not found. Try another.";
        }
    } catch (error) {
        errorMessage.textContent = "Error fetching image. Please try again.";
    }
});