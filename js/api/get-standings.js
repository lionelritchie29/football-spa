import API from "./main.js";
import toJson from "../utils/to-json.js";
import replaceUrl from "../utils/replace-url.js";

const standingsUrl = "competitions/2014/standings";

const getAllStandings = () => {
  //check if the data already in cache
  caches.match(`${API.BASE_URL}/${standingsUrl}`).then((res) => {
    if (res) {
      console.log("fetching standings from cache");
      toJson(res).then((data) => {
        addToHtml(data.standings[0].table);
      });
    } else {
      console.log("fetching standings from api");
      fetchFromApi();
    }
  });
};

const fetchFromApi = () => {
  fetch(`${API.BASE_URL}/${standingsUrl}`, API.OPTIONS)
    .then((res) => toJson(res))
    .then((resJson) => addToHtml(resJson.standings[0].table));
};

const addToHtml = (standings) => {
  let standingsHTML = "";
  standings.forEach((standing) => {
    standingsHTML += `
        <tr>
            <td>${standing.position}</td>
            <td>
            <img
                src="${replaceUrl(standing.team.crestUrl)}"
                class="responsive-img standing-team-img"
                alt="logo"
            />
            </td>
            <td>${standing.team.name}</td>
            <td>${standing.playedGames}</td>
            <td>${standing.won}</td>
            <td>${standing.draw}</td>
            <td>${standing.lost}</td>
            <td>${standing.points}</td>
        </tr>
    `;
  });

  document.getElementById("standings").innerHTML = standingsHTML;
};

export default getAllStandings;
