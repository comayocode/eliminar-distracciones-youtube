// Función para ocultar elementos según las preferencias
function cleanYouTube() {
  // Enviar un mensaje al background.js para obtener las preferencias
  chrome.runtime.sendMessage({ action: 'getPreferences' }, (data) => {
    if (data.shortsHome) {
      const richSectionElements = document.querySelectorAll('ytd-rich-section-renderer.style-scope.ytd-rich-grid-renderer');
      richSectionElements.forEach(element => {
        if (element.style.display !== 'none') {
          element.style.display = 'none'; // Ocultar el elemento solo si no está ya oculto
        }
      });
    }

    if (data.shortsVideo) {
      const reelShelfElements = document.querySelectorAll('ytd-reel-shelf-renderer.style-scope.ytd-item-section-renderer');
      reelShelfElements.forEach(element => {
        if (element.style.display !== 'none') {
          element.style.display = 'none'; // Ocultar el elemento solo si no está ya oculto
        }
      });
    }

    if (data.hideRelatedVideos) {
      const relatedVideosElement = document.querySelector('ytd-watch-flexy #columns #secondary');
      if (relatedVideosElement && relatedVideosElement.style.display !== 'none') {
        relatedVideosElement.style.display = 'none'; // Ocultar el elemento solo si no está ya oculto
      }
    }
  });
}

// Función debounce para limitar la frecuencia de ejecución
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// Configurar el MutationObserver para que sea más eficiente
const observer = new MutationObserver(
  debounce((mutations) => {
    for (const mutation of mutations) {
      // Verificar si se han añadido nodos nuevos al DOM
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        cleanYouTube(); // Ejecutar la limpieza solo si hay nuevos nodos
      }
    }
  }, 100) // Esperar 100 ms antes de ejecutar
);

// Observar solo el cuerpo de la página y sus hijos directos
observer.observe(document.body, {
  childList: true, // Observar cambios en los hijos directos
  subtree: true,   // Observar cambios en todos los subárboles
});

// Ejecutar la limpieza al cargar la página
cleanYouTube();