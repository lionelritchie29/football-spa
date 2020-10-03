const showNotification = (title, body, tag = "default") => {
  const options = {
    body,
    icon: "../../assets/logo/logo.png",
    badge: "../../assets/logo/logo.png",
    tag,
    renotify: tag === "default" ? false : true,
  };

  if (Notification.permission === "granted") {
    navigator.serviceWorker.ready.then((regis) => {
      regis.showNotification(title, options);
    });
  }
};

export default showNotification;
