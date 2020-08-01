const staticDevCoffee = "dev-coffee-site-v2";
const assets = [
  "/",
  "/index.html",
  "/css/style.css",
  "/js/app.js",
  "/images/coffee1.jpg",
  "/images/coffee2.jpg",
  "/images/coffee3.jpg",
  "/images/coffee4.jpg",
  "/images/coffee5.jpg",
  "/images/coffee6.jpg",
  "/images/coffee7.jpg",
  "/images/coffee8.jpg",
  "/images/coffee9.jpg"
];

//install service worker
self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticDevCoffee).then(cache => {
      cache.addAll(assets);
    })
  );
});

//activate event
self.addEventListener('fetch', evt => {
  //console.log('fetch event', evt);
  evt.waitUntil(
   caches.keys().then(keys => {
     //console.log(keys);
        return Promise.all(keys.filter(key => key !== staticDevCoffee).map(key => caches.delete(key))
	    )
    })
  );
});

//fetch event
self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    })
  );
});
