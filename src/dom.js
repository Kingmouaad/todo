import "./todo.css";
import { Task } from "./task.js";
import { project } from "./project.js";

Task;
project;

const fileicon = document.querySelector("#addproject");
const addproject = document.querySelector("#mdd");
const cancelproject = document.querySelector("#addproject");
// fileicon.addEventListener("submit",()=>{
//     const project =new Task()

// })
fileicon.addEventListener("submit", () => {
  const project = new Task();
});
