// Función para eliminar elementos según las preferencias
function cleanYouTube() {
  // Enviar un mensaje al background.js para obtener las preferencias
  chrome.runtime.sendMessage({ action: 'getPreferences' }, (data) => {
    if (data.shortsHome) {
      const richSectionElements = document.querySelectorAll('ytd-rich-section-renderer.style-scope.ytd-rich-grid-renderer');
      richSectionElements.forEach(element => element.remove());
      console.log('Shorts en la página principal eliminados:', richSectionElements.length);
    }

    if (data.shortsVideo) {
      const reelShelfElements = document.querySelectorAll('ytd-reel-shelf-renderer.style-scope.ytd-item-section-renderer');
      reelShelfElements.forEach(element => element.remove());
      console.log('Shorts en la vista de video eliminados:', reelShelfElements.length);
    }
  });
}

// Observar cambios en el DOM para eliminar elementos automáticamente
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