export class Task {
  constructor(taskname, note, date, priority, description) {
    this.taskname = taskname;
    this.note = note;
    this.date = date;
    this.priority = priority;
    this.description = description;
  }

  createdom = () => {
    // Main container for the task
    const layout = document.createElement("div");
    layout.setAttribute(
      "style",
      "display: flex;flex-direction: column;gap:10px;width:90%;background-color:#374151;padding:15px;border-radius:10px;margin-bottom:10px;"
    );

    // Top row container
    const topRow = document.createElement("div");
    topRow.setAttribute(
      "style",
      "display: flex;align-items: flex-start;gap: 15px;"
    );

    // Checkbox container - CREATE NEW ELEMENTS instead of selecting existing ones
    const checkbox = document.createElement("label");
    checkbox.classList.add("containerr");
    const input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    const checkmark = document.createElement("div");
    checkmark.classList.add("checkmark");

    checkbox.appendChild(input);
    checkbox.appendChild(checkmark);

    // Content container
    const contentContainer = document.createElement("div");
    contentContainer.setAttribute(
      "style",
      "display: flex;flex-direction: column;gap:8px;flex-grow:1;"
    );

    // Task name
    const taskNameDiv = document.createElement("div");
    taskNameDiv.setAttribute(
      "style",
      "font-size:25px;color:white;font-weight:bold;"
    );
    taskNameDiv.textContent = this.taskname;

    // Task note (only show if not empty)
    const noteDiv = document.createElement("div");
    if (this.note && this.note.trim()) {
      noteDiv.setAttribute("style", "font-size:18px;color:#d1d5db;");
      noteDiv.textContent = this.note;
    }

    // Priority badge
    const priorityDiv = document.createElement("div");
    priorityDiv.setAttribute(
      "style",
      "font-size:16px;color:white;border-radius:20px;padding:6px 12px;width:fit-content;font-weight:500;"
    );

    // Set priority colors correctly
    if (this.priority === "low") {
      priorityDiv.style.backgroundColor = "#dc2626"; // red
      priorityDiv.textContent = `🔴 Low Priority`;
    } else if (this.priority === "medium") {
      priorityDiv.style.backgroundColor = "#f59e0b"; // orange
      priorityDiv.textContent = `🟡 Medium Priority`;
    } else if (this.priority === "high") {
      priorityDiv.style.backgroundColor = "#16a34a"; // green
      priorityDiv.textContent = `🟢 High Priority`;
    }

    // Add elements to content container
    contentContainer.appendChild(taskNameDiv);
    if (this.note && this.note.trim()) {
      contentContainer.appendChild(noteDiv);
    }
    contentContainer.appendChild(priorityDiv);

    // Right side container for actions and date
    const rightContainer = document.createElement("div");
    rightContainer.setAttribute(
      "style",
      "display: flex;flex-direction: column;align-items: flex-end;gap: 10px;min-width: 100px;"
    );

    // Action buttons container
    const actionContainer = document.createElement("div");
    actionContainer.setAttribute("style", "display: flex;gap: 10px;");

    // Show/expand button - CREATE NEW ELEMENT
    const showButton = document.createElement("div");
    showButton.setAttribute(
      "style",
      "cursor: pointer;font-size: 20px;color: #9ca3af;hover:color: white;"
    );
    showButton.textContent = "›";
    showButton.title = "Show details";

    // Delete button - CREATE NEW ELEMENT
    const deleteButton = document.createElement("div");
    deleteButton.setAttribute(
      "style",
      "cursor: pointer;font-size: 18px;hover:transform: scale(1.1);transition: transform 0.2s;"
    );
    deleteButton.textContent = "🗑️";
    deleteButton.title = "Delete task";

    // Add delete functionality
    deleteButton.addEventListener("click", (e) => {
      e.stopPropagation();

      layout.remove();
      // Update task count
      const taskcontainer = document.querySelector(".fourth");
      const numberoftask = document.querySelector("#help").lastElementChild;
      if (numberoftask) {
        numberoftask.textContent = taskcontainer.children.length;
      }
    });

    actionContainer.appendChild(showButton);
    actionContainer.appendChild(deleteButton);

    // Date display - CREATE NEW ELEMENT
    const dateDiv = document.createElement("div");
    if (this.date) {
      dateDiv.setAttribute(
        "style",
        "color:#9ca3af;font-size:14px;text-align:right;"
      );
      // Format date nicely
      const dateObj = new Date(this.date);
      const formattedDate = dateObj.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      dateDiv.textContent = formattedDate;
    }

    // Assemble right container
    rightContainer.appendChild(actionContainer);
    if (this.date) {
      rightContainer.appendChild(dateDiv);
    }

    // Assemble top row
    topRow.appendChild(checkbox);
    topRow.appendChild(contentContainer);
    topRow.appendChild(rightContainer);

    // Description section (expandable)
    if (this.description && this.description.trim()) {
      const descriptionContainer = document.createElement("div");
      descriptionContainer.setAttribute(
        "style",
        "margin-top: 10px;padding-top: 10px;border-top: 1px solid #4b5563;display: none;"
      );

      const descriptionLabel = document.createElement("div");
      descriptionLabel.setAttribute(
        "style",
        "color: #9ca3af;font-size: 14px;margin-bottom: 5px;"
      );
      descriptionLabel.textContent = "Description:";

      const descriptionText = document.createElement("div");
      descriptionText.setAttribute(
        "style",
        "color: white;font-size: 16px;line-height: 1.4;"
      );
      descriptionText.textContent = this.description;

      descriptionContainer.appendChild(descriptionLabel);
      descriptionContainer.appendChild(descriptionText);

      // Add show/hide functionality
      showButton.addEventListener("click", () => {
        const isVisible = descriptionContainer.style.display !== "none";
        descriptionContainer.style.display = isVisible ? "none" : "block";
        showButton.textContent = isVisible ? "›" : "⌄";
      });

      layout.appendChild(topRow);
      layout.appendChild(descriptionContainer);
    } else {
      layout.appendChild(topRow);
      // If no description, make the show button do nothing or hide it
      showButton.style.opacity = "0.3";
      showButton.style.cursor = "default";
    }

    // Add completed task styling
    input.addEventListener("change", () => {
      if (input.checked) {
        layout.style.opacity = "0.6";
        taskNameDiv.style.textDecoration = "line-through";
      } else {
        layout.style.opacity = "1";
        taskNameDiv.style.textDecoration = "none";
      }
    });

    return layout;
  };
}
