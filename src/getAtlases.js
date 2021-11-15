const GrowingPacker = require('./classes/GrowingPacker');
const Atlas = require('./classes/Atlas');
const AtlasImage = require('./classes/AtlasImage');

// based on multipleBinpacking from https://github.com/gopherwood/spritesheet.js
module.exports = function getAtlases(files, { maxWidth, maxHeight, padding }) {
  const atlases = [];

  let noFitFiles = files.map((file) => ({
    ...file, width: file.width + 2 * padding, height: file.height + 2 * padding,
  }));
  while (noFitFiles.length) {
    const packer = new GrowingPacker(maxWidth, maxHeight);
    packer.fit(noFitFiles);
    const atlas = new Atlas(packer);
    noFitFiles.forEach((item) => {
      if (item.fit) {
        const image = new AtlasImage(item, padding);
        atlas.addImage(image);
      }
    });
    atlases.push(atlas);
    noFitFiles = packer.nofit;
  }

  return atlases;
};
