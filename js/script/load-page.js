import toText from "../utils/to-text.js";
import getAllMatches from "../api/get-matches.js";
import getAllTeams from "../api/get-teams.js";
import getAllStandings from "../api/get-standings.js";
import scheduleIDB from "../indexedDB/scheduleIDB.js";
import teamIDB from "../indexedDB/teamIDB.js";
import loadNav from "./load-nav.js";
import getTeamById from "../api/get-team.js";

const loadPage = (page) => {
  page = page === "" ? "home" : page;

  //fetch page
  fetch(getPageUrl(page))
    .then((res) => toText(res))
    .then((resText) => {
      document.getElementById("content").innerHTML = resText;

      if (page === "home") addHomeEventListener();
      else if (page === "matches") getAllMatches();
      else if (page === "teams") getAllTeams();
      else if (page === "standings") getAllStandings();
      else if (page === "favorite") {
        scheduleIDB.getSavedSchedule();
        teamIDB.getSavedTeam();
      }

      loadNav();
    })
    .catch(err => console.log(err));
};

const addHomeEventListener = () => {
  document.querySelectorAll(".nav-link").forEach((elm) => {
    elm.addEventListener("click", () => {
      // load page
      const page = event.target.getAttribute("href").substr(1);
      window.scrollTo(0, 0);
      loadPage(page);
    });
  });
};

const getPageUrl = (pageName) => `../../pages/${pageName}.html`;

export default loadPage;
