import "./todo.css";
import { Task } from "./task.js";
import { project } from "./project.js";

const fileicon = document.querySelector("#add-project");
const addproject = document.querySelector("#mdd");
const cancelproject = document.querySelector("#cancel");
const projectmenu = document.querySelector("#seconddiv");
const formproject = document.querySelector("#form");
const formcontainer = document.querySelector("#thirddiv");

fileicon.addEventListener("click", () => {
  formcontainer.style.display = "block";
});
const loadSavedProjects = () => {
  if (!projectmenu) return;
  const keys = Object.keys(localStorage).filter((key) => {
    if (key.length < 4) {
      return true;
    }
  });
  // sort by numeric suffix
  keys.sort((a, b) => {
    const na = parseInt(a);
    const nb = parseInt(b);
    return na - nb;
  });
  for (const key of keys) {
    const html = localStorage.getItem(key);
    if (!html) continue;
    const tpl = document.createElement("template");

    tpl.innerHTML = JSON.parse(html);
    const node = tpl.content.firstElementChild;
    if (node) projectmenu.appendChild(node);
  }
};
loadSavedProjects();
let i = 0;
addproject.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  if (localStorage) {
    i = localStorage.getItem("counter");
  }
  i++;

  localStorage.setItem("counter", `${i}`);

  const projectname = document.querySelector("#project").value;
  const projectcolor = document.querySelector("#color").value;
  const projectt = new project(projectname, projectcolor);
  const element = projectt.createdom();
  projectmenu.appendChild(element);
  localStorage.setItem(`${i}`, JSON.stringify(element.outerHTML));
  formcontainer.style.display = "none";
});
cancelproject.addEventListener("click", () => {
  formcontainer.style.display = "none";
});

// task part

const allproject = Array.from(document.querySelector("#seconddiv").children);
const changename = document.querySelector("#changename");
const numberoftask = document.querySelector("#help").lastElementChild;
allproject.forEach((project) => {
  project.addEventListener("click", (e) => {
    const name = e.target.children;
    changename.textContent = name[1].textContent;
    numberoftask.textContent=

  });
});

const addtask = document.querySelector("button#add2");
const containerform = document.querySelector("#containerform");
const dark = document.querySelector(".overlay");
addtask.addEventListener("click", () => {
  containerform.style.display = "block";
  dark.style.display = "block";
});

const taskname = document.querySelector("#taskname").value;
const description = document.querySelector("#description").value;
const date = document.querySelector("#dateform").value;
const priority = document.querySelector("#priority").value;
const note = document.querySelector("#note").value;
const formtask = document.querySelector("#formtask");
const canceltask = document.querySelector("button#add3");
