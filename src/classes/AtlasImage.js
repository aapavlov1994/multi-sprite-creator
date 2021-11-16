/**
 * @class
 * @typedef { AtlasImage }
 * @property { number } x
 * @property { number } y
 * @property { buffer } buffer
 * @property { string } key
 * @property { string } extension
 * @property { number } width
 * @property { number } height
 */
module.exports = class AtlasImage {
  /**
   * @constructor
   * @param { object } item
   * @param { number } item.width
   * @param { number } item.height
   * @param { string } item.key
   * @param { string } item.extension
   * @param { buffer } item.buffer
   * @param { object } item.fit
   * @param { number } item.fit.x
   * @param { number } item.fit.y
   * @param { number } padding
   */
  constructor(item, padding) {
    const {
      width, height, key, buffer, extension,
    } = item;
    const { x, y } = item.fit;
    this.x = x;
    this.y = y;
    this.buffer = buffer;
    this.key = key;
    this.extension = extension;
    this.width = width - 2 * padding;
    this.height = height - 2 * padding;
  }
};
