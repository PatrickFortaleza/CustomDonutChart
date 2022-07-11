const circleRadius = 200;
const pi = 3.14159265359;
const values = [
  {
    percentage: 25,
    label: "Percentage 1",
    color: "#33658A",
  },
  {
    percentage: 12.5,
    label: "Percentage 1",
    color: "#F6AE2D",
  },
  {
    percentage: 12.5,
    label: "Percentage 1",
    color: "#55DDE0",
  },
  {
    percentage: 25,
    label: "Percentage 1",
    color: "#F26419",
  },
  {
    percentage: 25,
    label: "Percentage 1",
    color: "#FF1B1C",
  },
];

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
  let container = document.querySelector("#donut");
  let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

  container.style.width = `${circleRadius}px`;
  container.style.height = `${circleRadius}px`;

  let circles = createCircles(values);

  circles.forEach((circle) => svg.appendChild(circle.svg));
  container.appendChild(svg);

  setTimeout(() => circles.forEach((circle) => circle.setDashArray()), 1000);
});

function createCircles(values) {
  let circles = values.map((value, index) => {
    let circle = new Circle(circleRadius, value.percentage);

    let transformValue = 0;
    for (let i = 0; i < index; i++) {
      transformValue = transformValue + (values[i].percentage * 360) / 100;
    }
    transformValue = transformValue - 90;

    circle.setStroke(value.color);
    circle.setTransform(transformValue);

    return circle;
  });

  return circles;
}
