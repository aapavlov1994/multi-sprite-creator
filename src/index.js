const getImages = require('./getImages');
const sortImages = require('./sortImages');
const getAtlases = require('./getAtlases');
const getSpritesData = require('./getSpritesData');

// TODO: readme.md
const defaultOptions = {
  scale: 1,
  padding: 1,
  maxWidth: Infinity,
  maxHeight: Infinity,
};

/**
 * @typedef { Object } Options
 *  @property { Number } scale - scale for your assets
 *  @property { Number } padding - padding between your assets in sprite
 *  @property { Number } maxWidth - maximum width of your sprite
 *  @property { Number } maxHeight - maximum height of your sprite
 */

/**
 * calculateAtlases - this function calculates maps for your images with chosen params
 * @param imagesPaths { string[] } absolute paths to your images
 * @param options { Options }
 * @returns {Promise<[Atlas]>}
 */
const calculateAtlases = (imagesPaths, options) => {
  const resultOptions = { ...defaultOptions, ...options };

  return getImages(imagesPaths, resultOptions)
    .then((images) => {
      sortImages(images);
      return getAtlases(images, resultOptions);
    });
};

/**
 * createSprites - this function creates sprites and maps for your images
 * @param imagesPaths { string[] } absolute paths to your images
 * @param options { Options }
 * @returns {Promise<[Sprite]>}
 */
const createSprites = (imagesPaths, options) => (
  calculateAtlases(imagesPaths, options)
    .then(getSpritesData)
);

module.exports = {
  calculate: calculateAtlases,
  create: createSprites,
};
