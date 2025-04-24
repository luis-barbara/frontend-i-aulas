// bibliotecas 

// splide.js
// sweetAlert2
// AOS (animated scroll)
// Chart.js
// Micromodal

// https://github.com/sorrycc/awesome-javascript?tab=readme-ov-file

document.addEventListener('DOMContentLoaded', function () {
    const splide = new Splide('.splide', {
      type      : 'loop',
      perPage   : 3,
      focus     : 'center',
      autoplay  : true,
      drag      : 'free',
      focus     : 'center',
      gap       : '10px',
      snap      : true,
      arrows    : true,
      pagination: true,
      autoScroll: {
        speed: 1,
      },
    } );
   
  
    // Atualizar barra de progresso
    const bar = document.querySelector('.my-carousel-progress-bar');
  
    splide.on('mounted move', function () {
      const end = splide.Components.Controller.getEnd() + 1;
      const rate = Math.min((splide.index + 1) / end, 1);
      bar.style.width = `${100 * rate}%`;
    });
  
    splide.mount();
  });
  