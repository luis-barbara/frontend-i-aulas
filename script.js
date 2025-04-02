// Seleciona todos os botões de hambúrguer
var toggles = document.querySelectorAll(".c-hamburger");

// Para cada botão, define um "click handler"
for (var i = toggles.length - 1; i >= 0; i--) {
  var toggle = toggles[i];
  toggleHandler(toggle);
};

// Função que trata a lógica do clique
function toggleHandler(toggle) {
  toggle.addEventListener("click", function(e) {
    e.preventDefault();
    if (this.classList.contains("is-active") === true) {
      // Quando o menu é fechado
      this.classList.remove("is-active");
      document.querySelector(".sub-menu").classList.remove("oppenned");
    } else {
      // Quando o menu é aberto
      this.classList.add("is-active");
      document.querySelector(".sub-menu").classList.add("oppenned");
    }
  });
}

// Fechar o menu quando um link for clicado
document.querySelectorAll(".sub-menu li a").forEach(function(item) {
  item.addEventListener("click", function() {
    document.querySelector(".sub-menu").classList.remove("oppenned");
    document.querySelector(".c-hamburger").classList.remove("is-active");
  });
});
