// Service worker version
const CACHE_NAME = "cached-scripts-styles-and-assests";
const urlsToCache = [
  "/",
  "/styles/main.css",
  "/styles/common.css",
  "/styles/contacts.css",
  "/styles/form.css",
  "/scripts/app.js",
  "/scripts/contacts.js",
  "/scripts/form.js",
  "/scripts/modal.js",
  "/scripts/utils.js",
  "/assets/icons/icon-72x72.png",
  "/assets/icons/icon-128x128.png",
  "/assets/icons/icon-144x144.png",
  "/assets/icons/icon-152x152.png",
  "/assets/icons/icon-192x192.png",
  "/assets/icons/icon-384x384.png",
  "/assets/icons/icon-512x512.png",
];

self.addEventListener("install", function (event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      // Cache hit - return response
      if (response) {
        console.log("Cached Utilised!!");
        return response;
      }
      return fetch(event.request);
    })
  );
});

export const registerServiceWorker = () => {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("/scripts/service-worker.js").then(
        function (registration) {
          console.log(
            "ServiceWorker registration successful with scope: ",
            registration.scope
          );
        },
        function (err) {
          console.log("ServiceWorker registration failed: ", err);
        }
      );
    });
  }
};
