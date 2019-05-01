import { MAX_OBJECT_PADDING } from "../constants";

const render = (obj, svg) => {
  const { x, y, w, h } = obj;
  obj.elem = svg.rect(w, h).attr({ stroke: "black", fill: "white", x, y });
  if (obj.text != null) {
    svg
      .text(obj.text)
      .font({ size: 12 })
      .move(x + MAX_OBJECT_PADDING, y + MAX_OBJECT_PADDING * 1.5);
  }
};

export default render;
