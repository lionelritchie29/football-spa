if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(() => console.log("ServiceWorker: Registered"))
      .catch(() => console.log("ServiceWorker: Failed to Register"));
  });
} else {
  console.log("This browser does not support ServiceWorker");
}
