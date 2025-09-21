export class Task {
  constructor(taskname, note, date, priority, description) {
    this.taskname = taskname;
    this.note = note;
    this.date = date;
    this.priority = priority;
    this.description = description;
  }

  createdom = () => {
    const layout = document.createElement("div");
    layout.setAttribute(
      "style",
      "display: flex;flex-direction: column;gap:10px;width:90%;background-color:#374151;"
    );
    const checkbox = document.createElement("label");
    checkbox.classList.add("containerr");
    const input = document.createElement("input");
    input.setAttribute("checked", "checked");
    input.setAttribute("type", "checkbox");
    const withinput = document.createElement("div");
    withinput.classList.add("checkmark");

    checkbox.appendChild(input);
    checkbox.appendChild(withinput);

    const divcontent = document.createElement("div");
    const div1 = document.createElement("div");
    const div2 = document.createElement("div");
    const div3 = document.createElement("div");
    divcontent.setAttribute(
      "style",
      "display: flex;flex-direction: column;gap:10px;width:70%;"
    );

    div1.setAttribute("style", "font-size:25px;color:white;");
    div1.textContent = this.taskname;
    div2.setAttribute("style", "font-size:20px;color:white;");
    div2.textContent = this.note;
    div3.setAttribute(
      "style",
      "font-size:18px;color:white;border-radius:10px;padding:5px;"
    );
    if (this.priority == "low priority") {
      div3.style["background-color"] = "red";
      div3.textContent = `🏴 ${this.priority}`;
    } else if (this.priority == "medium priority") {
      div3.style["background-color"] = "orange";
      div3.textContent = `🏴 ${this.priority}`;
    } else if (this.priority == "high priority") {
      div3.style["background-color"] = "green";
      div3.textContent = `🏴 ${this.priority}`;
    }
    divcontent.appendChild(div1);
    divcontent.appendChild(div2);
    divcontent.appendChild(div3);
    const show = document.querySelector("div");
    show.textContent = "›";
    const deletee = document.querySelector("div");
    deletee.setAttribute("style", "margin-left:auto;");
    deletee.textContent = "🗑️";
    const fordate = document.createElement("div");
    fordate.setAttribute(
      "style",
      "color:white;font-size:18px;display: flex;flex-direction: column "
    );
    const contbutton = document.createElement("div");
    contbutton.setAttribute("style", "display: flex;flex-direction: row");
    contbutton.appendChild(show);
    contbutton.appendChild(deletee);
    fordate.appendChild(contbutton);
    const date = document.querySelector("div");
    date.textContent = this.date;
    date.setAttribute("style", "margin-top:auto;");
    fordate.appendChild(date);
    layout.appendChild(checkbox);
    layout.appendChild(divcontent);
    layout.appendChild(fordate);

    return layout;
  };
}
