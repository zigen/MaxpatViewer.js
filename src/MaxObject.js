import { MAX_OBJECT_PADDING } from "./constants";
import Port from "./Port";

class MaxObject {
  constructor(patcher, objData) {
    const data = objData.box;
    this.id = data.id;
    this.maxClass = data.maxclass;
    this.numInlets = data.numinlets;
    this.numOutlets = data.numoutlets;
    this.text = data.text || null;
    const [x, y, w, h] = data.patching_rect;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.patcher = patcher;
    this.eventEmitter = patcher.eventEmitter;

    this.inlets = Array.from(new Array(this.numInlets)).map((_, i) => new Port(this, "IN", i, this.numInlets, ""));
    this.outlets = (data.outlettype || []).map((t, i) => new Port(this, "OUT", i, this.numOutlets, t));

    // for renderer
    this.elem = null;
  }

  getInlet(index) {
    if (this.inlets.length <= index) {
      throw new Error(`Wrong inlet index ${index} for ${this.id} ${this.maxClass}`);
    }
    return this.inlets[index];
  }
  getOutlet(index) {
    if (this.outlets.length <= index) {
      throw new Error(`Wrong outlet index ${index} for ${this.id} ${this.maxClass}`);
    }
    return this.outlets[index];
  }

  render(svg) {
    const { x, y, w, h } = this;
    this.elem = svg.rect(w, h).attr({ stroke: "black", fill: "white", x, y });
    if (this.text != null) {
      svg
        .text(this.text)
        .font({ size: 12 })
        .move(x + MAX_OBJECT_PADDING, y + MAX_OBJECT_PADDING * 1.5);
    }

    this.inlets.map((inlet) => inlet.render(svg));
    this.outlets.map((outlet) => outlet.render(svg));

    this.elem.on("mouseover", (e) => this.eventEmitter.emit("mouseover", this.inspect()));
  }

  inspect() {
    const { x, y, w, h, text, maxClass, id } = this;
    return {
      type: "MaxObject",
      maxClass,
      id,
      text,
      rect: { x, y, w, h },
    };
  }
}

export default MaxObject;
