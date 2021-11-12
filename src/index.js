const getScaledImagesAsBuffer = require('./getScaledImagesAsBuffer');
const sortImages = require('./sortImages');
const getAtlases = require('./getAtlases');
const getSpritesData = require('./getSpritesData');

const defaultOptions = {
  scale: 1,
  padding: 2,
  maxWidth: Infinity,
  maxHeight: Infinity,
};

module.exports = async function getSprites(images, options) {
  const { scale, maxWidth, maxHeight } = Object.assign(defaultOptions, options);
  const scaledImages = await getScaledImagesAsBuffer(images, scale);
  sortImages(scaledImages);
  const atlases = getAtlases(scaledImages, maxWidth, maxHeight);

  return getSpritesData(atlases);
};
