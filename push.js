let webPush = require("web-push");
const vapidKeys = {
  publicKey:"BCHbRZcik9Y6IeBI7I3kToppatQq0zLKtHbnCKSdq96MTD0P5LfGKN623sxCNIjfGbhLAbKMo95ySuVLroyiuaI",
  privateKey: "AuWYflR1-XjqIeQ2uiUNLGI9sORugcUPNy3dZitctOc"
};

webPush.setVapidDetails(
  "mailto:example@yourdomain.org",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);
let pushSubscription = {
  endpoint:
    "https://fcm.googleapis.com/fcm/send/fnyvqVYZ4nQ:APA91bHVW1z5qAGqextO4bd_EHVi9toSid2cJ42FTcVghP1kEH0z1Tom6dByBSU0zf4L7w8ql2LxQ5cc2M8FJUyF8WWr6_f9GMTuFpj2l1yhsx0upuRYrpYzq4weL4wBFUmLhp4w3CPH",
  keys: {
    p256dh:
      "BA7CiH93VXoM0xjfWXrwread4v1sgdcU2KlqdwF/RQY5pNXz8Xp9M6mTHJaZcn86CkGIMzr/qQvqkdsnW97MFHc=",
    auth: "27So1Nyi9hzefVhzWKViFw=="
  }
};
let payload = "Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!";
let options = {
  gcmAPIKey: "311941191946",
  TTL: 60
};
webPush.sendNotification(pushSubscription, payload, options);
