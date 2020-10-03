import loadPage from "./load-page.js";
import getTeamById from "../api/get-team.js";

const loadTeamDetailPage = () => {
  const urlParams = new URLSearchParams(
    window.location.hash.substr(window.location.hash.indexOf("?"))
  );
  const id = urlParams.get("id");

  if (id === null) loadPage("home");
  else {
    loadPage("team-detail");
    getTeamById(id);
  }
};

export default loadTeamDetailPage;
