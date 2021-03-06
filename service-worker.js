const CACHE_NAME = "ligabola";
let urlsToCache = [
  "/",
  "/icon.png",
  "/customicon.png",
  "/manifest.json",
  "/index.html",
  "/nav.html",
  "/push.js",
  "/listteam.html",
  "/pages/home.html",
  "/pages/jadwal.html",
  "/pages/faveteam.html",
  "/css/materialize.min.css",
  "/css/style.css",
  "/css/materialize.css",
  "/js/materialize.js",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/js/api.js",
  "/js/idb.js",
  "/js/db.js"
];

// Install Service Worker
self.addEventListener('install',function(event){
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache){
      return cache.addAll(urlsToCache)
    })
  );
})

self.addEventListener("fetch", event => {
  let base_url = "https://api.football-data.org/v2";
  if (event.request.url.indexOf(base_url) > -1) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE_NAME);
        const res = await fetch(event.request);
        cache.put(event.request.url, res.clone());
        return res;
      })()
    );
  } else {
    event.respondWith(
      (async () => {
        const res = await caches.match(event.request.url, {
          ignoreSearch: true
        });
        return res || (await fetch(event.request));
      })()
    );
  }
});

// remove old cache
self.addEventListener("activate", function(event){
  event.waitUntil(
    caches.keys().then(function(cacheNames){
      return Promise.all(
        cacheNames.map(function(cacheName){
          if(cacheName != CACHE_NAME){
            console.log("ServiceWoreken : cache " + cacheName + "deleted");
            return caches.delete(cacheName);
          }
        })
      )
    })
  )
})
// Add Push Notification
self.addEventListener("push", function(event) {
  let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = "Push Message no payload";
  }

  let option = {
    body: body,
    icon: "./code.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification("Push Notification", option)
  );
});
