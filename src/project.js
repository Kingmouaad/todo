export class project {
  constructor(name, color) {
    this.name = name;
    this.color = color;
  }
  createdom = () => {
    const layout = document.createElement("div");
    const circle = document.createElement("div");
    const name = document.createElement("div");
    const numberoftask = document.createElement("div");
    layout.classList.add("project");
    name.setAttribute("style", "color:white;font-size:22px;");
    name.textContent = `${this.name}`;
    circle.setAttribute(
      "style",
      `background-color:${this.color};border-radius:50%;width:20px;height:20px;`
    );
    numberoftask.setAttribute("id", "numberoftask");
    layout.appendChild(circle);
    layout.appendChild(name);
    layout.appendChild(numberoftask);
    return layout;
  };
}
