import IDB from "./main.js";

const saveSchedule = (schedule) => {
  IDB.then((db) => {
    const tx = db.transaction("schedule", "readwrite");
    const store = tx.objectStore("schedule");
    store.put(schedule);
    return tx.complete;
  }).then(console.log("Schedule berhasil disimpan"));
};

const getSavedSchedule = () => {
  IDB.then((db) => {
    const tx = db.transaction("schedule", "readonly");
    const store = tx.objectStore("schedule");
    return store.getAll();
  }).then((schedules) => addToHtml(schedules));
};

const addToHtml = (schedules) => {
  let schedulesHTML = "";
  schedules.forEach((schedule, index) => {
    schedulesHTML += `
        <div class="col s12">
          <div class="card bg-surface">
            <span class="badge scheduled-badge">
              Scheduled
            </span>
            <div class="card-content">
              <div class="center match-time">
                ${new Date(schedule.utcDate)}
              </div>
              <div class="center match-info">
                <div>
                  <p>Home</p>
                  <div>
                    <img src="../assets/images/home.svg" alt="home" />
                  </div>
                  <p>${schedule.homeTeam.name}</p>
                </div>
                <div class="valign-wrapper">
                  VS
                </div>
                <div>
                  <p>Away</p>
                  <div>
                    <img src="../assets/images/away.svg" alt="away" />
                  </div>
                  <p>${schedule.awayTeam.name}</p>
                </div>
              </div>
            </div>
            <div class="card-action">
              <a href="#favorite" class="nav-link" id="saved-schedule-${index}" class="text-secondary">Remove</a>
            </div>
          </div>
        </div>
        `;
  });

  document.getElementById("saved-schedule").innerHTML = schedulesHTML;

  schedules.forEach((schedule, index) => {
    const removeBtn = document.querySelector(`#saved-schedule-${index}`);
    removeBtn.addEventListener("click", () => {
      removeSavedSchedule(schedule.id);
      M.toast({ html: "Schedule succesfully removed!" });
      getSavedSchedule();
    });
  });
};

const removeSavedSchedule = (id) => {
  IDB.then((db) => {
    const tx = db.transaction("schedule", "readwrite");
    const store = tx.objectStore("schedule");
    return store.delete(id);
  }).then(() => console.log("Success Delete"));
};

export default { saveSchedule, getSavedSchedule };
