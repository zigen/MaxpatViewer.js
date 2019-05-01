import newobj from "./newobj";
import kslider from "./kslider";
import number from "./number";
import button from "./button";
import toggle from "./toggle";
const renders = {
  newobj,
  kslider,
  number,
  button,
  toggle,
};
const renderMaxObject = (obj, svg) => {
  if (renders[obj.maxClass] != null) {
    renders[obj.maxClass](obj, svg);
    return;
  }
  throw new Error(`Undefined maxClass ${obj.maxClass}`);
};

export default renderMaxObject;
