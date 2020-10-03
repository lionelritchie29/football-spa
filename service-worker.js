importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/5.1.3/workbox-sw.js"
);

if (workbox) console.log("workbox ok");

workbox.core.skipWaiting();
workbox.core.clientsClaim();

workbox.precaching.precacheAndRoute([
  { url: "/", revision: "1" },
  { url: "/manifest.json", revision: "1" },
  { url: "/favicon.ico", revision: "1" },
  { url: "/apple-icon-192x192.png", revision: "1" },
  { url: "/index.html", revision: "1" },
  { url: "/nav.html", revision: "1" },
  { url: "/css/vendor/materialize.min.css", revision: "1" },
  { url: "/css/style.css", revision: "1" },
]);

//js file
workbox.routing.registerRoute(
  new RegExp("/js/"),
  new workbox.strategies.CacheFirst({
    cacheName: "js",
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        // cache 1/2 bulan
        maxAgeSeconds: 60 * 60 * 24 * 15,
      }),
    ],
  })
);

//assets url
workbox.routing.registerRoute(
  new RegExp("/assets/"),
  new workbox.strategies.CacheFirst({
    cacheName: "assets",
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        // cache sebulan
        maxAgeSeconds: 60 * 60 * 24 * 30,
      }),
    ],
  })
);

//pages file
workbox.routing.registerRoute(
  new RegExp("/pages/"),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "pages",
  })
);

// css assets from material icon
workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "google-fonts-stylesheets",
  })
);

// material icon file font cache
workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  new workbox.strategies.CacheFirst({
    cacheName: "google-fonts-webfonts",
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);

//api file
workbox.routing.registerRoute(
  /^https:\/\/api\.football-data\.org/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "football-data",
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 30,
      }),
    ],
  })
);

self.addEventListener("push", (e) => {
  const title = "FootballSpa";
  let body = "";
  body = e.data ? e.data.text() : "No Payload";
  const options = {
    body,
    icon: "/assets/logo/logo.png",
    badge: "/assets/logo/logo.png",
    vibrate: [100, 50, 100, 50],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  };

  e.waitUntil(self.registration.showNotification(title, options));
});
