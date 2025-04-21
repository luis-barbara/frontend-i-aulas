// API nativas javascript

// Geolocation API

// DateTime API (Date)
const agora = new Date();
console.log(agora.toLocaleString);


// Clipboard API
navigator.clipboard.writeText("Texto copiado!")
    .then(()=> alert("texto copiado com sucesso!"))
    .catch(()=> alert("Erro ao copiar."))


// Fullscreen API


