import { getCookie, setCookie } from "./cookie-service.js";
import { closeModal, openModal } from "./modal.js";
import { PWAConsentModalConfig } from "./utils.js";

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

let deferredPrompt;
const installButton = document.getElementById(
  PWAConsentModalConfig.submitBtn.id
);

// Listen for the beforeinstallprompt event
window.addEventListener("beforeinstallprompt", (event) => {
  console.log("beforeinstallprompt event fired");
  // Prevent the mini-infobar from appearing on mobile
  event.preventDefault();
  // Stash the event so it can be triggered later
  deferredPrompt = event;
  // Show the install notification
  const isPreviouslyDisplayed = getCookie("pwaConsentDisplayed") === "true";
  console.log(isPreviouslyDisplayed);
  if (!isPreviouslyDisplayed) {
    setTimeout(() => {
      openModal(PWAConsentModalConfig.id);
    }, 10000);
  } else {
    console.log("PWA Popup was shown!!");
  }
});

// Listen for the install button click event
installButton.addEventListener("click", function () {
  closeModal.call(this);
  deferredPrompt.prompt();
  deferredPrompt.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === "accepted") {
      console.log("User accepted the install prompt");
      setCookie("pwaConsent", "true", 30);
    } else {
      console.log("User dismissed the install prompt");
    }
    setCookie("pwaConsentDisplayed", "true", 1);
    deferredPrompt = null;
  });
});
