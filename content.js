// Función para ocultar elementos según las preferencias
function cleanYouTube() {
  // Enviar un mensaje al background.js para obtener las preferencias
  chrome.runtime.sendMessage({ action: 'getPreferences' }, (data) => {
    if (data.shortsHome) {
      const richSectionElements = document.querySelectorAll('ytd-rich-section-renderer.style-scope.ytd-rich-grid-renderer');
      richSectionElements.forEach(element => {
        element.style.display = 'none'; // Ocultar el elemento
      });
    }

    if (data.shortsVideo) {
      const reelShelfElements = document.querySelectorAll('ytd-reel-shelf-renderer.style-scope.ytd-item-section-renderer');
      reelShelfElements.forEach(element => {
        element.style.display = 'none'; // Ocultar el elemento
      });
    }
  });
}

// Observar cambios en el DOM para ocultar elementos automáticamente
const observer = new MutationObserver((mutations) => {
  mutations.forEach(() => {
    cleanYouTube();
  });
});

// Configurar el observer para que escuche cambios en el cuerpo de la página
observer.observe(document.body, {
  childList: true,
  subtree: true,
});

// Ejecutar la limpieza al cargar la página
cleanYouTube();