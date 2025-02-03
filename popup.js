// Elementos del DOM
const shortsHomeToggle = document.getElementById('shortsHome');
const shortsVideoToggle = document.getElementById('shortsVideo');
const hideRelatedVideosToggle = document.getElementById('hideRelatedVideos');

// Cargar preferencias guardadas
chrome.storage.sync.get(['shortsHome', 'shortsVideo', 'hideRelatedVideos'], (data) => {
  shortsHomeToggle.checked = data.shortsHome || false;
  shortsVideoToggle.checked = data.shortsVideo || false;
  hideRelatedVideosToggle.checked = data.hideRelatedVideos || false;
});

// Guardar preferencias cuando el usuario cambie los toggles
shortsHomeToggle.addEventListener('change', () => {
  chrome.storage.sync.set({ shortsHome: shortsHomeToggle.checked });
});

shortsVideoToggle.addEventListener('change', () => {
  chrome.storage.sync.set({ shortsVideo: shortsVideoToggle.checked });
});

hideRelatedVideosToggle.addEventListener('change', () => {
  chrome.storage.sync.set({ hideRelatedVideos: hideRelatedVideosToggle.checked });
});