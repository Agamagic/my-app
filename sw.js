const CACHE = "app-cache-v1";
const ASSETS = [
  "/my-app/",
  "/my-app/index.html",
  "/my-app/styles.css",   // если есть
  "/my-app/app.js",       // если есть
  "/my-app/icon-192.png",
  "/my-app/icon-512.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(caches.match(e.request).then((r) => r || fetch(e.request)));
});
