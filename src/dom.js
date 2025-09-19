import "./todo.css";
import { Task } from "./task.js";
import { project } from "./project.js";

const fileicon = document.querySelector("#add-project");
const addproject = document.querySelector("#mdd");
const cancelproject = document.querySelector("#addproject");
const projectmenu = document.querySelector("#seconddiv");
const formproject = document.querySelector("#form");
const formcontainer = document.querySelector("#thirddiv");
fileicon.addEventListener("click", () => {
  formcontainer.style.display = "block";
});
cancelproject.addEventListener("click", () => {
  formcontainer.style.display = "none";
});
formproject.addEventListener("submit", (e) => {
  e.preventDefault();
  const projectt = new project();
  const element = projectt.createdom();
  projectmenu.appendChild(element);
});
