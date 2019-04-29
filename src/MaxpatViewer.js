import SVG from "svg.js";
import Patcher from "./Patcher";

class MaxpatViewer {
  constructor() {
    this.rootElem = null;
    this.svg = null;
    this.patcher = null;
  }

  load(fileName, data) {
    console.log(data);
    this.patcher = new Patcher(data.patcher);
  }

  render(elem) {
    if (this.rootElem == null && elem != null) {
      this.rootElem = elem;
    }

    this.svg = SVG(this.rootElem).size(640 * 2, 480 * 3);
    this.patcher.render(this.svg);
  }
}

export default MaxpatViewer;
