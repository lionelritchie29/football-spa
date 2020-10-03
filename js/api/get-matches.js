import API from "./main.js";
import toJson from "../utils/to-json.js";
import scheduleIDB from "../indexedDB/scheduleIDB.js";
import showNotification from "../utils/show-notification.js";

const scheduledMatchUrl = "competitions/2014/matches?status=SCHEDULED";

const getAllMatches = () => {
  //check if the data already in cache
  caches.match(`${API.BASE_URL}/${scheduledMatchUrl}`).then((res) => {
    if (res) {
      console.log("Fetching match from caches");
      toJson(res).then((data) => {
        addToHtml(data.matches);
      });
    } else {
      console.log("Fetching match from api");
      fetchFromApi();
    }
  });
};

const fetchFromApi = () => {
  fetch(`${API.BASE_URL}/${scheduledMatchUrl}`, API.OPTIONS)
    .then((res) => toJson(res))
    .then((resJson) => addToHtml(resJson.matches));
};

const addToHtml = (matches) => {
  let matchesHTML = "";
  matches.forEach((match, index) => {
    matchesHTML += `
        <div class="col s12">
          <div class="card bg-surface">
            <span class="badge scheduled-badge">
              Scheduled
            </span>
            <div class="card-content">
              <div class="center match-time">
                ${new Date(match.utcDate)}
              </div>
              <div class="center match-info">
                <div>
                  <p>Home</p>
                  <div>
                    <img src="../assets/images/home.svg" alt="home" />
                  </div>
                  <p>${match.homeTeam.name}</p>
                </div>
                <div class="valign-wrapper">
                  VS
                </div>
                <div>
                  <p>Away</p>
                  <div>
                    <img src="../assets/images/away.svg" alt="away" />
                  </div>
                  <p>${match.awayTeam.name}</p>
                </div>
              </div>
            </div>
            <div class="card-action">
              <div id="match-${index}" class="text-secondary">Add to Favorite</div>
            </div>
          </div>
        </div>
        `;
  });

  document.getElementById("matches").innerHTML = matchesHTML;

  //add event listener
  matches.forEach((match, index) => {
    const favBtn = document.querySelector(`#match-${index}`);
    favBtn.addEventListener("click", () => {
      scheduleIDB.saveSchedule(match);
      M.toast({
        html: `${match.homeTeam.name} vs ${match.awayTeam.name} schedule is succesfully added to your Favorites!`,
      });
      showNotification(
        "You just added a new match schedule!",
        `${match.homeTeam.name} vs ${match.awayTeam.name} schedule is added to your Favorites!`,
        "match"
      );
    });
  });
};

export default getAllMatches;
