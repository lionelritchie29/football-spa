import API from "./main.js";
import toJson from "../utils/to-json.js";
import teamIDB from "../indexedDB/teamIDB.js";
import loadPage from "../script/load-page.js";
import showNotification from "../utils/show-notification.js";

const getTeamById = (id) => {
  //check if the data already in cache
  caches.match(`${API.BASE_URL}/teams/${id}`).then((res) => {
    if (res) {
      console.log("Fetching teams detail from caches");
      toJson(res).then((data) => {
        addToHtml(data);
      });
    } else {
      console.log("Fetching team detail from api");
      fetchFromApi(id);
    }
  });
};

const fetchFromApi = (id) => {
  fetch(`${API.BASE_URL}/teams/${id}`, API.OPTIONS)
    .then((res) => toJson(res))
    .then((resJson) => addToHtml(resJson));
};

const addToHtml = (team) => {
  let playerDetailHTML = "";
  team.squad.forEach((squad) => {
    playerDetailHTML += `
        <li class="collection-item avatar">
            <div class="circle center bg-primary">
                <div class="team-squad-number">
                ${squad.shirtNumber === null ? "X" : squad.shirtNumber}
                </div>
            </div>
            <span class="title">${squad.name}</span>
            <p>${squad.countryOfBirth}</p>
            <p class="secondary-content">${
              squad.position === null ? "Coach/Ass. Coach" : squad.position
            }</p>
        </li>
      `;
  });

  let teamDetailHTML = `
        <h4>${team.name} <button class="btn right bg-primary white-text" id="team-${team.id}">Add to Favorite</button> </h4>

        <div class="row">
            <div class="col s12 l6" class="team-desc">
            <p>
                <span class="team-desc-title">Address : </span>${team.address}
            </p>
            <p><span class="team-desc-title">Phone : </span>${team.phone}</p>
            <p>
                <span class="team-desc-title">Website : </span>
                ${team.website}
            </p>
            <p>
                <span class="team-desc-title">Email : </span>
                ${team.email}
            </p>
            <p>
                <span class="team-desc-title">Venue : </span> ${team.venue}
            </p>
            <p><span class="team-desc-title">Founded : </span>${team.founded}</p>
            </div>
            <div class="col s12 l6">
            <h6>Players</h6>

            <ul class="collection">
                ${playerDetailHTML}
            </ul>
            </div>
        </div>
    `;

  console.log(document.getElementById("team-detail"));
  if (!document.getElementById("team-detail")) {
    location.reload();
  } else {
    document.getElementById("team-detail").innerHTML = teamDetailHTML;

    //add event listener
    const addFavBtn = document.getElementById(`team-${team.id}`);
    addFavBtn.addEventListener("click", () => {
      teamIDB.saveTeam(team);
      M.toast({
        html: `${team.name} team is succesfully saved to your favorites!`,
      });
      showNotification(
        "You just added a new team!",
        `${team.name} Team is added to your Favorites!`,
        "team"
      );
    });

    const backBtn = document.getElementById("back-btn");
    backBtn.addEventListener("click", () => {
      loadPage("teams");
      window.location.hash = "#teams";
    });
  }
};

export default getTeamById;
