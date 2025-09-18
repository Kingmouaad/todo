import "./todo.css";
import { Task } from "./task.js";
import { project, project } from "./project.js";

Task;
project;

const fileicon = document.querySelector("#addproject");
const addproject = document.querySelector("#mdd");
const cancelproject = document.querySelector("#addproject");
const projectmenu = document.querySelector("#seconddiv");
// fileicon.addEventListener("submit",()=>{
//     const project =new Task()
// })
addproject.addEventListener("submit", (e) => {
  e.preventDefault();
  const projectt = new project();
  const element = projectt.createdom();
  projectmenu.appendChild();
});
