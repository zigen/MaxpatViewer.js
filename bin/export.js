const fs = require("fs");

const argv = require("yargs")
  .alias("f", "file")
  .nargs("f", 1)
  .describe("f", "Load a file")
  .alias("o", "output")
  .nargs("o", 1)
  .describe("o", "output filename")
  .demandOption(["f", "o"])
  .help("h")
  .alias("h", "help").argv;

if (argv._[0] === "export") {
  console.log("load file ...");
  const MaxpatViewer = require("../dist/MaxpatViewer").default;
  const window = require("svgdom");
  const SVGJS = require("svg.js")(window);
  const document = window.document;
  const svg2img = require("svg2img");

  const patchStr = fs.readFileSync(argv.f, "utf8");
  const patch = JSON.parse(patchStr);

  const viewer = new MaxpatViewer(SVGJS, document);
  viewer.load(argv.f, patch);
  viewer.render(document.documentElement);
  const svgStr = viewer.svg.svg();
  svg2img(svgStr, function(err, buffer) {
    fs.writeFileSync(argv.o, buffer);
    console.log("exported to", argv.o);
  });
}
