const Jimp = require('jimp');

const getBuffer = (jimpInstance, key) => (
  new Promise((resolve) => {
    const { width, height } = jimpInstance.bitmap;
    // eslint-disable-next-line no-underscore-dangle
    const { _originalMime: mime } = jimpInstance;
    const extension = mime.includes('image/')
      ? `.${mime.slice(6)}`
      : '.png';
    jimpInstance.getBufferAsync(mime)
      .then((buffer) => {
        resolve({
          buffer, width, height, key, extension,
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
      .then((scaleInstance) => getBuffer(scaleInstance, key))
  ));
  return Promise.all(promises);
};
