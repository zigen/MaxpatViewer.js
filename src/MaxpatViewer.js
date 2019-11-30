import EventEmitter from "eventemitter3";
import Patcher from "./Patcher";

class MaxpatViewer extends EventEmitter {
  constructor(SVGJS, document) {
    super();
    if (document) {
      this.document = document;
    } else if (!document && global.document) {
      this.document = global.document;
    }
    this.SVGJS = SVGJS;
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
    this.patcher = new Patcher(this, data.patcher);
  }

  render(elem) {
    if (this.rootElem == null && elem != null) {
      this.rootElem = elem;
    }

    this.inspectorElem = this.document.createElement("PRE");
    this.inspectorElem.className = "inspector-container";
    this.rootElem.appendChild(this.inspectorElem);
    this.inspectorElem.textContent = "{}";
    this.svg = this.SVGJS(this.rootElem).size(640 * 2, 480 * 3);
    this.patcher.render(this.svg);
  }
}

export default MaxpatViewer;
