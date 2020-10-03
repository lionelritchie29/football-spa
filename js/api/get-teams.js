import API from "./main.js";
import toJson from "../utils/to-json.js";
import loadPage from "../script/load-page.js";
import getTeamById from "./get-team.js";
import replaceUrl from "../utils/replace-url.js";

const teamsUrl = "competitions/2014/teams";

const getAllTeams = () => {
  //check if the data already in cache
  caches.match(`${API.BASE_URL}/${teamsUrl}`).then((res) => {
    if (res) {
      console.log("fetching teams from cache");
      toJson(res).then((data) => {
        addToHtml(data.teams);
      });
    } else {
      console.log("fetching team from api");
      fetchFromApi();
    }
  });
};

const fetchFromApi = () => {
  fetch(`${API.BASE_URL}/${teamsUrl}`, API.OPTIONS)
    .then((res) => toJson(res))
    .then((resJson) => addToHtml(resJson.teams));
};

const addToHtml = (teams) => {
  let teamsHTML = "";
  teams.forEach((team) => {
    teamsHTML += `
        <div class="col s12 m6 l4 xl3">
          <div class="card">
            <div class="card-image">
              <img 
                src="${replaceUrl(team.crestUrl)}" 
                class="responsive-img team-img" 
                alt="${team.name}" 
                title="${team.name}"
              />
            </div>
            <div class="card-content">
              <p class="center team-title truncate" title="${team.name}">
                ${team.name}
              </p>
            </div>
            <div class="card-action">
              <a href="#team-detail?id=${team.id}" id="team-${team.id}">More</a>
            </div>
          </div>
        </div>
          `;
  });

  document.getElementById("teams").innerHTML = teamsHTML;

  // add event listener
  teams.forEach((team) => {
    const favBtn = document.querySelector(`#team-${team.id}`);
    favBtn.addEventListener("click", () => {
      loadPage("team-detail");
      getTeamById(team.id);
    });
  });
};

export default getAllTeams;
