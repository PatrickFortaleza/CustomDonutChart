const circleRadius = 200;
const pi = 3.14159265359;
let svg;
let container;

let values = {
  default: {
    percentage: 100,
    color: "#333333",
  },
  pleasure: {
    percentage: 25,
    color: "#33658A",
  },
  work: {
    percentage: 12.5,
    color: "#55DDE0",
  },
  pancakes: {
    percentage: 25,
    color: "#F26419",
  },
};

class Circle {
  constructor(radius, percentage) {
    this.radius = radius;
    this.circumference = (2 * pi * this.radius) / 2;
    this.sRadius = this.radius * 0.375;
    this.p = percentage;
    this.id = crypto.randomUUID();

    this.shape = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );

    this.shape.setAttribute("stroke-width", this.radius * 0.05);
    this.shape.setAttribute("class", "donut");
    this.shape.setAttribute("fill", "none");
    this.shape.setAttribute("cx", this.radius / 2);
    this.shape.setAttribute("cy", this.radius / 2);
    this.shape.setAttribute("r", this.sRadius);

    // set initial dasharray
    this.shape.style.strokeDasharray = `${this.circumference}, ${this.circumference}`;
  }

  get svg() {
    return this.shape;
  }

  setStroke(value) {
    this.shape.setAttribute("stroke", value);
  }

  setTransform(value) {
    this.shape.style.transform = `rotateZ(${value}deg)`;
  }

  setDashArray() {
    this.shape.style.strokeDasharray = `${
      (2 * pi * this.sRadius * this.p) / 100
    } ${2 * pi * this.sRadius * (1 - this.p / 100)}`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  container = document.querySelector("#donut");

  container.style.width = `${circleRadius}px`;
  container.style.height = `${circleRadius}px`;

  drawChart(container);
});

function drawChart(container) {
  if (svg) svg.remove();

  svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  let circles = createCircles(values);

  circles.forEach((circle) => svg.appendChild(circle.svg));
  container.appendChild(svg);

  setTimeout(() => circles.forEach((circle) => circle.setDashArray()), 1000);

  let inputs = document.querySelectorAll(".chart-input");

  inputs.forEach((input) =>
    input.addEventListener("change", (e) =>
      updateValues(e.target.id, e.target.value)
    )
  );
}

function updateValues(key, value) {
  let newValues = { ...values };
  newValues[key].percentage = +value;

  values = newValues;

  drawChart(container);
}

function createCircles(values) {
  let v = Object.values(values);

  let circles = v.map((value, index) => {
    let circle = new Circle(circleRadius, value.percentage);

    let transformValue = 0;
    for (let i = 0; i < index; i++) {
      transformValue = transformValue + (v[i].percentage * 360) / 100;
    }
    transformValue = transformValue - 90;

    circle.setStroke(value.color);
    circle.setTransform(transformValue);

    return circle;
  });

  return circles;
}
