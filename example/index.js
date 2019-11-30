import MaxpatViewer from "../src/MaxpatViewer";
import exampleMaxpat from "./example1";
import SVGJS from "svg.js";

window.maxpat = exampleMaxpat;

const viewer = new MaxpatViewer(SVGJS);
viewer.load("example1", exampleMaxpat);

const elem = document.getElementById("app");
viewer.render(elem);
