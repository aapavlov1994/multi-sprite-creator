const Jimp = require('jimp');
const getImageSize = require('buffer-image-size');

module.exports = function getScaledImagesAsBuffer(assets, scale) {
  return new Promise((globalResolve) => {
    const output = [];
    const promises = Object.keys(assets).map((key) => new Promise((resolve) => {
      Jimp.read(assets[key])
        .then((jimpInstance) => jimpInstance.scale(scale))
        // eslint-disable-next-line no-underscore-dangle
        .then((scaleInstance) => scaleInstance.getBufferAsync(scaleInstance._originalMime))
        .then((buffer) => {
          const { width, height } = getImageSize(buffer);
          output.push({
            buffer, width, height, path: assets[key], w: width, h: height,
          });
          resolve();
        });
    }));
    Promise.all(promises).then(() => globalResolve(output));
  });
};
