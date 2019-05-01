import { BUTTON_CIRCLE_RADIUS, MAX_OBJECT_FILL_COLOR, MAX_OBJECT_STROKE_COLOR } from "../constants";

const render = (obj, svg) => {
  const { x, y, w, h } = obj;
  obj.elem = svg.rect(w, h).attr({ stroke: "transparent", fill: MAX_OBJECT_FILL_COLOR, x, y });
  svg
    .circle(BUTTON_CIRCLE_RADIUS * 2)
    .stroke({ color: MAX_OBJECT_STROKE_COLOR, width: 2 })
    .fill({ color: "transparent" })
    .move(x + 0.5 * w - BUTTON_CIRCLE_RADIUS, y + h * 0.5 - BUTTON_CIRCLE_RADIUS);
};

export default render;
