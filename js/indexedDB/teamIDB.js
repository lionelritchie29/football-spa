import IDB from "./main.js";

const saveTeam = (team) => {
  IDB.then((db) => {
    const tx = db.transaction("teams", "readwrite");
    const store = tx.objectStore("teams");
    store.put(team);
    return tx.complete;
  }).then(console.log("Team berhasil disimpan"));
};

const getSavedTeam = () => {
  IDB.then((db) => {
    const tx = db.transaction("teams", "readonly");
    const store = tx.objectStore("teams");
    return store.getAll();
  }).then((teams) => addToHtml(teams));
};

const addToHtml = (teams) => {
  let teamsHTML = "";
  teams.forEach((team, index) => {
    teamsHTML += `
        <div class="col s12 m6 l4 xl3">
          <div class="card">
            <div class="card-image">
              <img src="${team.crestUrl}" class="responsive-img team-img" alt="${team.name}" title="${team.name}"/>
            </div>
            <div class="card-content">
              <p class="center team-title truncate" title="${team.name}">
                ${team.name}
              </p>
            </div>
            <div class="card-reveal">
              <span class="card-title grey-text text-darken-4">Card Title<i class="material-icons right">close</i></span>
              <p>Here is some more information about this product that is only revealed once clicked on.</p>
            </div>
            <div class="card-action">
              <a href="#favorite" id="saved-team-${index}">Remove</a>
            </div>
          </div>
        </div>
          `;
  });

  document.getElementById("saved-teams").innerHTML = teamsHTML;

  teams.forEach((team, index) => {
    const removeBtn = document.querySelector(`#saved-team-${index}`);
    removeBtn.addEventListener("click", () => {
      removeSavedTeam(team.id);
      M.toast({ html: `${team.name} Team is succesfully Deleted!` });
      getSavedTeam();
    });
  });
};

const removeSavedTeam = (id) => {
  IDB.then((db) => {
    const tx = db.transaction("teams", "readwrite");
    const store = tx.objectStore("teams");
    return store.delete(id);
  }).then(() => console.log("Success Delete Team"));
};

export default { saveTeam, getSavedTeam };
