const staticKerakoll = "dev-kerakoll"
const assets = [
  "/",
  "/index.html",
  "/css/style.css",
  "/js/jquery-min.js",
  "/js/app.js",
  "/js/main.js",
  "/images/favicon.png",
  "/images/screen.png",
  "/images/icons/icon-72x72.png",
  "/images/icons/icon-96x96.png",
  "/images/icons/icon-128x128.png",
  "/images/icons/icon-144x144.png",
  "/images/icons/icon-192x192.png",
  "/images/icons/icon-384x384.png",
  "/images/icons/icon-512x512.png",
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticKerakoll)
    .then(cache => { cache.addAll(assets); })
    .catch(err => { console.log(err); })
  )
})

self.addEventListener("fetch", event => {
  console.log('test');
  event.respondWith(fetch(event.request).catch(err => caches.match(event.request).then(response => response)));
});

 


 
 

// self.addEventListener("install", (e) => {
//   e.waitUntil(
//     (async () => {
//       const cache = await caches.open(staticKerakoll);
//       await cache.addAll(assets);
//     })(),
//   );
// });
 