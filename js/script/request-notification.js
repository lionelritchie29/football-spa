import subscribePushNotification from "../script/subscribe-push-notification.js";

const requestNotificationPermission = () => {
  if ("Notification" in window) {
    Notification.requestPermission().then((result) => {
      if (result === "denied") {
        console.log("You are not allowing FootballSpa to show notification.");
        return;
      } else if (result === "default") {
        console.log("You did not choose one either");
        return;
      }

      // permission granted
      subscribePushNotification();
    });
  } else {
    console.error("This browser does not support notification.");
  }
};

export default requestNotificationPermission;
