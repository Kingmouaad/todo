import "./todo.css";
import { Task } from "./task.js";
import { project } from "./project.js";

const fileicon = document.querySelector("#add-project");
const addproject = document.querySelector("#mdd");
const cancelproject = document.querySelector("#cancel");
const projectmenu = document.querySelector("#seconddiv");
const formproject = document.querySelector("#form");
const formcontainer = document.querySelector("#thirddiv");

const formtask = document.querySelector("#formtask");
const canceltask = document.querySelector("button#add3");
const buttonaddtask = document.querySelector("button#add4");
const addtask = document.querySelector("button#add2");
const containerform = document.querySelector("#containerform");
const dark = document.querySelector(".overlay");
const searchInput = document.querySelector("#searchtask");

// Global variable to track current project
let currentProject = null;

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
    if (node) {
      // attach project id for later task lookups
      node.dataset.projectId = key;
      projectmenu.appendChild(node);
      // Add event listener to the newly loaded project
      addProjectClickListener(node);
    }
  }
};

// Function to add click listener to project elements
const addProjectClickListener = (projectElement) => {
  projectElement.addEventListener("click", (e) => {
    // Remove active class from all projects
    document
      .querySelectorAll(".project")
      .forEach((p) => p.classList.remove("active"));

    const taskcontainer = document.querySelector(".fourth");

    // Add active class to clicked project
    projectElement.classList.add("active");

    // Clear current task list
    while (taskcontainer.firstChild) {
      taskcontainer.removeChild(taskcontainer.firstChild);
    }

    // Load tasks for this project from localStorage
    const projectId = projectElement.dataset.projectId;
    if (projectId) {
      const stored = JSON.parse(
        localStorage.getItem(`tasks:${projectId}`) || "[]"
      );
      stored.forEach((t) => {
        const task = new Task(
          t.taskname,
          t.note,
          t.date,
          t.priority,
          t.description
        );
        const el = task.createdom();
        el.dataset.taskName = t.taskname || "";
        taskcontainer.appendChild(el);
      });
    }

    const name = e.target.children;
    const changename = document.querySelector("#changename");
    const numberoftask = document.querySelector("#help").lastElementChild;

    changename.textContent = name[1].textContent;
    numberoftask.textContent = taskcontainer.children.length;

    // Store reference to current project
    currentProject = projectElement;
  });
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

  // Add event listener to new project
  addProjectClickListener(element);

  // Persist a project id for task grouping
  element.dataset.projectId = `${i}`;
  projectmenu.appendChild(element);
  localStorage.setItem(`${i}`, JSON.stringify(element.outerHTML));
  formcontainer.style.display = "none";

  // Clear the form
  document.querySelector("#project").value = "";
  document.querySelector("#color").value = "#000000";
});

cancelproject.addEventListener("click", () => {
  formcontainer.style.display = "none";
});

// Single event listener for ADD TASK button - moved outside of project clicks
buttonaddtask.addEventListener("click", () => {
  if (!currentProject) {
    alert("Please select a project first!");
    return;
  }
  containerform.style.display = "block";
  dark.style.display = "block";
});

// Single event listener for form submission - separate from button clicks
formtask.addEventListener("submit", (e) => {
  e.preventDefault();
  e.stopPropagation();

  if (!currentProject) {
    alert("No project selected!");
    return;
  }

  const taskName = document.querySelector("#taskname").value;
  const taskDescription = document.querySelector("#description").value;
  const taskDate = document.querySelector("#dateform").value;
  const taskPriority = document.querySelector("#priority").value;
  const taskNote = document.querySelector("#note").value;

  // Validate required fields
  if (!taskName.trim()) {
    alert("Task name is required!");
    return;
  }

  const newTask = new Task(
    taskName,
    taskNote,
    taskDate,
    taskPriority,
    taskDescription
  );

  const taskcontainer = document.querySelector(".fourth");
  const taskElement = newTask.createdom();
  taskElement.dataset.taskName = taskName;
  taskcontainer.appendChild(taskElement);

  // Persist task under current project id
  const projectIdForTask = currentProject?.dataset?.projectId;
  if (projectIdForTask) {
    const key = `tasks:${projectIdForTask}`;
    const existing = JSON.parse(localStorage.getItem(key) || "[]");
    existing.push({
      taskname: taskName,
      note: taskNote,
      date: taskDate,
      priority: taskPriority,
      description: taskDescription,
    });
    localStorage.setItem(key, JSON.stringify(existing));
  }

  // Update task count for current project
  const numberoftask = document.querySelector("#help").lastElementChild;
  numberoftask.textContent = taskcontainer.children.length;

  // Hide form and reset
  containerform.style.display = "none";
  dark.style.display = "none";
  formtask.reset();
});

// Cancel task button
canceltask.addEventListener("click", () => {
  containerform.style.display = "none";
  dark.style.display = "none";
  formtask.reset();
});

// Close form when clicking overlay
dark.addEventListener("click", () => {
  containerform.style.display = "none";
  dark.style.display = "none";
  formcontainer.style.display = "none";
  formtask.reset();
});

const eventt = new Event("click");
projectmenu.firstElementChild.dispatchEvent(eventt);
