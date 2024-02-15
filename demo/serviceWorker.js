const staticDevCoffee = "dev-kerakoll"
const assets = [
  "/",
  "/index.html",
  "/css/style.css",
  "/js/app.js",
  "/images/icons/icon-72x72.png",
  "/images/icons/icon-96x96.jpg",
  "/images/icons/icon-128x128.jpg",
  "/images/icons/icon-144x144.jpg",
  "/images/icons/icon-192x192.jpg",
  "/images/icons/icon-384x384.jpg",
  "/images/icons/icon-512x512.jpg",
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticDevCoffee).then(cache => {
      cache.addAll(assets)
    })
  )
})

