// Escuchar mensajes desde content.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getPreferences') {
    // Obtener las preferencias guardadas
    chrome.storage.sync.get(['shortsHome', 'shortsVideo', 'hideRelatedVideos'], (data) => {
      sendResponse(data); // Enviar las preferencias de vuelta
    });
    return true; // Indica que la respuesta será asíncrona
  }
});