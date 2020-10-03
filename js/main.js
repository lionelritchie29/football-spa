import loadPage from "./script/load-page.js";
import loadTeamDetailPage from "./script/load-team-detail-page.js";
import requestNotificationPermission from "../js/script/request-notification.js";

window.addEventListener("DOMContentLoaded", function () {
  requestNotificationPermission();
  if (window.location.hash.indexOf("team-detail") !== -1) {
    loadTeamDetailPage();
  } else {
    loadPage(window.location.hash.substr(1));
  }
});
