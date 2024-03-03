const staticKerakoll = "dev-kerakoll"
const assets = [
  "/",
  "/index.html",
  "/css/style.css",
  "/css/slick.css",
  "/js/jquery-min.js",
  "/js/app.js",
  "/js/main.js",
  "/js/slick.min.js",
  "/fonts/arialmt.woff",
  "/fonts/arialmt.woff2",
  "/images/icons/icon-72x72.png",
  "/images/icons/icon-96x96.png",
  "/images/icons/icon-128x128.png",
  "/images/icons/icon-144x144.png",
  "/images/icons/icon-192x192.png",
  "/images/icons/icon-384x384.png",
  "/images/icons/icon-512x512.png",
  "/images/favicon.png",
  "/images/screen.png",
  "/images/QR.png",
  "/images/pageloader.png",
  "/images/logo.png",
  "/images/arrow.png",
  "/images/arrows.png",
  "/images/brand.png",
  "/images/dashboard_double_pro1.png",
  "/images/dashboard_double_pro2.png",
  "/images/dashboard_single_pro.png",
  "/images/profile/dp.png",
  "/images/product-categories/pc1.jpg",
  "/images/product-categories/pc2.png",
  "/images/product-categories/pc3.png",
  "/images/product-categories/pic4.jpg",
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticKerakoll)
    .then(cache => { cache.addAll(assets); })
    .catch(err => { console.log(err); })
  )
})

self.addEventListener("fetch", event => {
 // console.log('test');
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
 