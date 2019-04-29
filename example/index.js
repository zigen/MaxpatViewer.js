import MaxpatViewer from "../src/MaxpatViewer";
import exampleMaxpat from "./example1";

window.maxpat = exampleMaxpat;

const viewer = new MaxpatViewer();
viewer.load("example1", exampleMaxpat);

const elem = document.getElementById("app");
viewer.render(elem);
