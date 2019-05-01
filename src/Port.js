import { PORT_DIAMETER, PORT_RADIUS, PORT_HOLIZONTAL_MARGIN } from "./constants";

class Port {
  constructor(parent, portType, index, numPorts, argType) {
    this.patcher = parent.patcher;
    this.eventEmitter = parent.patcher.eventEmitter;
    this.parent = parent;
    this.portType = portType; // IN/OUT
    this.portIndex = index;
    this.numPorts = numPorts;
    this.argType = argType || "";
  }

  render(svg) {
    let x, y;
    const clipRect = svg.rect(PORT_DIAMETER, PORT_DIAMETER);
    if (this.portIndex === 0) {
      // most left port
      x = this.parent.x + PORT_HOLIZONTAL_MARGIN;
    } else if (this.portIndex === this.numPorts - 1) {
      // most right port
      x =
        this.parent.x +
        ((this.parent.w - PORT_HOLIZONTAL_MARGIN - PORT_DIAMETER) * this.portIndex) / (this.numPorts - 1);
    } else {
      // other ports
      x =
        this.parent.x +
        ((this.portIndex + 1) * (this.parent.w - PORT_HOLIZONTAL_MARGIN * 2 - PORT_RADIUS * 2)) / this.numPorts;
    }

    if (this.portType === "IN") {
      y = this.parent.y;
      clipRect.move(x, y);
    } else {
      y = this.parent.y + this.parent.h;
      clipRect.move(x, y - PORT_DIAMETER);
    }
    this.x = x + PORT_RADIUS;
    this.y = y;

    const clipPath = svg.clip().add(clipRect);
    const port = svg
      .circle(PORT_DIAMETER)
      .fill("gray")
      .move(x, y - PORT_RADIUS);
    port.clipWith(clipPath);

    port.on("mouseover", () => this.eventEmitter.emit("mouseover", this.inspect()));
  }

  inspect() {
    const { portType, portIndex, numPorts, argType } = this;
    return {
      type: "Port",
      portType,
      index: portIndex,
      numPorts,
      argType,
    };
  }
}

export default Port;
