const GrowingPacker = require('./GrowingPacker');

// based on multipleBinpacking from https://github.com/gopherwood/spritesheet.js
module.exports = function getAtlases(files, maxWidth, maxHeight) {
  const atlases = [];

  let filesMutable = files;
  while (filesMutable.length) {
    const packer = new GrowingPacker(maxWidth, maxHeight);
    packer.fit(filesMutable);
    const atlas = {
      files: [],
      width: packer.root.w,
      height: packer.root.h,
    };
    filesMutable.forEach((item) => {
      if (item.fit) {
        const {
          width, height, path, name, extension, buffer,
        } = item;
        const { x, y } = item.fit;
        const atlasFile = {
          x, y, width, height, path, name, extension, buffer,
        };
        atlas.files.push(atlasFile);
      }
    });
    atlases.push(atlas);
    filesMutable = packer.nofit;
  }

  return atlases;
};
