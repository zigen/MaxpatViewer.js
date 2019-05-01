import { MAX_OBJECT_FILL_COLOR, MAX_OBJECT_PADDING } from "../constants";

const render = (obj, svg) => {
  const { x, y, w, h } = obj;
  obj.elem = svg.rect(w, h).attr({ stroke: "transparent", fill: MAX_OBJECT_FILL_COLOR, x, y });
  if (obj.text != null) {
    svg
      .text(obj.text)
      .font({ size: 12 })
      .move(x + MAX_OBJECT_PADDING, y + MAX_OBJECT_PADDING * 1.5);
  }
};

export default render;
