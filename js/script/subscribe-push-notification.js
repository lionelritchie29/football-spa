import urlBase64ToUint8Array from "../utils/urlBase64ToUint8Array.js";
const publicKey =
  "BFvpX6KJ8RdlynbbG0uVDopK2Qa3DFAs8aRXAYCpK2fdgzM2aOqJkM0s_y9QkhNaiQ6IWsXwCIKfW9PGLptBeZo";

const subscribeOptions = {
  userVisibleOnly: true,
  applicationServerKey: urlBase64ToUint8Array(publicKey),
};

const subscribePushNotification = () => {
  if ("PushManager" in window) {
    navigator.serviceWorker.getRegistration().then((registration) => {
      registration.pushManager
        .subscribe(subscribeOptions)
        .then((subscribe) => {
          console.log(
            "Berhasil melakukan subscribe dengan endpoint: ",
            subscribe.endpoint
          );
          console.log(
            "Berhasil melakukan subscribe dengan p256dh key: ",
            btoa(
              String.fromCharCode.apply(
                null,
                new Uint8Array(subscribe.getKey("p256dh"))
              )
            )
          );
          console.log(
            "Berhasil melakukan subscribe dengan auth key: ",
            btoa(
              String.fromCharCode.apply(
                null,
                new Uint8Array(subscribe.getKey("auth"))
              )
            )
          );
        })
        .catch((e) =>
          console.error("Tidak dapat melakukan subscribe ", e.message)
        );
    });
  }
};

export default subscribePushNotification;
