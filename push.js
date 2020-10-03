var webPush = require("web-push");

const vapidKeys = {
  publicKey:
    "BFvpX6KJ8RdlynbbG0uVDopK2Qa3DFAs8aRXAYCpK2fdgzM2aOqJkM0s_y9QkhNaiQ6IWsXwCIKfW9PGLptBeZo",
  privateKey: "1x5S9fWDYoF_afMdglCGPp3ahbAu09XcxD5L60FXuJ8",
};

webPush.setVapidDetails(
  "mailto:example@yourdomain.org",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

const pushSubscription = {
  endpoint:
    "https://fcm.googleapis.com/fcm/send/dAl6Qb3VtaE:APA91bEB1GdNwy9U-KImQiFFp6is__nxnqd1-INrMTG39hcQGAHChPH74DjnBaijuXZ_7hMUnC3jL0ZVydWbuL_pWNFPrMl8TrIeVZqkD-7cCF-bEhaqKsIgEb3l9xebUMxP-PBXd6KM",
  keys: {
    p256dh:
      "BJwjI3KSjbr8OROFoaciu/1I5PbwssrqnvPZGbG9sM/96PpStH9zJCCyzuzjU4FJVwQLnYfnnw7efP5V/Szk8Ag=",
    auth: "+AP77LP97TZvkSINquG1Zg==",
  },
};

var payload = "Halo! Pertandingan favoritmu sebentar lagi akan dimulai";

var options = {
  gcmAPIKey: "498571968816",
  TTL: 60,
};

webPush.sendNotification(pushSubscription, payload, options);
