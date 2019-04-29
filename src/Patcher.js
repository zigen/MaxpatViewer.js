import MaxObject from "./MaxObject";
import Line from "./Line";
class Patcher {
  constructor(patchData) {
    this.objs = patchData.boxes.map((b) => new MaxObject(this, b));
    this.lines = patchData.lines.map((l) => new Line(this, l));
  }

  getObject(id) {
    return this.objs.find((o) => o.id === id);
  }

  render(svg) {
    this.objs.map((o) => o.render(svg));
    this.lines.map((l) => l.render(svg));
  }
}

export default Patcher;
