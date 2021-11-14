const Jimp = require('jimp');

const getBuffer = (jimpInstance, path) => (
  new Promise((resolve) => {
    const { width, height } = jimpInstance.bitmap;
    // eslint-disable-next-line no-underscore-dangle
    jimpInstance.getBufferAsync(jimpInstance._originalMime)
      .then((buffer) => {
        resolve({
          buffer, width, height, path,
        });
      });
  })
);

const getScaleAsset = (jimpInstance, scale) => {
  const { width, height } = jimpInstance.bitmap;
  const minSize = Math.min(width, height);
  const assetScale = (minSize * scale) >= 1
    ? scale
    : (1 / minSize);
  return jimpInstance.scale(assetScale);
};

module.exports = function getImages(assets, options) {
  const promises = Object.keys(assets).map((key) => (
    Jimp.read(assets[key])
      .then((jimpInstance) => getScaleAsset(jimpInstance, options.scale))
      .then((scaleInstance) => getBuffer(scaleInstance, assets[key]))
  ));
  return Promise.all(promises);
};
