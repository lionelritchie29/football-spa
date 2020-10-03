import "../vendor/idb.js";

const IDB = idb.open("football-spa", 1, (ugpradeDb) => {
  ugpradeDb.createObjectStore("schedule", {
    keyPath: "id",
  });

  ugpradeDb.createObjectStore("teams", {
    keyPath: "id",
  });
});

export default IDB;
