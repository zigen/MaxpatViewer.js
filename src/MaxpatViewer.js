import SVG from "svg.js";
import EventEmitter from "eventemitter3";
import Patcher from "./Patcher";

class MaxpatViewer extends EventEmitter {
  constructor() {
    super();
    this.rootElem = null;
    this.svg = null;
    this.patcher = null;
    this.on("mouseover", (e) => {
      if (this.inspectorElem) {
        this.inspectorElem.textContent = JSON.stringify(e, null, 2);
      }
    });
  }

  load(fileName, data) {
    console.log(data);
    this.patcher = new Patcher(this, data.patcher);
  }

  render(elem) {
    if (this.rootElem == null && elem != null) {
      this.rootElem = elem;
    }

    this.inspectorElem = document.createElement("PRE");
    this.inspectorElem.className = "inspector-container";
    this.rootElem.appendChild(this.inspectorElem);
    this.inspectorElem.textContent = "{}";
    this.svg = SVG(this.rootElem).size(640 * 2, 480 * 3);
    this.patcher.render(this.svg);
  }
}

export default MaxpatViewer;
