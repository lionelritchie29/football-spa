const navListUrl = "../../nav.html";
import toText from "../utils/to-text.js";
import loadPage from "./load-page.js";

const loadNav = () => {
  //init sidebar
  const elems = document.querySelectorAll(".sidenav");
  M.Sidenav.init(elems);

  //add nav list to element inner html
  fetch(navListUrl)
    .then((res) => toText(res))
    .then((resText) => {
      addNavListToElement(resText);
      addEventListenerToNavList();
    });
};

const addNavListToElement = (navList) => {
  const elementList = document.querySelectorAll(
    ".topnav, .sidenav, .footer-top"
  );
  elementList.forEach((elm) => (elm.innerHTML = navList));
};

const addEventListenerToNavList = () => {
  document
    .querySelectorAll(".topnav a, .sidenav a, .footer-top a, .nav-link")
    .forEach((elm) => {
      elm.addEventListener("click", (event) => {
        // close sidenav
        var sidenav = document.querySelector(".sidenav");
        M.Sidenav.getInstance(sidenav).close();

        // load page
        const page = event.target.getAttribute("href").substr(1);
        window.scrollTo(0, 0);
        loadPage(page);
      });
    });
};

export default loadNav;
