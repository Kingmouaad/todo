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
let i;
if (localStorage) {
  for (let j = 0; j <= i; j++) {
    projectmenu.appendChild(JSON.parse(localStorage.getItem(`${j}`)));
  }
}
addproject.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  i++;

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
