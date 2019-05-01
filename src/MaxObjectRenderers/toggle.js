import { MAX_OBJECT_FILL_COLOR } from "../constants";

const render = (obj, svg) => {
  const { x, y, w, h } = obj;
  obj.elem = svg.rect(w, h).attr({ stroke: "transparent", fill: MAX_OBJECT_FILL_COLOR, x, y });
};

export default render;
